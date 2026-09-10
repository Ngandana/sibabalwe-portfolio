import { useCallback, useEffect, useRef, useState } from 'react';
import { AI_GREETING } from '../data/aiChatPrompts';

const STORAGE_KEY = 'ai-chat-history';
const SESSION_KEY = 'ai-chat-session';
const MAX_STORED = 40;
const INITIAL = [{ role: 'model', text: AI_GREETING }];

// A random id so multi-turn conversations group together in the log. It
// identifies a conversation, not a person: no fingerprinting, nothing derived
// from the visitor, and it's gone when the tab closes.
function getSessionId() {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = (crypto.randomUUID?.() || Math.random().toString(36).slice(2)) + '';
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return undefined;
  }
}

// Conversations survive closing/reopening the panel (and page navigation)
// within the same tab, but deliberately not beyond it — sessionStorage clears
// when the tab does, so nobody inherits a stranger's conversation.
function loadStored() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.length) return INITIAL;
    return parsed.filter(
      (m) => (m.role === 'user' || m.role === 'model') && typeof m.text === 'string'
    );
  } catch {
    return INITIAL;
  }
}

export function useAiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  // Restore after mount so the first server-identical render stays stable.
  useEffect(() => { setMessages(loadStored()); }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_STORED)));
    } catch { /* private mode / quota — not worth failing the chat over */ }
  }, [messages]);

  const open = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, []);

  const stop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setMessages(INITIAL);
    setError(null);
    setInput('');
    try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape' && isOpen) close();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  // Abort any in-flight request if the component goes away.
  useEffect(() => () => abortRef.current?.abort(), []);

  const sendText = useCallback(async (raw) => {
    const text = raw.trim();
    if (!text || isStreaming) return;

    setError(null);
    setInput('');

    // Snapshot history before the optimistic update so the request carries the
    // conversation as it stood, without the pending turn.
    let history;
    setMessages((prev) => {
      history = prev.map((m) => ({ role: m.role, text: m.text }));
      return [...prev, { role: 'user', text }, { role: 'model', text: '' }];
    });
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history, sessionId: getSessionId() }),
        signal: controller.signal
      });

      if (!res.ok || !res.body) {
        let msg = 'Something went wrong — please try again.';
        try { msg = (await res.json()).error || msg; } catch { /* non-JSON error body */ }
        throw new Error(msg);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: 'model', text: next[next.length - 1].text + chunk };
          return next;
        });
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        // Keep whatever streamed in before the stop, drop it if empty.
        setMessages((prev) => (prev[prev.length - 1]?.text ? prev : prev.slice(0, -1)));
        return;
      }
      setError(err.message || 'Something went wrong — please try again.');
      setMessages((prev) => prev.slice(0, -1)); // drop the empty model bubble
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }, [isStreaming]);

  const send = useCallback(() => sendText(input), [sendText, input]);

  const hasConversation = messages.length > INITIAL.length;

  return {
    isOpen, open, close,
    messages, input, setInput,
    send, sendText, stop, reset,
    isStreaming, error, hasConversation
  };
}

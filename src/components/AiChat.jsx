import { useEffect, useRef } from 'react';
import { AI_STARTERS } from '../data/aiChatPrompts';

const closeIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);
const sendIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
);
const stopIcon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2" /></svg>
);

// Replies render as plain text, so any markdown the model slips in would show
// up as literal characters. The system prompt asks it not to; this is the
// safety net for when it does anyway.
function toPlainText(text) {
  return text
    .replace(/\*\*(.+?)\*\*/gs, '$1')      // **bold**
    .replace(/^#{1,6}\s+/gm, '')           // ### headings
    .replace(/^\s*[-*]\s+/gm, '• ')        // list bullets
    .replace(/`([^`]+)`/g, '$1')           // `code`
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // [text](url)
}

export default function AiChat({ chat }) {
  const {
    isOpen, close, messages, input, setInput,
    send, sendText, stop, reset, isStreaming, error, hasConversation
  } = chat;
  const logRef = useRef(null);
  const inputRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 80);
  }, [isOpen]);

  // Keep tab focus inside the dialog while it's open.
  useEffect(() => {
    if (!isOpen) return undefined;
    function onKeyDown(e) {
      if (e.key !== 'Tab' || !boxRef.current) return;
      const focusable = boxRef.current.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  function onSubmit(e) {
    e.preventDefault();
    send();
  }

  const showStarters = !hasConversation && !isStreaming;

  return (
    <div
      id="ai-chat-overlay"
      className={isOpen ? 'open' : ''}
      role="dialog"
      aria-modal="true"
      aria-label="Chat with an AI assistant about Sibabalwe"
      aria-hidden={!isOpen}
      onClick={(e) => { if (e.target.id === 'ai-chat-overlay') close(); }}
    >
      <div id="ai-chat-box" ref={boxRef}>
        <div className="ai-chat-bar">
          <span className="t-dot"></span>
          <span className="t-dot"></span>
          <span className="t-dot"></span>
          <span className="terminal-title">~/sibabalwe — ask-ai.sh</span>
          {hasConversation && (
            <button className="ai-chat-reset" onClick={reset} aria-label="Clear conversation">clear</button>
          )}
          <button id="ai-chat-close" aria-label="Close chat" onClick={close}>{closeIcon}</button>
        </div>

        <div className="ai-chat-log" ref={logRef} aria-live="polite" aria-atomic="false">
          {messages.map((m, i) => (
            <div className={`ai-chat-msg ${m.role}`} key={i}>
              <span className="ai-chat-msg-role">{m.role === 'user' ? 'you' : 'ai'}</span>
              <p>
                {toPlainText(m.text) ||
                  (isStreaming && i === messages.length - 1 ? <span className="ai-chat-typing" aria-label="Thinking">●●●</span> : '')}
              </p>
            </div>
          ))}

          {showStarters && (
            <div className="ai-chat-starters" aria-label="Suggested questions">
              {AI_STARTERS.map((q) => (
                <button type="button" key={q} onClick={() => sendText(q)}>{q}</button>
              ))}
            </div>
          )}

          {error && <div className="ai-chat-error" role="alert">{error}</div>}
        </div>

        <form className="ai-chat-input-row" onSubmit={onSubmit}>
          <span className="t-prompt" aria-hidden="true">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about his projects, skills, experience…"
            autoComplete="off"
            spellCheck="false"
            aria-label="Message"
            maxLength={2000}
            disabled={isStreaming}
          />
          {isStreaming ? (
            <button type="button" onClick={stop} aria-label="Stop generating" className="ai-chat-stop">{stopIcon}</button>
          ) : (
            <button type="submit" aria-label="Send message" disabled={!input.trim()}>{sendIcon}</button>
          )}
        </form>

        <p className="ai-chat-disclaimer">
          AI assistant — may occasionally get things wrong. Conversations may be reviewed to improve answers; no names, emails, or IPs are stored.
        </p>
      </div>
    </div>
  );
}

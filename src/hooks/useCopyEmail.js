import { useToast } from '../context/ToastContext';

const EMAIL = 'sibabalwengandana@gmail.com';

export function useCopyEmail() {
  const { showToast } = useToast();

  return async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      showToast('Email copied to clipboard!');
    } catch {
      const ta = document.createElement('textarea');
      ta.value = EMAIL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('Email copied!');
    }
  };
}

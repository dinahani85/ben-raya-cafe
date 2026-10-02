import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

const ToastContext = createContext<(message: string) => void>(() => {});

type PopoverEl = HTMLDivElement & { showPopover?: () => void; hidePopover?: () => void };

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timer = useRef<number>();
  const regionRef = useRef<PopoverEl>(null);

  // Use the browser's top layer so toasts appear above open dialogs.
  useEffect(() => {
    const el = regionRef.current;
    if (el && 'showPopover' in el) el.setAttribute('popover', 'manual');
  }, []);

  const show = useCallback((msg: string) => {
    const el = regionRef.current;
    try {
      if (el?.matches(':popover-open')) el.hidePopover?.();
      el?.showPopover?.();
    } catch {
      /* popover unsupported: falls back to z-index */
    }
    window.clearTimeout(timer.current);
    setMessage(msg);
    setVisible(true);
    timer.current = window.setTimeout(() => setVisible(false), 2600);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div ref={regionRef} className="toast-region" role="status" aria-live="polite">
        <div className={`toast${visible ? ' is-visible' : ''}`}>{message}</div>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

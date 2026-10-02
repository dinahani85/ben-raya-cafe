import { useEffect, useRef } from 'react';

/**
 * Drives a native <dialog> from React state: modal behaviour, focus trapping,
 * Escape to close and inert background come from the browser.
 */
export function useDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (open && !dlg.open) {
      dlg.showModal();
      document.documentElement.classList.add('scroll-locked');
    } else if (!open && dlg.open) {
      dlg.close();
    }
    if (!open) {
      // Only unlock when no other dialog is still open.
      if (!document.querySelector('dialog[open]')) document.documentElement.classList.remove('scroll-locked');
    }
  }, [open]);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      closeRef.current();
    };
    const onClick = (e: MouseEvent) => {
      if (e.target === dlg) closeRef.current(); // backdrop click
    };
    dlg.addEventListener('cancel', onCancel);
    dlg.addEventListener('click', onClick);
    return () => {
      dlg.removeEventListener('cancel', onCancel);
      dlg.removeEventListener('click', onClick);
      if (!document.querySelector('dialog[open]')) document.documentElement.classList.remove('scroll-locked');
    };
  }, []);

  return ref;
}

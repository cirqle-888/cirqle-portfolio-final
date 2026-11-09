import { useEffect } from 'react';

/** Isolate the active dialog, contain keyboard focus and restore its opener. */
export function useDialogFocus(open: boolean, selector: string) {
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = document.querySelector<HTMLElement>(selector);
    if (!dialog) return;
    const focusable = () => Array.from(dialog.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex="0"]')).filter(el => el.getClientRects().length && !el.closest('[inert]'));
    const isolated: { el: HTMLElement; inert: boolean }[] = [];
    let branch: HTMLElement = dialog;
    while (branch.parentElement) {
      for (const el of Array.from(branch.parentElement.children)) {
        if (el !== branch && el instanceof HTMLElement) { isolated.push({ el, inert: el.inert }); el.inert = true; }
      }
      branch = branch.parentElement;
      if (branch === document.body) break;
    }
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.tabIndex = -1;
    (focusable()[0] || dialog).focus();
    const key = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const nodes = focusable();
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (!first) { event.preventDefault(); dialog.focus(); }
      else if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', key, true);
    return () => {
      document.removeEventListener('keydown', key, true);
      isolated.forEach(({ el, inert }) => { el.inert = inert; });
      document.body.style.overflow = overflow;
      if (opener?.isConnected && !opener.closest('[inert]')) opener.focus();
    };
  }, [open, selector]);
}

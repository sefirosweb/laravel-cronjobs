import { RefObject, useEffect } from 'react';

const FOCUSABLE = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(',');

// Moves focus inside `containerRef` when `active` flips to true and traps
// Tab / Shift+Tab so the user can't escape the dialog with the keyboard.
// Restores focus to whatever was focused before activation when it flips off.
export const useFocusTrap = (
    containerRef: RefObject<HTMLElement | null>,
    active: boolean,
) => {
    useEffect(() => {
        if (!active) return;
        const container = containerRef.current;
        if (!container) return;

        const previouslyFocused = document.activeElement as HTMLElement | null;

        const focusables = () =>
            Array.from(
                container.querySelectorAll<HTMLElement>(FOCUSABLE),
            ).filter((el) => !el.hasAttribute('aria-hidden'));

        // Focus the first focusable on mount. The button most users want to
        // hit first in a confirm dialog is Cancel, so render it first.
        const initial = focusables()[0];
        initial?.focus();

        const onKey = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;
            const items = focusables();
            if (items.length === 0) return;
            const first = items[0];
            const last = items[items.length - 1];
            const current = document.activeElement as HTMLElement | null;

            if (e.shiftKey) {
                if (current === first || !container.contains(current)) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (current === last || !container.contains(current)) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('keydown', onKey);
            previouslyFocused?.focus?.();
        };
    }, [containerRef, active]);
};

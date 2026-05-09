import { useEffect, useState } from 'react';

// Returns `value` delayed by `delay` ms. Used to keep the search input
// responsive while skipping intermediate filter passes — at 10k+ rows the
// per-keystroke filter starts to lag.
export const useDebouncedValue = <T>(value: T, delay = 200): T => {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);

    return debounced;
};

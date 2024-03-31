import {useEffect, useState} from "react";

// https://codesandbox.io/s/react-query-debounce-ted8o?file=/src/useDebounce.js

const useDebounce = <T,>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Update after delay
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        // Cancel on clear, if the value changes
        return () => clearTimeout(handler)
    }, [value, delay]);

    return debouncedValue
}

export default useDebounce
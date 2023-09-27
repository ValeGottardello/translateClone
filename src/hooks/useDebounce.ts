import { useEffect, useState } from "react"

export function useDebounce <T>(value: T, delay = 500) { //the ype T is passing from the user by paramters. because could be differents types. 

    const [debouncedValue, setDebouncedValue] = useState(value) // also useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
 
        return () => { clearTimeout(timer) }
    }, [value, delay])

    return debouncedValue
}

/*  
0ms -> user type
    useEffect ... L7 waitning the delay 500ms
150ms -> user type //but before pass the 500ms the user type again,
    clear useEffect L11 execute
    useEffect L7 run again
650 -> setDebouncedValue L8 -> new value //after 500ms since the last useEffect
*/
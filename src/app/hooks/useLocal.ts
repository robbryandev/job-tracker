"use client"

import { useEffect, useState } from "react"

export default function useLocal(key: string, defaultValue: string) {
    const [val, setVal] = useState<string>(() => {
        let res: string | null = null;
        if (typeof window != "undefined") {
            res = localStorage.getItem(key);
        }
        return res ?? defaultValue;
    });
    useEffect(() => {
        if (typeof window != "undefined") {
            localStorage.setItem(key, val);
        }
    }, [val]);
    return {
        value: val,
        setValue: setVal
    };
}
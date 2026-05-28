import { useState, useEffect } from "react";

export function useTheme() {
    const [theme, setTheme] = useState(localStorage.theme || "dark");

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.theme = theme;
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

    return [theme, toggleTheme];
}

import { useEffect, useState } from "react";

const STORAGE_KEY = "codeEditorTheme";

function getSavedTheme() {
    try {
        return localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
    } catch {
        return "light";
    }
}

const useTheme = () => {
    const [theme, setTheme] = useState(getSavedTheme);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch {
            // storage is blocked: the theme still changes, it just won't be remembered
        }
    }, [theme]);

    const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

    return { theme, toggleTheme };
};

export default useTheme;
import { useEffect, useState } from "react";

const STORAGE_KEY = "cohort51.sidebarCollapsed";

function getSaved() {
    try {
        return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
        return false;
    }
}

// Every page renders its own <Navbar />, so the open / collapsed choice has to
// live outside the component. It starts from the saved value, which means the
// sidebar opens in the same state on the next page (and after a refresh).
const useSidebarCollapsed = () => {
    const [collapsed, setCollapsed] = useState(getSaved);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, String(collapsed));
        } catch {
            // storage is blocked: the sidebar still toggles, it just won't be remembered
        }
    }, [collapsed]);

    const toggleCollapsed = () => setCollapsed((current) => !current);

    return [collapsed, toggleCollapsed];
};

export default useSidebarCollapsed;
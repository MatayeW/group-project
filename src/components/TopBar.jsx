import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Bell, Moon, Search, Sun } from "lucide-react";
import styles from "./TopBar.module.css";

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

const TopBar = ({
    searchValue,
    onSearchChange,
    searchPlaceholder = "Search problems, learners and notes",
    streak = 0,
    unreadCount = 0,
    theme,
    onToggleTheme,
}) => {
    const searchRef = useRef(null);
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                searchRef.current?.focus();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <header className={styles.topBar}>
            <div className={styles.search}>
                <Search size={16} aria-hidden="true" />
                <input
                    ref={searchRef}
                    type="text"
                    value={searchValue}
                    placeholder={searchPlaceholder}
                    aria-label={searchPlaceholder}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Escape") {
                            onSearchChange("");
                            e.currentTarget.blur();
                        }
                    }}
                />
                <kbd className={styles.shortcut}>{isMac ? "⌘K" : "Ctrl K"}</kbd>
            </div>

            <div className={styles.right}>
                {streak > 0 && <span className={styles.streak}>{streak} day streak</span>}

                <button
                    type="button"
                    className={styles.iconButton}
                    onClick={onToggleTheme}
                    aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                    title={theme === "dark" ? "Light mode" : "Dark mode"}
                >
                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </button>

                <Link
                    to="/announcements"
                    className={styles.iconButton}
                    aria-label={`Announcements, ${unreadCount} unread`}
                >
                    <Bell size={16} aria-hidden="true" />
                    {unreadCount > 0 && (
                        <span className={styles.badge} aria-hidden="true">
                            {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                    )}
                </Link>
            </div>
        </header>
    );
};

export default TopBar;
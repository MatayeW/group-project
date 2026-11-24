import { useState } from "react";
import Navbar from "../../components/Navbar";
import TopBar from "../../components/TopBar";
import AnnouncementCard from "../../components/AnnouncementCard";
import useAnnouncements from "../../hooks/useAnnouncements";
import useTheme from "../../hooks/useTheme";
import styles from "./LearnerAnnouncementPage.module.css";

const LearnerAnnouncementPage = () => {
    const { theme, toggleTheme } = useTheme();
    const { announcements, unreadCount, markAllAsRead } = useAnnouncements();
    const [query, setQuery] = useState("");

    // the search box filters the announcements on this page
    const search = query.trim().toLowerCase();
    const visible = search
        ? announcements.filter((item) => `${item.title} ${item.body}`.toLowerCase().includes(search))
        : announcements;

    return (
        <div className="layout">
            {/* keeps the badge in the sidebar in step with what is unread here */}
            <Navbar unreadAnnouncements={unreadCount} />

            <div className={styles.page} data-theme={theme}>
                <TopBar
                    searchValue={query}
                    onSearchChange={setQuery}
                    searchPlaceholder="Search announcements"
                    streak={4}
                    unreadCount={unreadCount}
                    theme={theme}
                    onToggleTheme={toggleTheme}
                />

                <main className={styles.main}>
                    <div className={styles.content}>
                        <div className={styles.header}>
                            <div>
                                <h1 className={styles.heading}>Announcements</h1>
                                <p className={styles.subheading}>Updates from your mentor.</p>
                            </div>

                            <div className={styles.headerActions}>
                                <span className={styles.count} aria-live="polite">
                                    {unreadCount > 0 ? `${unreadCount} new` : "All caught up"}
                                </span>
                                {unreadCount > 0 && (
                                    <button type="button" className={styles.markRead} onClick={markAllAsRead}>
                                        Mark all as read
                                    </button>
                                )}
                            </div>
                        </div>

                        {visible.length > 0 ? (
                            <ul className={styles.list}>
                                {visible.map((item) => (
                                    <li key={item.id}>
                                        <AnnouncementCard {...item} />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className={styles.empty}>
                                {search ? `No announcements match "${query.trim()}".` : "No announcements yet."}
                            </p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default LearnerAnnouncementPage;
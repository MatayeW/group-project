import { useEffect, useMemo, useState } from "react";
import { ANNOUNCEMENTS } from "../data/mockAnnouncements";

const STORAGE_KEY = "cohort51.readAnnouncements";

function loadReadIds() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

const useAnnouncements = () => {
    const [readIds, setReadIds] = useState(loadReadIds);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(readIds));
        } catch {
            // storage is blocked or full: it still works, it just won't be remembered
        }
    }, [readIds]);

    const announcements = useMemo(
        () =>
            [...ANNOUNCEMENTS]
                .sort(
                    (a, b) =>
                        Number(b.pinned) - Number(a.pinned) ||
                        new Date(b.postedAt) - new Date(a.postedAt)
                )
                .map((item) => ({ ...item, isUnread: item.isNew && !readIds.includes(item.id) })),
        [readIds]
    );

    const unreadCount = announcements.filter((item) => item.isUnread).length;

    const markAllAsRead = () => setReadIds(ANNOUNCEMENTS.map((item) => item.id));

    return { announcements, unreadCount, markAllAsRead };
};

export default useAnnouncements;
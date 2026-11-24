import { useMemo, useSyncExternalStore } from "react";
import { ANNOUNCEMENTS } from "../data/mockAnnouncements";
import { CURRENT_USER } from "../data/currentUser";

const READ_KEY = "cohort51.readAnnouncements";
const REPLIES_KEY = "cohort51.announcementReplies";

const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

function load(key, fallback, isValid) {
    try {
        const saved = JSON.parse(localStorage.getItem(key));
        return isValid(saved) ? saved : fallback;
    } catch {
        return fallback;
    }
}

// The read / reply state lives in one shared store instead of inside each hook call.
// Every page that calls useAnnouncements() (the Announcements page, the Navbar badge,
// the TopBar bell) then reads the same data, so marking a message as read in one place
// updates the badge everywhere straight away.
let state = {
    readIds: load(READ_KEY, [], Array.isArray),
    myReplies: load(REPLIES_KEY, {}, isObject), // { [announcementId]: reply[] }
};
const listeners = new Set();

const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};

const getSnapshot = () => state;

function update(changes) {
    state = { ...state, ...changes };

    try {
        localStorage.setItem(READ_KEY, JSON.stringify(state.readIds));
        localStorage.setItem(REPLIES_KEY, JSON.stringify(state.myReplies));
    } catch {
        // storage is blocked or full: it still works, it just won't be remembered
    }

    listeners.forEach((listener) => listener());
}

const withRead = (id) => (state.readIds.includes(id) ? state.readIds : [...state.readIds, id]);

const markAsRead = (id) => {
    if (!state.readIds.includes(id)) update({ readIds: withRead(id) });
};

const markAllAsRead = () => update({ readIds: ANNOUNCEMENTS.map((item) => item.id) });

// replying to a message means you have read it, so it is marked as read too
const addReply = (id, text) => {
    const clean = text.trim();
    if (!clean) return;

    const reply = {
        id: crypto.randomUUID(),
        author: CURRENT_USER.name,
        postedAt: new Date().toISOString(),
        text: clean,
        isMine: true,
    };

    update({
        readIds: withRead(id),
        myReplies: { ...state.myReplies, [id]: [...(state.myReplies[id] ?? []), reply] },
    });
};

const useAnnouncements = () => {
    const { readIds, myReplies } = useSyncExternalStore(subscribe, getSnapshot);

    const announcements = useMemo(
        () =>
            [...ANNOUNCEMENTS]
                .sort(
                    (a, b) =>
                        Number(b.pinned) - Number(a.pinned) ||
                        new Date(b.postedAt) - new Date(a.postedAt)
                )
                .map((item) => ({
                    ...item,
                    isUnread: item.isNew && !readIds.includes(item.id),
                    // everyone's replies in one thread, oldest first
                    replies: [...(item.replies ?? []), ...(myReplies[item.id] ?? [])].sort(
                        (a, b) => new Date(a.postedAt) - new Date(b.postedAt)
                    ),
                })),
        [readIds, myReplies]
    );

    const unreadCount = announcements.filter((item) => item.isUnread).length;

    return { announcements, unreadCount, markAsRead, markAllAsRead, addReply };
};

export default useAnnouncements;
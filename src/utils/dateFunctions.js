export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const isSameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const formatDay = (date, now = new Date()) =>
    isSameDay(date, now) ? "Today" : `${WEEKDAYS[date.getDay()]} ${date.getDate()} ${MONTHS[date.getMonth()]}`;

export const parseISODate = (iso) => {
    const [year, month, day] = iso.split("-").map(Number);
    return new Date(year, month - 1, day);
};

export const formatNoteDate = (iso, time) => {
    const day = formatDay(parseISODate(iso));
    return day === "Today" && time ? `Today ${time.slice(0, 5)}` : day;
};

export const pad = (number) => String(number).padStart(2, "0");

export function formatPosted(iso, now = new Date()) {
    const date = new Date(iso);
    const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`;

    if (isSameDay(date, now)) return `Today ${time}`;

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (isSameDay(date, yesterday)) return `Yesterday ${time}`;

    return `${WEEKDAYS[date.getDay()]} ${date.getDate()} ${MONTHS[date.getMonth()]}`;
}
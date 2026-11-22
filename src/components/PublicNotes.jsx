import styles from "./PublicNotes.module.css";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const parseISODate = (iso) => {
    const [year, month, day] = iso.split("-").map(Number);
    return new Date(year, month - 1, day);
};

const formatNoteDate = (iso, time) => {
    const day = formatDay(parseISODate(iso));
    return day === "Today" && time ? `Today ${time.slice(0, 5)}` : day;
};

const isSameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const formatDay = (date, now = new Date()) =>
    isSameDay(date, now) ? "Today" : `${WEEKDAYS[date.getDay()]} ${date.getDate()} ${MONTHS[date.getMonth()]}`;

const PublicNotes = ({ title, label, from, date, time, message, attachment }) => {
    return (
        <article className={styles.card}>
            <header className={styles.header}>
                <h3 className={styles.title}>{title}</h3>
                <span className={styles.tag}>{label}</span>
            </header>

            <p className={styles.meta}>
                Posted by {from} . {formatNoteDate(date, time)}
            </p>

            <p className={styles.message}>{message}</p>

            {attachment && (
                <span className={styles.attachment}>Attachment . {attachment}</span>
            )}
        </article>
    );
};

export default PublicNotes;
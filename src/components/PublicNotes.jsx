import styles from "./PublicNotes.module.css";
import { formatNoteDate } from "../utils/dateFunctions";

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
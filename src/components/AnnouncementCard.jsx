import styles from "./AnnouncementCard.module.css";
import { formatPosted } from "../utils/dateFunctions";

const AnnouncementCard = ({ title, body, from, audience, postedAt, pinned, isUnread }) => {
    return (
        <article className={styles.card}>
            <div className={styles.titleRow}>
                <h2 className={styles.title}>{title}</h2>
                {pinned && <span className={styles.badge}>Pinned</span>}
                {isUnread && <span className={`${styles.badge} ${styles.new}`}>New</span>}
            </div>

            <p className={styles.meta}>
                {from} · <time dateTime={postedAt}>{formatPosted(postedAt)}</time> · {audience}
            </p>

            <p className={styles.body}>{body}</p>
        </article>
    );
};

export default AnnouncementCard;
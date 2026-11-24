import { useId, useState } from "react";
import { Check, MessageSquare, Send } from "lucide-react";
import ExpandableText from "./ExpandableText";
import styles from "./AnnouncementCard.module.css";
import { formatPosted } from "../utils/dateFunctions";
import { getInitials } from "../utils/getInitials";

const AnnouncementCard = ({
    id,
    title,
    body,
    from,
    audience,
    postedAt,
    pinned,
    isUnread,
    replies = [],
    onMarkRead,
    onReply,
}) => {
    const [threadOpen, setThreadOpen] = useState(false);
    const [draft, setDraft] = useState("");
    const threadId = useId();
    const draftId = useId();

    const replyLabel =
        replies.length === 0 ? "Reply" : `${replies.length} ${replies.length === 1 ? "reply" : "replies"}`;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!draft.trim()) return;
        onReply(id, draft);
        setDraft("");
    };

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

            <ExpandableText text={body} lines={3} className={styles.body} />

            <div className={styles.actions}>
                {isUnread && (
                    <button
                        type="button"
                        className={`${styles.action} ${styles.markRead}`}
                        onClick={() => onMarkRead(id)}
                    >
                        <Check size={14} aria-hidden="true" /> Mark as read
                    </button>
                )}

                <button
                    type="button"
                    className={styles.action}
                    onClick={() => setThreadOpen((open) => !open)}
                    aria-expanded={threadOpen}
                    aria-controls={threadId}
                >
                    <MessageSquare size={14} aria-hidden="true" /> {replyLabel}
                </button>
            </div>

            {threadOpen && (
                <div id={threadId} className={styles.thread}>
                    {replies.length > 0 && (
                        <ul className={styles.replies}>
                            {replies.map((reply) => (
                                <li key={reply.id} className={styles.reply}>
                                    <span
                                        className={`${styles.avatar} ${reply.isMentor ? styles.mentor : ""} ${reply.isMine ? styles.mine : ""}`}
                                        aria-hidden="true"
                                    >
                                        {getInitials(reply.author)}
                                    </span>

                                    <div className={styles.replyBody}>
                                        <p className={styles.replyMeta}>
                                            <strong>{reply.isMine ? `${reply.author} (you)` : reply.author}</strong>
                                            {reply.isMentor && <span className={styles.role}>Mentor</span>}
                                            <span>
                                                · <time dateTime={reply.postedAt}>{formatPosted(reply.postedAt)}</time>
                                            </span>
                                        </p>
                                        <ExpandableText text={reply.text} lines={3} className={styles.replyText} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label htmlFor={draftId} className={styles.srOnly}>
                            Write a reply to {title}
                        </label>
                        <textarea
                            id={draftId}
                            className={styles.input}
                            rows={2}
                            maxLength={500}
                            placeholder="Write a reply…"
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                        />
                        <button type="submit" className={styles.send} disabled={!draft.trim()}>
                            <Send size={13} aria-hidden="true" /> Reply
                        </button>
                    </form>
                </div>
            )}
        </article>
    );
};

export default AnnouncementCard;
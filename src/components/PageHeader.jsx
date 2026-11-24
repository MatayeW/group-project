import styles from "./PageHeader.module.css";

// The title block at the top of the Learning and Announcements pages.
// `status` is the small uppercase line on the right; `children` are any buttons beside it.
const PageHeader = ({ title, subtitle, status, children }) => (
    <div className={styles.header}>
        <div>
            <h1 className={styles.heading}>{title}</h1>
            {subtitle && <p className={styles.subheading}>{subtitle}</p>}
        </div>

        {(status || children) && (
            <div className={styles.actions}>
                {status && (
                    <span className={styles.status} aria-live="polite">
                        {status}
                    </span>
                )}
                {children}
            </div>
        )}
    </div>
);

export default PageHeader;
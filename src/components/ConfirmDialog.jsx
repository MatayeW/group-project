import { useEffect, useId, useRef } from "react";
import styles from "./ConfirmDialog.module.css";

const ConfirmDialog = ({
    open,
    title,
    message,
    confirmLabel = "Delete",
    cancelLabel = "Cancel",
    onConfirm,
    onCancel,
}) => {
    const dialogRef = useRef(null);
    const uid = useId();
    const titleId = `${uid}-title`;
    const messageId = `${uid}-message`;

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
    }, [open]);

    return (
        <dialog
            ref={dialogRef}
            className={styles.dialog}
            aria-labelledby={titleId}
            aria-describedby={messageId}
            // Escape: let React decide, instead of the browser closing it on its own
            onCancel={(e) => {
                e.preventDefault();
                onCancel();
            }}
            // a click on the dark backdrop counts as the dialog itself being clicked
            onClick={(e) => {
                if (e.target === dialogRef.current) onCancel();
            }}
        >
            <div className={styles.content}>
                <h2 id={titleId} className={styles.title}>{title}</h2>
                <p id={messageId} className={styles.message}>{message}</p>

                <div className={styles.actions}>
                    {/* Cancel comes first, so it is the button focused when the popup opens */}
                    <button type="button" className={styles.cancel} onClick={onCancel}>
                        {cancelLabel}
                    </button>
                    <button type="button" className={styles.confirm} onClick={onConfirm}>
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default ConfirmDialog;
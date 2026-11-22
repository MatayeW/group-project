import { useId, useRef, useState } from "react";
import { FileText, LoaderCircle, Pencil, Trash2 } from "lucide-react";
import {
    ACCEPTED_FILES,
    MAX_FILE_SIZE,
    extractText,
} from "../utils/extractText";
import ConfirmDialog from "./ConfirmDialog";
import styles from "./PersonalNotes.module.css";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const isSameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const formatDay = (date, now = new Date()) =>
    isSameDay(date, now) ? "Today" : `${WEEKDAYS[date.getDay()]} ${date.getDate()} ${MONTHS[date.getMonth()]}`;

const TOPICS = [
    "Integers", "Strings", "Arrays", "Booleans", "Arithmetic", "Bitwise",
    "Conditionals", "Loops", "Functions", "Objects", "Scoping", "Recursion",
    "IO", "Linked Lists", "Stacks", "Queues", "Hash Maps", "Trees", "Graphs",
    "Searching", "Sorting", "Time/Space Complexity", "OOP",
];

const countWords = (text) => (text.trim() ? text.trim().split(/\s+/).length : 0);

const PersonalNotes = ({ notes, onSave, onDelete }) => {
    const [tab, setTab] = useState("write"); // "write" or "saved"
    const [editingId, setEditingId] = useState(null);
    const [title, setTitle] = useState("");
    const [concept, setConcept] = useState("");
    const [body, setBody] = useState("");
    const [fileName, setFileName] = useState("");
    const [extracting, setExtracting] = useState(false);
    const [error, setError] = useState("");
    const [expandedId, setExpandedId] = useState(null);
    const [noteToDelete, setNoteToDelete] = useState(null); // the note waiting for a yes / no

    // counts up each time a file is picked, so an old extraction can't overwrite a newer one
    const latestRun = useRef(0);

    const uid = useId();
    const titleId = `${uid}-title`;
    const conceptId = `${uid}-concept`;
    const fileId = `${uid}-file`;
    const bodyId = `${uid}-body`;

    const resetForm = () => {
        latestRun.current++;
        setEditingId(null);
        setTitle("");
        setConcept("");
        setBody("");
        setFileName("");
        setExtracting(false);
        setError("");
    };

    // read the picked file and drop its text into the editable box
    const handleFileChange = async (e) => {
        const picked = e.target.files?.[0];
        e.target.value = ""; // lets you pick the same file again later
        if (!picked) return;

        if (picked.size > MAX_FILE_SIZE) {
            setError("That file is over 5 MB. Choose a smaller one.");
            return;
        }

        const run = ++latestRun.current;
        setError("");
        setExtracting(true);

        try {
            const text = await extractText(picked);
            if (run !== latestRun.current) return;

            if (!text) {
                setError("No text found in that file. If it's a scan, upload it as an image instead.");
                return;
            }

            // keep anything already typed and add the new text underneath
            setBody((previous) => (previous.trim() ? `${previous.trimEnd()}\n\n${text}` : text));
            setFileName(picked.name);
            setTitle((previous) => previous || picked.name.replace(/\.[^.]+$/, ""));
        } catch (err) {
            if (run === latestRun.current) {
                setError(err.message || "Couldn't read that file.");
            }
        } finally {
            if (run === latestRun.current) setExtracting(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (extracting) return;

        if (!title.trim() || !concept || !body.trim()) {
            setError("Add a title, choose a concept and write something.");
            return;
        }

        onSave({
            id: editingId,
            title: title.trim(),
            topic: concept,
            body: body.trim(),
            fileName,
        });
        resetForm();
        setTab("saved");
    };

    const startEdit = (note) => {
        latestRun.current++;
        setEditingId(note.id);
        setTitle(note.title);
        setConcept(note.topic);
        setBody(note.body ?? "");
        setFileName(note.fileName ?? "");
        setExtracting(false);
        setError("");
        setTab("write");
    };

    const askToDelete = (note) => setNoteToDelete(note);

    const confirmDelete = () => {
        onDelete(noteToDelete.id);
        if (editingId === noteToDelete.id) resetForm();
        setNoteToDelete(null);
    };

    return (
        <section className={styles.pane} aria-label="My notes">
            <div className={styles.tabs} role="tablist">
                <button
                    type="button"
                    role="tab"
                    aria-selected={tab === "write"}
                    className={tab === "write" ? styles.active : ""}
                    onClick={() => setTab("write")}
                >
                    {editingId ? "Edit note" : "New note"}
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={tab === "saved"}
                    className={tab === "saved" ? styles.active : ""}
                    onClick={() => setTab("saved")}
                >
                    Saved notes ({notes.length})
                </button>
            </div>

            {tab === "write" ? (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.scroll}>
                        <div className={styles.field}>
                            <label className={styles.label} htmlFor={titleId}>Title</label>
                            <input
                                id={titleId}
                                className={styles.control}
                                type="text"
                                placeholder="What is this note about?"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label} htmlFor={conceptId}>Concept</label>
                            <select
                                id={conceptId}
                                className={styles.control}
                                value={concept}
                                onChange={(e) => setConcept(e.target.value)}
                            >
                                <option value="" disabled>Select a concept</option>
                                {TOPICS.map((topic) => (
                                    <option key={topic} value={topic}>{topic}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.field}>
                            <span className={styles.label}>
                                Attachment <span className={styles.optional}>(optional)</span>
                            </span>
                            <input
                                id={fileId}
                                className={styles.fileInput}
                                type="file"
                                accept={ACCEPTED_FILES}
                                onChange={handleFileChange}
                                disabled={extracting}
                            />
                            <label htmlFor={fileId} className={styles.attach}>
                                {extracting ? (
                                    <LoaderCircle size={16} className={styles.spin} aria-hidden="true" />
                                ) : (
                                    <FileText size={16} aria-hidden="true" />
                                )}
                                <span>
                                    {extracting
                                        ? "Extracting text…"
                                        : fileName
                                          ? `Text added from ${fileName}. Attach another`
                                          : "Attach a file to pull its text into your note"}
                                </span>
                            </label>
                            <p className={styles.help}>
                                PDF, Word (.docx), text, Markdown or an image, up to 5 MB. The text lands in the box
                                below, so you can fix it before saving.
                            </p>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label} htmlFor={bodyId}>Note</label>
                            <textarea
                                id={bodyId}
                                className={`${styles.control} ${styles.textarea}`}
                                placeholder="Type notes. Attached"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            />
                            <p className={styles.help}>{countWords(body)} words</p>
                        </div>

                        {error && <p className={styles.error} role="alert">{error}</p>}
                    </div>

                    <div className={styles.actions}>
                        <button type="button" className={styles.ghost} onClick={resetForm}>
                            {editingId ? "Cancel edit" : "Clear"}
                        </button>
                        <button type="submit" className={styles.primary} disabled={extracting}>
                            {editingId ? "Save changes" : "Save note"}
                        </button>
                    </div>
                </form>
            ) : (
                <div className={styles.scroll}>
                    {notes.length === 0 ? (
                        <div className={styles.empty}>
                            <h3>No notes yet</h3>
                            <p>Write one in the New note tab. Only you can see it.</p>
                        </div>
                    ) : (
                        <ul className={styles.list}>
                            {notes.map((note) => {
                                const text = note.body ?? "";
                                const isLong = text.length > 200 || text.split("\n").length > 3;
                                const open = expandedId === note.id;

                                return (
                                    <li key={note.id} className={styles.item}>
                                        <div className={styles.itemHeader}>
                                            <h3 className={styles.itemTitle}>{note.title}</h3>
                                            <span className={styles.tag}>{note.topic}</span>
                                        </div>
                                        <p className={styles.itemMeta}>
                                            {note.fileName ? `${note.fileName} · ` : ""}
                                            {formatDay(new Date(note.createdAt))}
                                        </p>
                                        <p className={`${styles.itemBody} ${open ? "" : styles.clamp}`}>{text}</p>
                                        <div className={styles.itemActions}>
                                            {isLong && (
                                                <button
                                                    type="button"
                                                    className={styles.link}
                                                    onClick={() => setExpandedId(open ? null : note.id)}
                                                    aria-expanded={open}
                                                >
                                                    {open ? "Show less" : "Show more"}
                                                </button>
                                            )}
                                            <button type="button" className={styles.iconButton} onClick={() => startEdit(note)}>
                                                <Pencil size={13} aria-hidden="true" /> Edit
                                            </button>
                                            <button
                                                type="button"
                                                className={`${styles.iconButton} ${styles.danger}`}
                                                onClick={() => askToDelete(note)}
                                            >
                                                <Trash2 size={13} aria-hidden="true" /> Delete
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            )}

            <ConfirmDialog
                open={noteToDelete !== null}
                title="Delete this note?"
                message={
                    noteToDelete
                        ? `"${noteToDelete.title}" will be permanently deleted. This can't be undone.`
                        : ""
                }
                confirmLabel="Delete"
                onConfirm={confirmDelete}
                onCancel={() => setNoteToDelete(null)}
            />
        </section>
    );
};

export default PersonalNotes;
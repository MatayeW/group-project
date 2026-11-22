import { useId, useRef, useState } from "react";
import styles from "./PersonalNotes.module.css";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const parseISODate = (iso) => {
    const [year, month, day] = iso.split("-").map(Number);
    return new Date(year, month - 1, day);
};

const isSameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const formatDay = (date, now = new Date()) =>
    isSameDay(date, now) ? "Today" : `${WEEKDAYS[date.getDay()]} ${date.getDate()} ${MONTHS[date.getMonth()]}`;

const TOPICS = [
    "Integers", "Strings", "Arrays", "Booleans", "Arithmetic", "Bitwise",
    "Conditionals", "Loops", "Functions", "Objects", "Scoping", "Recursion",
    "IO", "Linked Lists", "Stacks", "Queues", "Hash Maps", "Trees", "Graphs",
    "Searching", "Sorting", "Time/Space Complexity", "OOP",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const SEED_NOTES = [
    {
        id: "seed-1",
        title: "My loop mistakes",
        topic: "Loops",
        fileName: "my-loop-mistakes.pdf",
        createdAt: parseISODate("2026-11-09"),
    },
    {
        id: "seed-2",
        title: "String methods summary",
        topic: "Strings",
        fileName: "string-methods.docx",
        createdAt: parseISODate("2026-11-06"),
    },
];

const PersonalNotes = () => {
    const [notes, setNotes] = useState(SEED_NOTES);
    const [title, setTitle] = useState("");
    const [concept, setConcept] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);

    // useId keeps label/input ids unique even if this component renders twice
    const uid = useId();
    const titleId = `${uid}-title`;
    const conceptId = `${uid}-concept`;
    const fileId = `${uid}-file`;
    const headingId = `${uid}-heading`;

    const resetForm = () => {
        setTitle("");
        setConcept("");
        setFile(null);
        setError("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleFileChange = (e) => {
        const picked = e.target.files?.[0] ?? null;

        if (picked && picked.size > MAX_FILE_SIZE) {
            setError("That file is over 5 MB. Choose a smaller one.");
            setFile(null);
            e.target.value = "";
            return;
        }

        setError("");
        setFile(picked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !concept || !file) {
            setError("Add a title, choose a concept and attach a file.");
            return;
        }

        const newNote = {
            id: crypto.randomUUID(),
            title: title.trim(),
            topic: concept,
            fileName: file.name,
            file,
            createdAt: new Date(),
        };

        setNotes((prev) => [newNote, ...prev]);
        resetForm();
    };

    return (
        <section className={styles.card} aria-labelledby={headingId}>
            <div className={styles.top}>
                <h2 id={headingId} className={styles.heading}>My notes</h2>
                <p className={styles.hint}>Upload your own notes. Only you can see them.</p>

                <form className={styles.form} onSubmit={handleSubmit}>
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
                        <label className={styles.label} htmlFor={fileId}>File</label>
                        <input
                            id={fileId}
                            className={`${styles.control} ${styles.fileInput}`}
                            type="file"
                            accept=".pdf,.doc,.docx,.txt,.md"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                    </div>

                    {error && <p className={styles.error} role="alert">{error}</p>}

                    <button type="submit" className={styles.button}>Upload note →</button>
                </form>
            </div>

            {notes.length ? (
                <ul className={styles.list}>
                    {notes.map((note) => (
                        <li key={note.id} className={styles.item}>
                            <p className={styles.itemTitle}>{note.title}</p>
                            <span className={styles.tag}>{note.topic}</span>
                            <p className={styles.itemMeta}>
                                {note.fileName} · {formatDay(note.createdAt)}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.empty}>You haven't uploaded any notes yet.</p>
            )}
        </section>
    );
};

export default PersonalNotes;
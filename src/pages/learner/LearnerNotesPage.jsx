import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import Navbar from "../../components/Navbar";
import PersonalNotes from "../../components/PersonalNotes";
import PublicNotes from "../../components/PublicNotes";
import usePersonalNotes from "../../hooks/usePersonalNotes";
import styles from "./LearnerNotesPage.module.css";

const FILTERS = ["All", "Strings", "Arrays", "Loops", "Functions", "Objects", "OOP", "Recursion"];
const MOCK_NOTES = [
    {
        id: "n1",
        title: "Loops: where they start and stop",
        label: "Loops",
        from: "MD",
        date: "2026-11-19",
        time: "08:30:12",
        message: "Most loop bugs are off-by-one. Before you run a loop, say out loud how many times it should repeat, then check the first and last value of i. A loop from 0 while i < n runs n times; change < to <= and it runs n + 1 times.",
    },
    {
        id: "n2",
        title: "Array methods cheat sheet",
        label: "Arrays",
        from: "MD",
        date: "2026-11-09",
        time: "08:40:10",
        message: "map changes every item and returns a new array of the same length. filter keeps the items that pass a test. reduce folds the array into one value. None of them change the original array.",
        attachment: "array-methods.pdf",
    },
    {
        id: "n3",
        title: "Functions: parameters vs arguments",
        label: "Functions",
        from: "MD",
        date: "2026-11-05",
        time: "10:30:45",
        message: "Parameters are the names in the function definition. Arguments are the values you pass when you call it. If a function returns undefined, check that you wrote return and did not only console.log the answer.",
    },
];

// same storage key as the code page, so the light / dark choice is shared
function getSavedTheme() {
    try {
        return localStorage.getItem("codeEditorTheme") === "dark" ? "dark" : "light";
    } catch {
        return "light";
    }
}

const LearnerNotesPage = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [theme, setTheme] = useState(getSavedTheme);
    const { notes, saveNote, deleteNote } = usePersonalNotes();

    const visibleNotes =
        activeFilter === "All" ? MOCK_NOTES : MOCK_NOTES.filter((note) => note.label === activeFilter);

    function toggleTheme() {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        try {
            localStorage.setItem("codeEditorTheme", newTheme);
        } catch {
            // storage is blocked: the theme still changes, it just won't be remembered
        }
    }

    return (
        <div className="layout">
            <Navbar />

            <div className={styles.page} data-theme={theme}>
                {/* toolbar: breadcrumb, note counts and the theme button */}
                <header className={styles.toolbar}>
                    <div className={styles.breadcrumb}>
                        Learning <span>/</span> <strong>Notes</strong>
                    </div>

                    <p className={styles.summary}>
                        <strong>{MOCK_NOTES.length}</strong> mentor notes · <strong>{notes.length}</strong> personal notes
                    </p>

                    <div className={styles.toolbarRight}>
                        <button
                            type="button"
                            className={styles.themeToggle}
                            onClick={toggleTheme}
                            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                            title={theme === "dark" ? "Light mode" : "Dark mode"}
                        >
                            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                        </button>
                    </div>
                </header>

                <div className={styles.workspace}>
                    {/* LEFT: notes from the mentor */}
                    <section className={styles.pane} aria-labelledby="mentor-notes-heading">
                        <div className={styles.paneTabs}>
                            <h2 id="mentor-notes-heading">Notes from your mentor</h2>
                        </div>

                        <div className={styles.filters} role="group" aria-label="Filter notes by concept">
                            {FILTERS.map((filter) => (
                                <button
                                    key={filter}
                                    type="button"
                                    className={styles.filter}
                                    aria-pressed={activeFilter === filter}
                                    onClick={() => setActiveFilter(filter)}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>

                        <div className={styles.paneScroll}>
                            {visibleNotes.length ? (
                                visibleNotes.map((note) => <PublicNotes key={note.id} {...note} />)
                            ) : (
                                <p className={styles.empty}>
                                    {activeFilter === "All"
                                        ? "Your mentor hasn't posted any notes yet."
                                        : `No ${activeFilter} notes yet.`}
                                </p>
                            )}
                        </div>
                    </section>

                    {/* RIGHT: your own notes */}
                    <PersonalNotes notes={notes} onSave={saveNote} onDelete={deleteNote} />
                </div>
            </div>
        </div>
    );
};

export default LearnerNotesPage;
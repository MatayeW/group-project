import { useState } from "react";
import Navbar from "../../components/Navbar";
import TopBar from "../../components/TopBar";
import PageHeader from "../../components/PageHeader";
import PersonalNotes from "../../components/PersonalNotes";
import PublicNotes from "../../components/PublicNotes";
import usePersonalNotes from "../../hooks/usePersonalNotes";
import useAnnouncements from "../../hooks/useAnnouncements";
import useTheme from "../../hooks/useTheme";
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

const LearnerNotesPage = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [query, setQuery] = useState("");
    const { notes, saveNote, deleteNote } = usePersonalNotes();
    const { unreadCount } = useAnnouncements();
    const { theme, toggleTheme } = useTheme();

    // the TopBar search box filters the mentor notes and the saved personal notes
    const search = query.trim().toLowerCase();

    const visibleNotes = MOCK_NOTES.filter(
        (note) =>
            (activeFilter === "All" || note.label === activeFilter) &&
            (!search || `${note.title} ${note.label} ${note.message}`.toLowerCase().includes(search))
    );

    return (
        <div className="layout">
            <Navbar />

            <div className={styles.page} data-theme={theme}>
                <TopBar
                    searchValue={query}
                    onSearchChange={setQuery}
                    searchPlaceholder="Search notes"
                    streak={4}
                    unreadCount={unreadCount}
                    theme={theme}
                    onToggleTheme={toggleTheme}
                />

                <main className={styles.main}>
                    <PageHeader
                        title="Learning"
                        subtitle="Notes from your mentor, and your own."
                        status={`${MOCK_NOTES.length} mentor notes · ${notes.length} personal notes`}
                    />

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
                                        {search
                                            ? `No notes match "${query.trim()}".`
                                            : activeFilter === "All"
                                              ? "Your mentor hasn't posted any notes yet."
                                              : `No ${activeFilter} notes yet.`}
                                    </p>
                                )}
                            </div>
                        </section>

                        {/* RIGHT: your own notes */}
                        <PersonalNotes notes={notes} query={query} onSave={saveNote} onDelete={deleteNote} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default LearnerNotesPage;
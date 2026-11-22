import { useState } from "react";
import PersonalNotes from "../../components/PersonalNotes";
import PublicNotes from "../../components/PublicNotes";
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
        message:"Parameters are the names in the function definition. Arguments are the values you pass when you call it. If a function returns undefined, check that you wrote return and did not only console.log the answer.",
    },
];

const LearnerNotesPage = () => {
    const [activeFilter, setActiveFilter] = useState("All");

    const visibleNotes = activeFilter === "All" ? MOCK_NOTES : MOCK_NOTES.filter((note) => note.label === activeFilter);

    return (
        <div className={styles.page}>
            <header>
                <h1 className={styles.pageTitle}>Learning</h1>
                <p className={styles.pageSubtitle}>Notes from your mentor, plus your own.</p>
            </header>

            <div className={styles.columns}>
                <section aria-labelledby="mentor-notes-heading">
                    <h2 id="mentor-notes-heading" className={styles.sectionTitle}>
                        Notes from your mentor
                    </h2>

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

                    {visibleNotes.length ? (
                        <div className={styles.noteList}>
                            {visibleNotes.map((note) => (
                                <PublicNotes key={note.id} {...note} />
                            ))}
                        </div>
                    ) : (
                        <p className={styles.empty}>
                            {activeFilter === "All" ? "Your mentor hasn't posted any notes yet." : `No ${activeFilter} notes yet.`}
                        </p>
                    )}
                </section>

                <div className={styles.personal}>
                    <PersonalNotes />
                </div>
            </div>
        </div>
    );
};

export default LearnerNotesPage;
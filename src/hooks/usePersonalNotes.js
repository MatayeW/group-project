import { useEffect, useState } from "react";

const STORAGE_KEY = "cohort51.personalNotes";

function loadNotes() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

const usePersonalNotes = () => {
    const [notes, setNotes] = useState(loadNotes);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        } catch {
            // storage is blocked or full: notes still work, they just won't be remembered
        }
    }, [notes]);

    // a note with an id is an edit; a note without one is new
    const saveNote = (note) => {
        const now = new Date().toISOString();

        setNotes(
            (previous) => note.id ? 
            previous.map((n) => n.id === note.id ? { ...n, ...note, updatedAt: now } : n)
            : [{ ...note, id: crypto.randomUUID(), createdAt: now, updatedAt: now }, ...previous,]
        );
    };

    const deleteNote = (id) => {
        setNotes((previous) => previous.filter((n) => n.id !== id));
    };

    return {notes, saveNote, deleteNote};
};

export default usePersonalNotes;
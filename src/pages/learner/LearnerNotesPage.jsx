import Navbar from '../../components/Navbar'

const filteringTabs = ['All', 'Strings', 'Arrays', 'Loops', 'Objects', 'OOP', 'Recursion'];
const MOCK_DATA = [
    {
        title: "Loops: where they start and stop",
        label: "loops",
        from: "MD",
        date: "2026-11-19",
        time: "08:30:12",
        message: "Most loop bugs are off-by-one. Before you run a loop, say out loud how many times it should repeat, then check the first and last value of i. A loop from 0  while i < n runs n times. Change < to <= n + 1 times"
    },
    {
        title: "Array methods cheatsheet",
        label: "arrays",
        from: "MD",
        date: "2026-11-09",
        time: "08:40:10",
        message: "map changes every item and returns a new array of the same length. filter keeps the items that pass a test. reduce folds the array into one value. None of them change the original array."
    },
    {
        title: "Loops: where they start and stop",
        label: "loops",
        from: "MD",
        date: "2026-11-05",
        time: "10:30:45",
        message: "Parameters are the names in the function definition. Arguments are the values you pass when you call it. If a function returns undefined, check that you wrote return and did not only console.log the answer."
    }
];

const PersonalNotes = () => {
    const topics = ['Integers', 'Strings', 'Arrays', 'Booleans', 'Arithmetic', 'Bitwise', 'Conditionals', 'Loops', 'Scoping', 'Recursion', 'IO', 'Linked Lists', 'Stacks', 'Queues', 'Hash Maps', 'Trees', 'Graphs', 'Searching', 'Sorting', 'Time/Space Complexity', 'OOP'];
    const notes = [
        {
            title: "My Loop Mistakes",
            topic: "Loops",
            fileName: "my-loop-mistakes.pdf"
        },
        {
            title: "String methods summary",
            topic: "Strings",
            fileName: "string-methods-summary.docx"
        }
    ]
    return (
        <section>
            <div>
                <h2>My notes</h2>
                <p>Upload your own notes. Only you can see them.</p>
            </div>
            <form>
                <div>
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" placeholder='What is this note about?' />
                </div>
                <div>
                    <label htmlFor="concept">Concept</label>
                    <select id="concept">
                        {topics.map((topic, i) => {
                            <option key={i} value={topic}>{topic}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="file">Upload</label>
                    {/* Input here for uploading files */}
                </div>
                <button onSubmit={handleSubmit}>Upload Note</button>
            </form>

            <section>
                {/* Displays a list of the notes that have been uploaded */}
                {notes.map((note, key) => {
                    return (
                        <div key={key}>
                            <p>{note.title}</p>
                            <span>{note.topic}</span>
                            <p>{note.fileName}</p>
                        </div>
                    )
                })}
            </section>
        </section>
    );
}

const MentorNotes = (props) => {
    const currentDate = (date) => {
        const [year, month, day] = date.split("-").map(Number);
        let d = new Date(year, month, day);
        let current = new Date();

        let check = (current.getDate() === d.getDate()) && (current.getFullYear() === d.getFullYear()) && (current.getMonth() === d.getMonth());
        if(check) {
            return "Today";
        } else {
            return `${current.getDay()}, ${current.getDate()}`;
        }
    }


    return (
        <>
            <div>
                <h2>{props.title}</h2>
                <span>{props.label}</span>
            </div>
            <div>
                <span>Posted by {props.from}</span>
                <span>{currentDate(props.date)}{currentDate(props.date) === "Today" ? time.slice(0, 4) : ""}</span>
            </div>
            <div>
                <p>{props.message}</p>
            </div>
        </>
    );
}

const LearnerNotesPage = () => {
    return (
        <>
            <Navbar />
            <section>
                <h1>Learning</h1>
                <div>
                    {filteringTabs.map((item) => {
                        <span>{item}</span>
                    })}
                </div>
                <section>
                    {MOCK_DATA.length ? MOCK_DATA.map((detail) => {
                        <MentorNotes {...props} /> 
                    }) : <div>You currently have no notes to learn from</div>}
                </section>

            </section>
        </>
    );
};

export default LearnerNotesPage;
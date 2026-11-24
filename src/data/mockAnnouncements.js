// Sample announcements.

const at = (daysAgo, hours, minutes) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    date.setHours(hours, minutes, 0, 0);
    return date.toISOString();
};

export const ANNOUNCEMENTS = [
    {
        id: "a1",
        title: "Week 46 homework is out",
        body: "Three loops problems, due Friday 13 Nov at 17:00. Start with Sum to N, then Character Battle.",
        from: "MD",
        audience: "All learners",
        postedAt: at(0, 8, 15),
        pinned: true,
        isNew: true,
    },
    {
        id: "a2",
        title: "Live session on Thursday",
        body: "I will send one live problem to each learner during our Thursday call. Have Cohort51 open before you join.",
        from: "MD",
        audience: "All learners",
        postedAt: at(1, 16, 30),
        pinned: false,
        isNew: false,
    },
    {
        id: "a3",
        title: "HackerEarth level challenges",
        body: "They open once you complete 80% of the year problems. Keep working through the concepts in order.",
        from: "MD",
        audience: "All learners",
        postedAt: at(14, 9, 0),
        pinned: false,
        isNew: false,
    },
];
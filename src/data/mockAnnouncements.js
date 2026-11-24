// Sample announcements.
// `replies` are messages other people have already left on the announcement.
// The learner's own replies are saved separately (see hooks/useAnnouncements.js).

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
        replies: [
            {
                id: "a1-r1",
                author: "Thandi Nkosi",
                postedAt: at(0, 9, 5),
                text: "Is Character Battle the one with the string input, or the one with two arrays?",
            },
            {
                id: "a1-r2",
                author: "MD",
                isMentor: true,
                postedAt: at(0, 9, 40),
                text: "The string one. Loop over it once and keep a running count.",
            },
            {
                id: "a1-r3",
                author: "Sipho Dlamini",
                postedAt: at(0, 11, 20),
                text: "Sum to N is done. Starting on the second one now.",
            },
        ],
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
        replies: [
            {
                id: "a2-r1",
                author: "Aisha Patel",
                postedAt: at(1, 17, 10),
                text: "Will the problems be from the loops list or from any concept so far?",
            },
        ],
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
        replies: [],
    },
    {
        id: "a4",
        title: "Code review slots open next week",
        body: "I am opening 20 minute code review slots on Monday and Wednesday next week. Pick one problem you are proud of and one you got stuck on, and send me both links the evening before. In the review we will read your code together, talk through the choices you made, and agree on one habit for you to work on. Slots are first come, first served, so reply here with the day you want and I will confirm it.",
        from: "MD",
        audience: "All learners",
        postedAt: at(2, 14, 20),
        pinned: false,
        isNew: true,
        replies: [
            {
                id: "a4-r1",
                author: "Liam van Wyk",
                postedAt: at(2, 15, 2),
                text: "Wednesday works for me. I will send the links on Tuesday evening.",
            },
            {
                id: "a4-r2",
                author: "Nomsa Khumalo",
                postedAt: at(2, 18, 45),
                text: "Can we review a problem we solved but did not fully understand, or does it have to be one we got stuck on?",
            },
            {
                id: "a4-r3",
                author: "MD",
                isMentor: true,
                postedAt: at(1, 7, 55),
                text: "Yes, that counts. Those make the best reviews.",
            },
        ],
    },
    {
        id: "a5",
        title: "Portfolio checkpoint on Friday",
        body: "By Friday, push your portfolio site to GitHub and share the link in this thread. It does not need to be finished. I want to see your folder structure, your README and at least one page that works on a phone. If you finish early, start on the projects section.",
        from: "MD",
        audience: "All learners",
        postedAt: at(3, 10, 5),
        pinned: false,
        isNew: true,
        replies: [
            {
                id: "a5-r1",
                author: "Aisha Patel",
                postedAt: at(2, 8, 30),
                text: "Pushed mine last night. The README still needs work, but the phone layout is done.",
            },
        ],
    },
];
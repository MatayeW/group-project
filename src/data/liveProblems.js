// Problems your mentor "sends" during a live session.
// Newest first, like the Problems received list in the wireframe.
// Each input is the list of arguments passed to the function,
// and params are the names of those arguments (used to show "sentence = ...").
const liveProblems = [
  {
    id: 1,
    title: "Reverse Words",
    concept: "Strings",
    from: "MD",
    when: "Today 10:15",
    mins: 15,
    statement:
      "Write reverseWords(sentence). It returns the sentence with the order of the words reversed. Words are separated by single spaces.",
    functionName: "reverseWords",
    params: ["sentence"],
    starterCode:
      'function reverseWords(sentence) {\n  // your code here\n}\n\nconsole.log(reverseWords("get seen get hired"));',
    tests: [
      { input: ["level up"], expected: "up level" },
      { input: ["hired"], expected: "hired" },
      { input: ["get seen get hired"], expected: "hired get seen get" },
    ],
  },
  {
    id: 2,
    title: "Largest Number",
    concept: "Arrays",
    from: "MD",
    when: "Today 09:40",
    mins: 10,
    statement:
      "Write largest(numbers). It returns the biggest number in the array. The array always has at least one number.",
    functionName: "largest",
    params: ["numbers"],
    starterCode:
      "function largest(numbers) {\n  // your code here\n}\n\nconsole.log(largest([3, 9, 2]));",
    tests: [
      { input: [[3, 9, 2]], expected: 9 },
      { input: [[-5, -2, -8]], expected: -2 },
      { input: [[7]], expected: 7 },
    ],
  },
  {
    id: 3,
    title: "Palindrome Check",
    concept: "Strings",
    from: "MD",
    when: "Yesterday 16:20",
    mins: 10,
    statement:
      "Write isPalindrome(word). It returns true if the word reads the same forwards and backwards, otherwise false.",
    functionName: "isPalindrome",
    params: ["word"],
    starterCode:
      'function isPalindrome(word) {\n  // your code here\n}\n\nconsole.log(isPalindrome("level"));',
    tests: [
      { input: ["level"], expected: true },
      { input: ["hello"], expected: false },
      { input: ["a"], expected: true },
    ],
    // this one is already handed in, so you can see the Submitted state
    submittedResult: "3/3 tests passed · 4m 12s used",
    submittedCode:
      'function isPalindrome(word) {\n  return word === word.split("").reverse().join("");\n}\n\nconsole.log(isPalindrome("level"));',
  },
];

export default liveProblems;

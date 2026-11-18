// XP is worked out from the level (difficulty) and the topic (concept).
// Change these numbers to change the XP for every question.
export const levelXp = { Easy: 20, Medium: 40, Hard: 60 };
export const topicXp = {
  Loops: 10,
  Strings: 15,
  Arrays: 20,
  Math: 10,
  "Hash Maps": 20,
  Sets: 15,
  "Two Pointers": 25,
  "Sliding Window": 30,
  Stacks: 25,
  Searching: 20,
  Sorting: 20,
  Recursion: 25,
  "Dynamic Programming": 30,
  Matrices: 25,
  Graphs: 30,
  "Bit Manipulation": 25,
};

const baseQuestions = [
  {
    id: 1,
    title: "Two Sum",
    concept: "Arrays",
    difficulty: "Easy",
    description:
      "Given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`. Each input has exactly one solution, the same element cannot be used twice, and the two indices must be returned in ascending order.",
    functionName: "twoSum",
    params: ["nums", "target"],
    starterCode:
      "function twoSum(nums, target) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
        explanation: "nums[0] + nums[1] = 2 + 7 = 9.",
      },
      {
        input: "nums = [3, 2, 4], target = 6",
        output: "[1, 2]",
        explanation: "nums[1] + nums[2] = 2 + 4 = 6.",
      },
      {
        input: "nums = [3, 3], target = 6",
        output: "[0, 1]",
        explanation:
          "The two 3s are different elements, so indices 0 and 1 are both valid.",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Exactly one valid answer exists",
      "The same element cannot be used twice",
    ],
    hint: "As you loop through the array, store each number you have seen (and its index) in a Map. For each new number, check whether `target - number` is already in the Map.",
    visibleTests: [{ input: [[-1, -2, -3, -4, -5], -8], expected: [2, 4] }],
    hiddenTests: [
      { input: [[0, -1, 2, -3, 1], -2], expected: [3, 4] },
      { input: [[0, 4, 3, 0], 0], expected: [0, 3] },
      { input: [[0, 3], 3], expected: [0, 1] },
      { input: [[1, 5, 9, 14, 20], 34], expected: [3, 4] },
    ],
  },
  {
    id: 2,
    title: "Reverse String",
    concept: "Strings",
    difficulty: "Easy",
    description:
      "Given a string `s`, return a new string with its characters in reverse order.",
    functionName: "reverseString",
    params: ["s"],
    starterCode:
      "function reverseString(s) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: 's = "hello"',
        output: '"olleh"',
        explanation: "The characters are read from right to left.",
      },
      {
        input: 's = "JavaScript"',
        output: '"tpircSavaJ"',
        explanation: "Capital letters stay capital; only the order changes.",
      },
    ],
    constraints: [
      "0 <= s.length <= 10^5",
      "s consists of printable ASCII characters",
    ],
    hint: "Build a new string by looping from the last index down to 0, adding each character as you go.",
    visibleTests: [
      { input: ["hello"], expected: "olleh" },
      { input: ["Hello, World!"], expected: "!dlroW ,olleH" },
    ],
    hiddenTests: [
      { input: [""], expected: "" },
      { input: ["a"], expected: "a" },
      { input: ["racecar"], expected: "racecar" },
      { input: ["12345"], expected: "54321" },
      { input: ["a b c"], expected: "c b a" },
    ],
  },
  {
    id: 3,
    title: "FizzBuzz",
    concept: "Math",
    difficulty: "Easy",
    description:
      "Return an array of strings for the numbers 1 to `n`. For each number: use 'FizzBuzz' if it is divisible by both 3 and 5, 'Fizz' if it is divisible by 3, 'Buzz' if it is divisible by 5, and otherwise the number itself as a string.",
    functionName: "fizzBuzz",
    params: ["n"],
    starterCode: "function fizzBuzz(n) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "n = 3",
        output: '["1", "2", "Fizz"]',
        explanation: "3 is divisible by 3, so it becomes 'Fizz'.",
      },
      {
        input: "n = 5",
        output: '["1", "2", "Fizz", "4", "Buzz"]',
        explanation: "5 is divisible by 5, so it becomes 'Buzz'.",
      },
    ],
    constraints: ["1 <= n <= 10^4"],
    hint: "Loop from 1 to n. Check the divisible-by-both case first, before you check 3 and 5 on their own.",
    visibleTests: [
      {
        input: [10],
        expected: [
          "1",
          "2",
          "Fizz",
          "4",
          "Buzz",
          "Fizz",
          "7",
          "8",
          "Fizz",
          "Buzz",
        ],
      },
      {
        input: [15],
        expected: [
          "1",
          "2",
          "Fizz",
          "4",
          "Buzz",
          "Fizz",
          "7",
          "8",
          "Fizz",
          "Buzz",
          "11",
          "Fizz",
          "13",
          "14",
          "FizzBuzz",
        ],
      },
    ],
    hiddenTests: [
      { input: [1], expected: ["1"] },
      { input: [3], expected: ["1", "2", "Fizz"] },
      {
        input: [20],
        expected: [
          "1",
          "2",
          "Fizz",
          "4",
          "Buzz",
          "Fizz",
          "7",
          "8",
          "Fizz",
          "Buzz",
          "11",
          "Fizz",
          "13",
          "14",
          "FizzBuzz",
          "16",
          "17",
          "Fizz",
          "19",
          "Buzz",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Valid Palindrome",
    concept: "Strings",
    difficulty: "Easy",
    description:
      "A phrase is a palindrome if, after converting all uppercase letters to lowercase and removing every character that is not a letter or digit, it reads the same forwards and backwards. Return `true` if `s` is a palindrome, otherwise `false`.",
    functionName: "isPalindrome",
    params: ["s"],
    starterCode:
      "function isPalindrome(s) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
        explanation:
          "After cleaning, the text is 'amanaplanacanalpanama', which reads the same both ways.",
      },
      {
        input: 's = "race a car"',
        output: "false",
        explanation:
          "After cleaning, the text is 'raceacar', which is not a palindrome.",
      },
    ],
    constraints: [
      "1 <= s.length <= 2 * 10^5",
      "s consists of printable ASCII characters",
    ],
    hint: "Clean the string first (lowercase it and remove anything that is not a letter or digit). Then compare characters from both ends, moving inwards.",
    visibleTests: [
      { input: ["No lemon, no melon"], expected: true },
      { input: ["0P"], expected: false },
    ],
    hiddenTests: [
      { input: [" "], expected: true },
      { input: ["ab_a"], expected: true },
      { input: ["Was it a car or a cat I saw?"], expected: true },
      { input: ["ab"], expected: false },
    ],
  },
  {
    id: 5,
    title: "Count Vowels",
    concept: "Strings",
    difficulty: "Easy",
    description:
      "Return the number of vowels (`a`, `e`, `i`, `o`, `u`) in the string `s`. Count both lowercase and uppercase vowels. The letter `y` is not a vowel here.",
    functionName: "countVowels",
    params: ["s"],
    starterCode:
      "function countVowels(s) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: 's = "hello"',
        output: "2",
        explanation: "The vowels are 'e' and 'o'.",
      },
      {
        input: 's = "Rhythm"',
        output: "0",
        explanation: "There are no vowels ('y' does not count).",
      },
    ],
    constraints: [
      "0 <= s.length <= 10^5",
      "s consists of printable ASCII characters",
    ],
    hint: 'Lowercase the string, loop through every character, and add 1 to your count whenever the character is in `"aeiou"`.',
    visibleTests: [
      { input: ["AEIOU"], expected: 5 },
      { input: ["Programming Language"], expected: 7 },
    ],
    hiddenTests: [
      { input: [""], expected: 0 },
      { input: ["queueing"], expected: 5 },
      { input: ["bcdfg"], expected: 0 },
      { input: ["Education is Key"], expected: 7 },
    ],
  },
  {
    id: 6,
    title: "Sum of Digits",
    concept: "Math",
    difficulty: "Easy",
    description:
      "Return the sum of the digits of the non-negative integer `n`.",
    functionName: "sumOfDigits",
    params: ["n"],
    starterCode:
      "function sumOfDigits(n) {\n  // Write your solution here\n\n}",
    examples: [
      { input: "n = 123", output: "6", explanation: "1 + 2 + 3 = 6." },
      { input: "n = 9045", output: "18", explanation: "9 + 0 + 4 + 5 = 18." },
    ],
    constraints: ["0 <= n <= 10^9"],
    hint: "Use `n % 10` to get the last digit and `Math.floor(n / 10)` to remove it. Repeat until n is 0.",
    visibleTests: [
      { input: [99999], expected: 45 },
      { input: [987654321], expected: 45 },
    ],
    hiddenTests: [
      { input: [0], expected: 0 },
      { input: [5], expected: 5 },
      { input: [1000000000], expected: 1 },
      { input: [4070], expected: 11 },
    ],
  },
  {
    id: 7,
    title: "Valid Anagram",
    concept: "Strings",
    difficulty: "Easy",
    description:
      "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s` (it uses exactly the same letters with the same counts), and `false` otherwise.",
    functionName: "isAnagram",
    params: ["s", "t"],
    starterCode:
      "function isAnagram(s, t) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: "true",
        explanation:
          "Both words contain three a's, one n, one g, one r and one m.",
      },
      {
        input: 's = "rat", t = "car"',
        output: "false",
        explanation: "'rat' has a 't' but 'car' has a 'c'.",
      },
    ],
    constraints: [
      "1 <= s.length, t.length <= 5 * 10^4",
      "s and t consist of lowercase English letters",
    ],
    hint: "If the lengths differ, it cannot be an anagram. Otherwise count how many times each letter appears in `s`, then subtract the counts using `t`.",
    visibleTests: [
      { input: ["listen", "silent"], expected: true },
      { input: ["triangle", "integral"], expected: true },
    ],
    hiddenTests: [
      { input: ["a", "a"], expected: true },
      { input: ["ab", "a"], expected: false },
      { input: ["aacc", "ccac"], expected: false },
      { input: ["hello", "bello"], expected: false },
      { input: ["abcdef", "fedcba"], expected: true },
    ],
  },
  {
    id: 8,
    title: "Contains Duplicate",
    concept: "Arrays",
    difficulty: "Easy",
    description:
      "Return `true` if any value appears at least twice in the array `nums`, and `false` if every element is distinct.",
    functionName: "containsDuplicate",
    params: ["nums"],
    starterCode:
      "function containsDuplicate(nums) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "nums = [1, 2, 3, 1]",
        output: "true",
        explanation: "The value 1 appears twice.",
      },
      {
        input: "nums = [1, 2, 3, 4]",
        output: "false",
        explanation: "Every element is distinct.",
      },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    hint: "Add each number to a Set as you loop. If a number is already in the Set, you have found a duplicate.",
    visibleTests: [
      { input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true },
      { input: [[5, 4, 3, 2, 1]], expected: false },
    ],
    hiddenTests: [
      { input: [[1]], expected: false },
      { input: [[1000000000, -1000000000, 1000000000]], expected: true },
      { input: [[-1, -2, -3, -4, -5, -1]], expected: true },
      { input: [[0, 1, 2, 3, 4, 5, 6, 7]], expected: false },
    ],
  },
  {
    id: 9,
    title: "Merge Sorted Arrays",
    concept: "Arrays",
    difficulty: "Easy",
    description:
      "Given two arrays `a` and `b`, each sorted in non-decreasing order, return a new sorted array containing every element from both.",
    functionName: "mergeSortedArrays",
    params: ["a", "b"],
    starterCode:
      "function mergeSortedArrays(a, b) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "a = [1, 3, 5], b = [2, 4, 6]",
        output: "[1, 2, 3, 4, 5, 6]",
        explanation: "The values alternate between the two arrays.",
      },
      {
        input: "a = [1, 2, 2], b = [2, 3]",
        output: "[1, 2, 2, 2, 3]",
        explanation: "Duplicates are all kept.",
      },
    ],
    constraints: [
      "0 <= a.length, b.length <= 10^4",
      "-10^4 <= a[i], b[i] <= 10^4",
      "Both arrays are sorted in non-decreasing order",
    ],
    hint: "Keep one pointer in each array. Compare the two current values, push the smaller one, and move that pointer forward. Add whatever is left at the end.",
    visibleTests: [
      {
        input: [
          [-5, -1, 0],
          [-3, -2, 7],
        ],
        expected: [-5, -3, -2, -1, 0, 7],
      },
      {
        input: [
          [1, 2, 3],
          [4, 5, 6],
        ],
        expected: [1, 2, 3, 4, 5, 6],
      },
    ],
    hiddenTests: [
      { input: [[], []], expected: [] },
      { input: [[1], []], expected: [1] },
      { input: [[], [2, 4]], expected: [2, 4] },
      {
        input: [
          [4, 5, 6],
          [1, 2, 3],
        ],
        expected: [1, 2, 3, 4, 5, 6],
      },
      {
        input: [
          [1, 1, 1],
          [1, 1],
        ],
        expected: [1, 1, 1, 1, 1],
      },
    ],
  },
  {
    id: 10,
    title: "Move Zeroes",
    concept: "Arrays",
    difficulty: "Easy",
    description:
      "Return a new array in which every `0` from `nums` has been moved to the end, while the non-zero elements keep their original relative order.",
    functionName: "moveZeroes",
    params: ["nums"],
    starterCode:
      "function moveZeroes(nums) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "nums = [0, 1, 0, 3, 12]",
        output: "[1, 3, 12, 0, 0]",
        explanation: "The zeros go to the end; 1, 3, 12 stay in order.",
      },
      {
        input: "nums = [0]",
        output: "[0]",
        explanation: "A single zero stays where it is.",
      },
    ],
    constraints: ["1 <= nums.length <= 10^4", "-2^31 <= nums[i] <= 2^31 - 1"],
    hint: "Make a new array. Add every non-zero value first, then add as many zeros as are needed to reach the original length.",
    visibleTests: [
      { input: [[4, 0, 5, 0, 0, 6]], expected: [4, 5, 6, 0, 0, 0] },
      { input: [[1, 2, 3]], expected: [1, 2, 3] },
    ],
    hiddenTests: [
      { input: [[0, 0, 1]], expected: [1, 0, 0] },
      { input: [[0, 0, 0]], expected: [0, 0, 0] },
      { input: [[-1, 0, -2, 0]], expected: [-1, -2, 0, 0] },
      { input: [[7]], expected: [7] },
    ],
  },
  {
    id: 11,
    title: "Missing Number",
    concept: "Math",
    difficulty: "Easy",
    description:
      "The array `nums` contains `n` distinct numbers taken from the range `0` to `n` (inclusive). Return the one number in that range that is missing from the array.",
    functionName: "missingNumber",
    params: ["nums"],
    starterCode:
      "function missingNumber(nums) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "nums = [3, 0, 1]",
        output: "2",
        explanation: "n = 3, so the range is 0 to 3. The number 2 is missing.",
      },
      {
        input: "nums = [0, 1]",
        output: "2",
        explanation: "n = 2, so the range is 0 to 2. The number 2 is missing.",
      },
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "0 <= nums[i] <= nums.length",
      "All numbers in nums are distinct",
    ],
    hint: "The numbers 0 to n add up to `n * (n + 1) / 2`. Subtract the sum of the array from that total.",
    visibleTests: [
      { input: [[9, 6, 4, 2, 3, 5, 7, 0, 1]], expected: 8 },
      { input: [[1]], expected: 0 },
    ],
    hiddenTests: [
      { input: [[0]], expected: 1 },
      { input: [[1, 2, 3, 4, 5]], expected: 0 },
      { input: [[5, 4, 3, 2, 0]], expected: 1 },
      { input: [[0, 2, 3]], expected: 1 },
    ],
  },
  {
    id: 12,
    title: "Longest Common Prefix",
    concept: "Strings",
    difficulty: "Easy",
    description:
      "Return the longest string that is a prefix of every string in `strs`. If there is no common prefix, return an empty string.",
    functionName: "longestCommonPrefix",
    params: ["strs"],
    starterCode:
      "function longestCommonPrefix(strs) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: 'strs = ["flower", "flow", "flight"]',
        output: '"fl"',
        explanation: "All three words start with 'fl'.",
      },
      {
        input: 'strs = ["dog", "racecar", "car"]',
        output: '""',
        explanation: "The words share no common prefix.",
      },
    ],
    constraints: [
      "1 <= strs.length <= 200",
      "0 <= strs[i].length <= 200",
      "strs[i] consists of lowercase English letters",
    ],
    hint: "Take the first word as your starting prefix. For each other word, shorten the prefix until the word starts with it.",
    visibleTests: [
      {
        input: [["interview", "internet", "interval", "internal"]],
        expected: "inter",
      },
      { input: [["alone"]], expected: "alone" },
    ],
    hiddenTests: [
      { input: [["", "b"]], expected: "" },
      { input: [["abc", "abc", "abc"]], expected: "abc" },
      { input: [["ab", "a"]], expected: "a" },
      { input: [["prefix", "pretend", "predict"]], expected: "pre" },
    ],
  },
  {
    id: 13,
    title: "Roman to Integer",
    concept: "Strings",
    difficulty: "Easy",
    description:
      "Convert a Roman numeral to an integer. The symbols are I=1, V=5, X=10, L=50, C=100, D=500 and M=1000. Symbols are normally written largest to smallest, but a smaller symbol placed before a larger one is subtracted (IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900).",
    functionName: "romanToInt",
    params: ["s"],
    starterCode: "function romanToInt(s) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: 's = "LVIII"',
        output: "58",
        explanation: "L = 50, V = 5, III = 3.",
      },
      {
        input: 's = "MCMXCIV"',
        output: "1994",
        explanation: "M = 1000, CM = 900, XC = 90, IV = 4.",
      },
    ],
    constraints: [
      "1 <= s.length <= 15",
      "s contains only the characters I, V, X, L, C, D, M",
      "s is a valid Roman numeral between 1 and 3999",
    ],
    hint: "Make a Map of symbol values. Loop through the string: if the current value is smaller than the next one, subtract it, otherwise add it.",
    visibleTests: [
      { input: ["III"], expected: 3 },
      { input: ["IV"], expected: 4 },
    ],
    hiddenTests: [
      { input: ["IX"], expected: 9 },
      { input: ["MMMCMXCIX"], expected: 3999 },
      { input: ["XL"], expected: 40 },
      { input: ["CDXLIV"], expected: 444 },
    ],
  },
  {
    id: 14,
    title: "Best Time to Buy and Sell Stock",
    concept: "Arrays",
    difficulty: "Easy",
    description:
      "`prices[i]` is the price of a stock on day `i`. Choose one day to buy and a later day to sell. Return the maximum profit you can make, or `0` if no profit is possible.",
    functionName: "maxProfit",
    params: ["prices"],
    starterCode:
      "function maxProfit(prices) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "prices = [7, 1, 5, 3, 6, 4]",
        output: "5",
        explanation:
          "Buy on day 2 (price 1) and sell on day 5 (price 6): profit 6 - 1 = 5.",
      },
      {
        input: "prices = [7, 6, 4, 3, 1]",
        output: "0",
        explanation: "Prices only fall, so no profitable trade exists.",
      },
    ],
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    hint: "Loop once and keep track of the lowest price so far. At each day, check what the profit would be if you sold today.",
    visibleTests: [
      { input: [[2, 4, 1]], expected: 2 },
      { input: [[1, 2]], expected: 1 },
    ],
    hiddenTests: [
      { input: [[3, 3, 3]], expected: 0 },
      { input: [[5]], expected: 0 },
      { input: [[2, 1, 2, 1, 0, 1, 2]], expected: 2 },
      { input: [[1, 2, 3, 4, 5]], expected: 4 },
    ],
  },
  {
    id: 15,
    title: "Power of Two",
    concept: "Math",
    difficulty: "Easy",
    description:
      "Return `true` if the integer `n` is a power of two (that is, `n === 2^k` for some integer `k >= 0`), otherwise `false`.",
    functionName: "isPowerOfTwo",
    params: ["n"],
    starterCode:
      "function isPowerOfTwo(n) {\n  // Write your solution here\n\n}",
    examples: [
      { input: "n = 16", output: "true", explanation: "16 = 2^4." },
      {
        input: "n = 6",
        output: "false",
        explanation: "6 is between 4 (2^2) and 8 (2^3).",
      },
    ],
    constraints: ["-2^31 <= n <= 2^31 - 1"],
    hint: "Powers of two have exactly one 1 in binary. Check that n is greater than 0 and that `n & (n - 1)` equals 0.",
    visibleTests: [
      { input: [1], expected: true },
      { input: [1024], expected: true },
    ],
    hiddenTests: [
      { input: [3], expected: false },
      { input: [0], expected: false },
      { input: [-16], expected: false },
      { input: [1073741824], expected: true },
      { input: [2147483647], expected: false },
    ],
  },
  {
    id: 16,
    title: "Fibonacci Number",
    concept: "Recursion",
    difficulty: "Easy",
    description:
      "The Fibonacci numbers are defined as `F(0) = 0`, `F(1) = 1` and `F(n) = F(n - 1) + F(n - 2)` for `n > 1`. Given `n`, return `F(n)`.",
    functionName: "fib",
    params: ["n"],
    starterCode: "function fib(n) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "n = 5",
        output: "5",
        explanation: "F(5) = F(4) + F(3) = 3 + 2 = 5.",
      },
      {
        input: "n = 10",
        output: "55",
        explanation: "The sequence runs 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55.",
      },
    ],
    constraints: ["0 <= n <= 30"],
    hint: "Recursion works but repeats a lot of work. Try a loop that keeps only the previous two values and moves them forward each step.",
    visibleTests: [
      { input: [15], expected: 610 },
      { input: [20], expected: 6765 },
    ],
    hiddenTests: [
      { input: [0], expected: 0 },
      { input: [1], expected: 1 },
      { input: [2], expected: 1 },
      { input: [30], expected: 832040 },
    ],
  },
  {
    id: 17,
    title: "Valid Parentheses",
    concept: "Stacks",
    difficulty: "Easy",
    description:
      "Given a string `s` containing only the characters `(`, `)`, `{`, `}`, `[` and `]`, return `true` if it is valid. A string is valid when every open bracket is closed by the same type of bracket, and brackets are closed in the correct order.",
    functionName: "isValid",
    params: ["s"],
    starterCode: "function isValid(s) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: 's = "()[]{}"',
        output: "true",
        explanation: "Each pair opens and closes in order.",
      },
      {
        input: 's = "(]"',
        output: "false",
        explanation: "The '(' is closed by the wrong type of bracket.",
      },
    ],
    constraints: ["1 <= s.length <= 10^4", "s consists only of ()[]{}"],
    hint: "Use a stack. Push every opening bracket. When you see a closing bracket, the top of the stack must be its matching opener. At the end the stack must be empty.",
    visibleTests: [
      { input: ["{[]}"], expected: true },
      { input: ["([)]"], expected: false },
    ],
    hiddenTests: [
      { input: ["()"], expected: true },
      { input: ["("], expected: false },
      { input: ["]"], expected: false },
      { input: ["((()))"], expected: true },
      { input: ["([]){"], expected: false },
    ],
  },
  {
    id: 18,
    title: "Binary Search",
    concept: "Searching",
    difficulty: "Easy",
    description:
      "Given an array `nums` of distinct integers sorted in ascending order and an integer `target`, return the index of `target` in `nums`, or `-1` if it is not present. Aim for O(log n) time.",
    functionName: "binarySearch",
    params: ["nums", "target"],
    starterCode:
      "function binarySearch(nums, target) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "nums = [-1, 0, 3, 5, 9, 12], target = 9",
        output: "4",
        explanation: "9 is at index 4.",
      },
      {
        input: "nums = [-1, 0, 3, 5, 9, 12], target = 2",
        output: "-1",
        explanation: "2 does not exist in the array.",
      },
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All values in nums are distinct and sorted in ascending order",
    ],
    hint: "Keep `left` and `right` indexes. Check the middle: if it is too small, move `left` past it; if too big, move `right` before it. Stop when `left` is greater than `right`.",
    visibleTests: [
      { input: [[1, 3, 5, 7, 9, 11], 1], expected: 0 },
      { input: [[1, 3, 5, 7, 9, 11], 11], expected: 5 },
    ],
    hiddenTests: [
      { input: [[2, 4, 6, 8], 6], expected: 2 },
      { input: [[2, 4, 6, 8], 7], expected: -1 },
      { input: [[5], 5], expected: 0 },
      { input: [[5], -5], expected: -1 },
      { input: [[-10, -5, 0, 5, 10], -5], expected: 1 },
    ],
  },
  {
    id: 19,
    title: "Single Number",
    concept: "Bit Manipulation",
    difficulty: "Easy",
    description:
      "Every element in `nums` appears exactly twice, except for one element which appears once. Find and return that single element.",
    functionName: "singleNumber",
    params: ["nums"],
    starterCode:
      "function singleNumber(nums) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "nums = [2, 2, 1]",
        output: "1",
        explanation: "1 is the only value that appears once.",
      },
      {
        input: "nums = [4, 1, 2, 1, 2]",
        output: "4",
        explanation: "4 is the only value without a pair.",
      },
    ],
    constraints: [
      "1 <= nums.length <= 3 * 10^4",
      "-3 * 10^4 <= nums[i] <= 3 * 10^4",
      "Every element appears twice except for one",
    ],
    hint: "XOR cancels out matching numbers (`a ^ a = 0`) and `a ^ 0 = a`. XOR every number in the array together.",
    visibleTests: [
      { input: [[7, 3, 5, 3, 5]], expected: 7 },
      { input: [[10, 20, 10, 30, 20]], expected: 30 },
    ],
    hiddenTests: [
      { input: [[1]], expected: 1 },
      { input: [[0, 1, 0]], expected: 1 },
      { input: [[-1, -1, -2]], expected: -2 },
      { input: [[5, 5, 9, 9, -4]], expected: -4 },
    ],
  },
  {
    id: 20,
    title: "Second Largest Number",
    concept: "Arrays",
    difficulty: "Easy",
    description:
      "Return the second largest distinct value in the array `nums`. If the largest value appears more than once, it still counts only once.",
    functionName: "secondLargest",
    params: ["nums"],
    starterCode:
      "function secondLargest(nums) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "nums = [3, 1, 4, 1, 5]",
        output: "4",
        explanation:
          "The distinct values in order are 5, 4, 3, 1, so the second largest is 4.",
      },
      {
        input: "nums = [10, 10, 9]",
        output: "9",
        explanation: "10 only counts once, so the second largest is 9.",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^6 <= nums[i] <= 10^6",
      "nums contains at least two distinct values",
    ],
    hint: "Remove duplicates with a Set, then sort or loop to find the largest and the second largest. Think about what to do when there is only one distinct value.",
    visibleTests: [
      { input: [[2, 9, 5, 9, 1]], expected: 5 },
      { input: [[1, 2]], expected: 1 },
    ],
    hiddenTests: [
      { input: [[-5, -1, -3]], expected: -3 },
      { input: [[7, 7, 7, 3]], expected: 3 },
      { input: [[5, 4, 3, 2, 1]], expected: 4 },
      { input: [[1, 100, 100, 99]], expected: 99 },
    ],
  },
  {
    id: 21,
    title: "Group Anagrams",
    concept: "Strings",
    difficulty: "Medium",
    description:
      "Group the words in `strs` so that words that are anagrams of each other end up together. To keep the answer deterministic: sort the words inside each group alphabetically, then sort the groups by their first word.",
    functionName: "groupAnagrams",
    params: ["strs"],
    starterCode:
      "function groupAnagrams(strs) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: 'strs = ["eat", "tea", "tan", "ate", "nat", "bat"]',
        output: '[["ate", "eat", "tea"], ["bat"], ["nat", "tan"]]',
        explanation:
          "'eat', 'tea' and 'ate' share the same letters; so do 'tan' and 'nat'. 'bat' is alone.",
      },
      {
        input: 'strs = [""]',
        output: '[[""]]',
        explanation: "An empty string forms a group by itself.",
      },
    ],
    constraints: [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100",
      "strs[i] consists of lowercase English letters",
    ],
    hint: "Words that are anagrams become the same string when their letters are sorted. Use that sorted string as a key in a Map. Remember the required ordering at the end.",
    visibleTests: [
      {
        input: [["abc", "bca", "cab", "xyz", "zyx"]],
        expected: [
          ["abc", "bca", "cab"],
          ["xyz", "zyx"],
        ],
      },
      {
        input: [["listen", "silent", "enlist", "google", "gogole"]],
        expected: [
          ["enlist", "listen", "silent"],
          ["gogole", "google"],
        ],
      },
    ],
    hiddenTests: [
      { input: [["a"]], expected: [["a"]] },
      { input: [["ab", "ba", "ab"]], expected: [["ab", "ab", "ba"]] },
      { input: [["abc", "def", "ghi"]], expected: [["abc"], ["def"], ["ghi"]] },
      { input: [["", "", "a"]], expected: [["", ""], ["a"]] },
    ],
  },
  {
    id: 22,
    title: "Top K Frequent Elements",
    concept: "Arrays",
    difficulty: "Medium",
    description:
      "Return the `k` most frequent elements of `nums`. Order the result by frequency, highest first. If two numbers have the same frequency, the smaller number comes first.",
    functionName: "topKFrequent",
    params: ["nums", "k"],
    starterCode:
      "function topKFrequent(nums, k) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "nums = [1, 1, 1, 2, 2, 3], k = 2",
        output: "[1, 2]",
        explanation: "1 appears 3 times and 2 appears twice.",
      },
      {
        input: "nums = [1], k = 1",
        output: "[1]",
        explanation: "There is only one element.",
      },
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "1 <= k <= the number of distinct elements in nums",
    ],
    hint: "Count each number with a Map, turn the entries into an array, and sort by count (highest first), using the smaller number to break ties. Then take the first `k`.",
    visibleTests: [
      { input: [[4, 4, 4, 5, 5, 6], 1], expected: [4] },
      { input: [[5, 3, 3, 5, 1], 2], expected: [3, 5] },
    ],
    hiddenTests: [
      { input: [[-1, -1, -2, -2, -3], 2], expected: [-2, -1] },
      { input: [[1, 2, 3, 4], 4], expected: [1, 2, 3, 4] },
      { input: [[7, 7, 8, 8, 8, 9, 9, 9, 9], 3], expected: [9, 8, 7] },
      { input: [[0, 0, 0, 1, 1, 2], 2], expected: [0, 1] },
    ],
  },
  {
    id: 23,
    title: "Product of Array Except Self",
    concept: "Arrays",
    difficulty: "Medium",
    description:
      "Return an array `answer` where `answer[i]` is the product of every element of `nums` except `nums[i]`. Solve it without using division, ideally in O(n) time.",
    functionName: "productExceptSelf",
    params: ["nums"],
    starterCode:
      "function productExceptSelf(nums) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "nums = [1, 2, 3, 4]",
        output: "[24, 12, 8, 6]",
        explanation:
          "answer[0] = 2 * 3 * 4 = 24, answer[1] = 1 * 3 * 4 = 12, and so on.",
      },
      {
        input: "nums = [-1, 1, 0, -3, 3]",
        output: "[0, 0, 9, 0, 0]",
        explanation: "Only the position of the 0 gets a non-zero product.",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^5",
      "-30 <= nums[i] <= 30",
      "Every prefix and suffix product fits in a 32-bit integer",
    ],
    hint: "Do two passes. First pass: store the product of everything to the left of each index. Second pass (from the right): multiply in the product of everything to the right.",
    visibleTests: [
      { input: [[2, 3]], expected: [3, 2] },
      { input: [[1, 1, 1, 1]], expected: [1, 1, 1, 1] },
    ],
    hiddenTests: [
      { input: [[0, 0]], expected: [0, 0] },
      { input: [[5, 0, 2]], expected: [0, 10, 0] },
      { input: [[-2, -3, 4]], expected: [-12, -8, 6] },
      { input: [[3, 4, 5, 6]], expected: [120, 90, 72, 60] },
    ],
  },
  {
    id: 24,
    title: "Maximum Subarray",
    concept: "Arrays",
    difficulty: "Medium",
    description:
      "Find the contiguous subarray (containing at least one number) of `nums` that has the largest sum, and return that sum.",
    functionName: "maxSubArray",
    params: ["nums"],
    starterCode:
      "function maxSubArray(nums) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        output: "6",
        explanation: "The subarray [4, -1, 2, 1] has the largest sum, 6.",
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "The only subarray is [1].",
      },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    hint: "Loop once and track the best sum ending at the current number: either extend the previous sum or start fresh from this number. Keep the highest value you see.",
    visibleTests: [
      { input: [[5, 4, -1, 7, 8]], expected: 23 },
      { input: [[-1]], expected: -1 },
    ],
    hiddenTests: [
      { input: [[-3, -2, -5]], expected: -2 },
      { input: [[2, -1, 2, -1, 2]], expected: 4 },
      { input: [[-2, -1]], expected: -1 },
      { input: [[8, -19, 5, -4, 20]], expected: 21 },
    ],
  },
  {
    id: 25,
    title: "Rotate Array",
    concept: "Arrays",
    difficulty: "Medium",
    description:
      "Return a new array containing the elements of `nums` rotated to the right by `k` steps. `k` may be larger than the length of the array.",
    functionName: "rotateArray",
    params: ["nums", "k"],
    starterCode:
      "function rotateArray(nums, k) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "nums = [1, 2, 3, 4, 5, 6, 7], k = 3",
        output: "[5, 6, 7, 1, 2, 3, 4]",
        explanation: "Rotating right 3 times moves 5, 6, 7 to the front.",
      },
      {
        input: "nums = [-1, -100, 3, 99], k = 2",
        output: "[3, 99, -1, -100]",
        explanation: "After two steps the last two elements lead.",
      },
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-2^31 <= nums[i] <= 2^31 - 1",
      "0 <= k <= 10^5",
    ],
    hint: "Use `k % nums.length` first so large values of `k` still work. Then join the last `k` items with the rest, using `slice`.",
    visibleTests: [
      { input: [[1, 2], 3], expected: [2, 1] },
      { input: [[1], 10], expected: [1] },
    ],
    hiddenTests: [
      { input: [[1, 2, 3], 0], expected: [1, 2, 3] },
      { input: [[1, 2, 3, 4, 5], 5], expected: [1, 2, 3, 4, 5] },
      { input: [[10, 20, 30, 40], 1], expected: [40, 10, 20, 30] },
      { input: [[1, 2, 3, 4, 5, 6], 8], expected: [5, 6, 1, 2, 3, 4] },
    ],
  },
  {
    id: 26,
    title: "Container With Most Water",
    concept: "Arrays",
    difficulty: "Medium",
    description:
      "`height[i]` is the height of a vertical line drawn at position `i`. Pick two lines that, together with the x-axis, form a container, and return the maximum amount of water it can hold (width times the shorter of the two lines).",
    functionName: "maxArea",
    params: ["height"],
    starterCode:
      "function maxArea(height) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "height = [1, 8, 6, 2, 5, 4, 8, 3, 7]",
        output: "49",
        explanation:
          "The lines at index 1 (height 8) and index 8 (height 7) hold 7 * 7 = 49.",
      },
      {
        input: "height = [1, 1]",
        output: "1",
        explanation: "Width 1 times height 1.",
      },
    ],
    constraints: ["2 <= height.length <= 10^5", "0 <= height[i] <= 10^4"],
    hint: "Start with one pointer at each end. Calculate the area, then move the pointer at the shorter line inwards, because that is the only move that can help.",
    visibleTests: [
      { input: [[4, 3, 2, 1, 4]], expected: 16 },
      { input: [[1, 2, 1]], expected: 2 },
    ],
    hiddenTests: [
      { input: [[2, 3, 4, 5, 18, 17, 6]], expected: 17 },
      { input: [[0, 0]], expected: 0 },
      { input: [[5, 5, 5, 5]], expected: 15 },
      { input: [[1, 2, 4, 3]], expected: 4 },
    ],
  },
  {
    id: 27,
    title: "3Sum",
    concept: "Arrays",
    difficulty: "Medium",
    description:
      "Return all unique triplets `[a, b, c]` in `nums` such that `a + b + c === 0`. The result must not contain duplicate triplets. To keep the answer deterministic: sort the numbers inside each triplet ascending, then sort the list of triplets in lexicographical order.",
    functionName: "threeSum",
    params: ["nums"],
    starterCode:
      "function threeSum(nums) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "nums = [-1, 0, 1, 2, -1, -4]",
        output: "[[-1, -1, 2], [-1, 0, 1]]",
        explanation:
          "-1 + -1 + 2 = 0 and -1 + 0 + 1 = 0. The two different -1 values give the same triplets, so each is listed once.",
      },
      {
        input: "nums = [0, 1, 1]",
        output: "[]",
        explanation: "No three numbers sum to 0.",
      },
    ],
    constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
    hint: "Sort the array. Fix one number, then use two pointers on the rest to find a pair that makes the total 0. Skip repeated values so you do not create duplicate triplets.",
    visibleTests: [
      { input: [[0, 0, 0]], expected: [[0, 0, 0]] },
      { input: [[0, 0, 0, 0]], expected: [[0, 0, 0]] },
    ],
    hiddenTests: [
      {
        input: [[-2, 0, 1, 1, 2]],
        expected: [
          [-2, 0, 2],
          [-2, 1, 1],
        ],
      },
      {
        input: [[3, -2, 1, 0, -1, 2, -3]],
        expected: [
          [-3, 0, 3],
          [-3, 1, 2],
          [-2, -1, 3],
          [-2, 0, 2],
          [-1, 0, 1],
        ],
      },
      { input: [[1, 2, 3]], expected: [] },
      { input: [[-1, -1, -1, 2, 2]], expected: [[-1, -1, 2]] },
      {
        input: [[-5, 2, 3, 0, 5, -3, -2]],
        expected: [
          [-5, 0, 5],
          [-5, 2, 3],
          [-3, -2, 5],
          [-3, 0, 3],
          [-2, 0, 2],
        ],
      },
    ],
  },
  {
    id: 28,
    title: "Longest Substring Without Repeating Characters",
    concept: "Strings",
    difficulty: "Medium",
    description:
      "Given a string `s`, return the length of the longest substring that contains no repeated characters.",
    functionName: "lengthOfLongestSubstring",
    params: ["s"],
    starterCode:
      "function lengthOfLongestSubstring(s) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation:
          "The longest substring without repeats is 'abc', length 3.",
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: "Every substring of 'b's repeats, so the best is 'b'.",
      },
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces",
    ],
    hint: "Use a sliding window with a Set (or a Map of last positions). When a character repeats, move the left edge forward until the window has no repeats again.",
    visibleTests: [
      { input: ["pwwkew"], expected: 3 },
      { input: [""], expected: 0 },
    ],
    hiddenTests: [
      { input: [" "], expected: 1 },
      { input: ["dvdf"], expected: 3 },
      { input: ["abba"], expected: 2 },
      { input: ["tmmzuxt"], expected: 5 },
      { input: ["abcdefg"], expected: 7 },
    ],
  },
  {
    id: 29,
    title: "Spiral Matrix",
    concept: "Matrices",
    difficulty: "Medium",
    description:
      "Given an `m x n` matrix, return all of its elements in spiral order: start at the top-left, go right, then down, then left, then up, and keep spiralling inwards.",
    functionName: "spiralOrder",
    params: ["matrix"],
    starterCode:
      "function spiralOrder(matrix) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        output: "[1, 2, 3, 6, 9, 8, 7, 4, 5]",
        explanation:
          "Right along the top, down the right edge, left along the bottom, up the left edge, then the middle.",
      },
      {
        input: "matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]",
        output: "[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]",
        explanation: "Works for non-square matrices too.",
      },
    ],
    constraints: ["1 <= m, n <= 10", "-100 <= matrix[i][j] <= 100"],
    hint: "Track four boundaries: top, bottom, left and right. Walk along each edge in turn, then shrink that boundary and repeat until they cross.",
    visibleTests: [
      { input: [[[1]]], expected: [1] },
      {
        input: [
          [
            [1, 2],
            [3, 4],
          ],
        ],
        expected: [1, 2, 4, 3],
      },
    ],
    hiddenTests: [
      { input: [[[1, 2, 3]]], expected: [1, 2, 3] },
      { input: [[[1], [2], [3]]], expected: [1, 2, 3] },
      {
        input: [
          [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16],
          ],
        ],
        expected: [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10],
      },
      {
        input: [
          [
            [1, 2],
            [3, 4],
            [5, 6],
          ],
        ],
        expected: [1, 2, 4, 6, 5, 3],
      },
    ],
  },
  {
    id: 30,
    title: "Rotate Image",
    concept: "Matrices",
    difficulty: "Medium",
    description:
      "Given an `n x n` matrix, return a new matrix that is the original rotated 90 degrees clockwise.",
    functionName: "rotateImage",
    params: ["matrix"],
    starterCode:
      "function rotateImage(matrix) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        output: "[[7, 4, 1], [8, 5, 2], [9, 6, 3]]",
        explanation:
          "The first column (1, 4, 7) read bottom to top becomes the first row.",
      },
      {
        input: "matrix = [[1, 2], [3, 4]]",
        output: "[[3, 1], [4, 2]]",
        explanation: "Each element moves one corner clockwise.",
      },
    ],
    constraints: [
      "n === matrix.length === matrix[i].length",
      "1 <= n <= 20",
      "-1000 <= matrix[i][j] <= 1000",
    ],
    hint: "The first row of the result is the first column of the original read from the bottom up. Build each new row by reading a column from the last row to the first.",
    visibleTests: [
      { input: [[[1]]], expected: [[1]] },
      {
        input: [
          [
            [5, 1, 9, 11],
            [2, 4, 8, 10],
            [13, 3, 6, 7],
            [15, 14, 12, 16],
          ],
        ],
        expected: [
          [15, 13, 2, 5],
          [14, 3, 4, 1],
          [12, 6, 8, 9],
          [16, 7, 10, 11],
        ],
      },
    ],
    hiddenTests: [
      {
        input: [
          [
            [0, 0],
            [0, 1],
          ],
        ],
        expected: [
          [0, 0],
          [1, 0],
        ],
      },
      {
        input: [
          [
            [-1, -2],
            [-3, -4],
          ],
        ],
        expected: [
          [-3, -1],
          [-4, -2],
        ],
      },
      {
        input: [
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
          ],
        ],
        expected: [
          [7, 4, 1],
          [8, 5, 2],
          [9, 6, 3],
        ],
      },
    ],
  },
  {
    id: 31,
    title: "Merge Intervals",
    concept: "Arrays",
    difficulty: "Medium",
    description:
      "Given an array of intervals `[start, end]`, merge all overlapping intervals and return the non-overlapping intervals sorted by start. Intervals that only touch (such as `[1, 4]` and `[4, 5]`) count as overlapping.",
    functionName: "mergeIntervals",
    params: ["intervals"],
    starterCode:
      "function mergeIntervals(intervals) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]",
        output: "[[1, 6], [8, 10], [15, 18]]",
        explanation: "[1, 3] and [2, 6] overlap, so they merge into [1, 6].",
      },
      {
        input: "intervals = [[1, 4], [4, 5]]",
        output: "[[1, 5]]",
        explanation: "The intervals touch at 4, so they merge.",
      },
    ],
    constraints: [
      "1 <= intervals.length <= 10^4",
      "intervals[i].length === 2",
      "0 <= start <= end <= 10^4",
    ],
    hint: "Sort the intervals by start value. Then loop through them: if the current interval starts at or before the end of the last merged one, extend that end. Otherwise add it as a new interval.",
    visibleTests: [
      {
        input: [
          [
            [8, 10],
            [1, 3],
            [2, 6],
            [15, 18],
          ],
        ],
        expected: [
          [1, 6],
          [8, 10],
          [15, 18],
        ],
      },
      {
        input: [
          [
            [1, 4],
            [0, 4],
          ],
        ],
        expected: [[0, 4]],
      },
    ],
    hiddenTests: [
      {
        input: [
          [
            [1, 4],
            [2, 3],
          ],
        ],
        expected: [[1, 4]],
      },
      { input: [[[1, 2]]], expected: [[1, 2]] },
      {
        input: [
          [
            [1, 10],
            [2, 3],
            [4, 5],
            [6, 7],
          ],
        ],
        expected: [[1, 10]],
      },
      {
        input: [
          [
            [1, 2],
            [3, 4],
            [5, 6],
          ],
        ],
        expected: [
          [1, 2],
          [3, 4],
          [5, 6],
        ],
      },
      {
        input: [
          [
            [2, 3],
            [4, 5],
            [6, 7],
            [8, 9],
            [1, 10],
          ],
        ],
        expected: [[1, 10]],
      },
    ],
  },
  {
    id: 32,
    title: "Coin Change",
    concept: "Dynamic Programming",
    difficulty: "Medium",
    description:
      "Given an array `coins` of coin denominations and a target `amount`, return the fewest number of coins needed to make up that amount. You have an unlimited supply of each coin. If the amount cannot be made, return `-1`.",
    functionName: "coinChange",
    params: ["coins", "amount"],
    starterCode:
      "function coinChange(coins, amount) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "coins = [1, 2, 5], amount = 11",
        output: "3",
        explanation: "11 = 5 + 5 + 1.",
      },
      {
        input: "coins = [2], amount = 3",
        output: "-1",
        explanation: "Only even amounts can be made with 2-coins.",
      },
    ],
    constraints: [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4",
    ],
    hint: "Make an array `dp` where `dp[a]` is the fewest coins for amount `a`. Build it up from 0, trying every coin for each amount.",
    visibleTests: [
      { input: [[1], 0], expected: 0 },
      { input: [[1, 3, 4], 6], expected: 2 },
    ],
    hiddenTests: [
      { input: [[2, 5, 10, 1], 27], expected: 4 },
      { input: [[5, 10], 3], expected: -1 },
      { input: [[2, 4, 6], 7], expected: -1 },
      { input: [[1, 2, 5], 100], expected: 20 },
      { input: [[186, 419, 83, 408], 6249], expected: 20 },
    ],
  },
  {
    id: 33,
    title: "House Robber",
    concept: "Dynamic Programming",
    difficulty: "Medium",
    description:
      "`nums[i]` is the amount of money in house `i`. Adjacent houses have linked alarms, so you cannot rob two houses that are next to each other. Return the maximum amount of money you can rob.",
    functionName: "rob",
    params: ["nums"],
    starterCode: "function rob(nums) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "nums = [1, 2, 3, 1]",
        output: "4",
        explanation: "Rob house 1 (1) and house 3 (3): 1 + 3 = 4.",
      },
      {
        input: "nums = [2, 7, 9, 3, 1]",
        output: "12",
        explanation: "Rob houses 1, 3 and 5: 2 + 9 + 1 = 12.",
      },
    ],
    constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 400"],
    hint: "At each house you either skip it (keep the best so far) or rob it (add it to the best from two houses back). You only need to keep two running values.",
    visibleTests: [
      { input: [[5]], expected: 5 },
      { input: [[2, 1]], expected: 2 },
    ],
    hiddenTests: [
      { input: [[2, 1, 1, 2]], expected: 4 },
      { input: [[0, 0, 0]], expected: 0 },
      { input: [[6, 1, 1, 6]], expected: 12 },
      { input: [[10, 1, 10, 1, 10]], expected: 30 },
    ],
  },
  {
    id: 34,
    title: "Daily Temperatures",
    concept: "Stacks",
    difficulty: "Medium",
    description:
      "Given an array `temperatures` of daily temperatures, return an array `answer` where `answer[i]` is the number of days you have to wait after day `i` to get a warmer temperature. If there is no future day that is warmer, `answer[i]` is `0`.",
    functionName: "dailyTemperatures",
    params: ["temperatures"],
    starterCode:
      "function dailyTemperatures(temperatures) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "temperatures = [73, 74, 75, 71, 69, 72, 76, 73]",
        output: "[1, 1, 4, 2, 1, 1, 0, 0]",
        explanation: "Day 3 (71) waits 2 days for day 5 (72).",
      },
      {
        input: "temperatures = [30, 40, 50, 60]",
        output: "[1, 1, 1, 0]",
        explanation: "Every day is followed by a warmer one, except the last.",
      },
    ],
    constraints: [
      "1 <= temperatures.length <= 10^5",
      "30 <= temperatures[i] <= 100",
    ],
    hint: "Use a stack of indexes with temperatures that are still waiting for a warmer day. When today is warmer than the temperature at the top, pop it and record the difference in days.",
    visibleTests: [
      { input: [[30, 60, 90]], expected: [1, 1, 0] },
      { input: [[90, 80, 70]], expected: [0, 0, 0] },
    ],
    hiddenTests: [
      { input: [[50]], expected: [0] },
      { input: [[55, 55, 55]], expected: [0, 0, 0] },
      { input: [[70, 71, 70, 71, 72]], expected: [1, 3, 1, 1, 0] },
      {
        input: [[89, 62, 70, 58, 47, 47, 46, 76, 100, 70]],
        expected: [8, 1, 5, 4, 3, 2, 1, 1, 0, 0],
      },
    ],
  },
  {
    id: 35,
    title: "Search in Rotated Sorted Array",
    concept: "Searching",
    difficulty: "Medium",
    description:
      "An ascending array of distinct integers was rotated at an unknown pivot (for example `[0, 1, 2, 4, 5, 6, 7]` might become `[4, 5, 6, 7, 0, 1, 2]`). Given the rotated array `nums` and a `target`, return the index of `target`, or `-1` if it is not present. Aim for O(log n) time.",
    functionName: "searchRotated",
    params: ["nums", "target"],
    starterCode:
      "function searchRotated(nums, target) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "nums = [4, 5, 6, 7, 0, 1, 2], target = 0",
        output: "4",
        explanation: "0 is at index 4.",
      },
      {
        input: "nums = [4, 5, 6, 7, 0, 1, 2], target = 3",
        output: "-1",
        explanation: "3 is not in the array.",
      },
    ],
    constraints: [
      "1 <= nums.length <= 5000",
      "-10^4 <= nums[i], target <= 10^4",
      "All values in nums are distinct",
    ],
    hint: "Do a binary search. At each step, one half (left or right of the middle) is always properly sorted. Check whether the target lies in that sorted half, and choose a side.",
    visibleTests: [
      { input: [[1], 0], expected: -1 },
      { input: [[1], 1], expected: 0 },
    ],
    hiddenTests: [
      { input: [[3, 1], 1], expected: 1 },
      { input: [[5, 1, 3], 5], expected: 0 },
      { input: [[6, 7, 1, 2, 3, 4, 5], 7], expected: 1 },
      { input: [[1, 2, 3, 4, 5], 4], expected: 3 },
      { input: [[2, 3, 4, 5, 6, 7, 8, 9, 1], 1], expected: 8 },
      { input: [[4, 5, 6, 7, 0, 1, 2], 2], expected: 6 },
    ],
  },
  {
    id: 36,
    title: "Generate Parentheses",
    concept: "Recursion",
    difficulty: "Medium",
    description:
      "Given `n` pairs of parentheses, return every combination of well-formed parentheses. Return them in lexicographical order, where `(` comes before `)`.",
    functionName: "generateParenthesis",
    params: ["n"],
    starterCode:
      "function generateParenthesis(n) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "n = 1",
        output: '["()"]',
        explanation: "There is only one way to write one pair.",
      },
      {
        input: "n = 3",
        output: '["((()))", "(()())", "(())()", "()(())", "()()()"]',
        explanation: "Five well-formed combinations exist for three pairs.",
      },
    ],
    constraints: ["1 <= n <= 8"],
    hint: "Use backtracking. You can add `(` while you have used fewer than n, and add `)` only while it would not exceed the number of `(` so far. Add `(` first to get lexicographical order.",
    visibleTests: [
      { input: [2], expected: ["(())", "()()"] },
      {
        input: [3],
        expected: ["((()))", "(()())", "(())()", "()(())", "()()()"],
      },
    ],
    hiddenTests: [
      { input: [1], expected: ["()"] },
      {
        input: [4],
        expected: [
          "(((())))",
          "((()()))",
          "((())())",
          "((()))()",
          "(()(()))",
          "(()()())",
          "(()())()",
          "(())(())",
          "(())()()",
          "()((()))",
          "()(()())",
          "()(())()",
          "()()(())",
          "()()()()",
        ],
      },
    ],
  },
  {
    id: 37,
    title: "Permutations",
    concept: "Recursion",
    difficulty: "Medium",
    description:
      "Given an array `nums` of distinct integers sorted in ascending order, return all possible permutations of it. Return the permutations in lexicographical order.",
    functionName: "permute",
    params: ["nums"],
    starterCode: "function permute(nums) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "nums = [1, 2, 3]",
        output:
          "[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]",
        explanation: "Three elements have 3! = 6 permutations.",
      },
      {
        input: "nums = [0, 1]",
        output: "[[0, 1], [1, 0]]",
        explanation: "Two elements have 2 permutations.",
      },
    ],
    constraints: [
      "1 <= nums.length <= 6",
      "-10 <= nums[i] <= 10",
      "All integers in nums are distinct and sorted in ascending order",
    ],
    hint: "Use backtracking: pick each unused number in turn, add it to the current path, recurse, then remove it. Looping through the numbers in order gives lexicographical order.",
    visibleTests: [
      {
        input: [[1, 2]],
        expected: [
          [1, 2],
          [2, 1],
        ],
      },
      {
        input: [[-1, 0, 1]],
        expected: [
          [-1, 0, 1],
          [-1, 1, 0],
          [0, -1, 1],
          [0, 1, -1],
          [1, -1, 0],
          [1, 0, -1],
        ],
      },
    ],
    hiddenTests: [
      { input: [[1]], expected: [[1]] },
      {
        input: [[2, 4, 6]],
        expected: [
          [2, 4, 6],
          [2, 6, 4],
          [4, 2, 6],
          [4, 6, 2],
          [6, 2, 4],
          [6, 4, 2],
        ],
      },
      {
        input: [[1, 2, 3, 4]],
        expected: [
          [1, 2, 3, 4],
          [1, 2, 4, 3],
          [1, 3, 2, 4],
          [1, 3, 4, 2],
          [1, 4, 2, 3],
          [1, 4, 3, 2],
          [2, 1, 3, 4],
          [2, 1, 4, 3],
          [2, 3, 1, 4],
          [2, 3, 4, 1],
          [2, 4, 1, 3],
          [2, 4, 3, 1],
          [3, 1, 2, 4],
          [3, 1, 4, 2],
          [3, 2, 1, 4],
          [3, 2, 4, 1],
          [3, 4, 1, 2],
          [3, 4, 2, 1],
          [4, 1, 2, 3],
          [4, 1, 3, 2],
          [4, 2, 1, 3],
          [4, 2, 3, 1],
          [4, 3, 1, 2],
          [4, 3, 2, 1],
        ],
      },
    ],
  },
  {
    id: 38,
    title: "Decode String",
    concept: "Stacks",
    difficulty: "Medium",
    description:
      "An encoded string follows the rule `k[encoded]`, which means the `encoded` text is repeated exactly `k` times. Rules can be nested. Return the decoded string. The input is always valid, and digits only appear as repeat counts.",
    functionName: "decodeString",
    params: ["s"],
    starterCode:
      "function decodeString(s) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: 's = "3[a]2[bc]"',
        output: '"aaabcbc"',
        explanation: "'a' three times, then 'bc' twice.",
      },
      {
        input: 's = "3[a2[c]]"',
        output: '"accaccacc"',
        explanation:
          "The inner 2[c] gives 'cc', so 'acc' is repeated three times.",
      },
    ],
    constraints: [
      "1 <= s.length <= 30",
      "s consists of lowercase letters, digits and square brackets",
      "Every repeat count is between 1 and 300",
    ],
    hint: "Use a stack. When you reach `[`, push the text built so far and the repeat count. When you reach `]`, pop them and repeat the current text that many times.",
    visibleTests: [
      { input: ["abc"], expected: "abc" },
      { input: ["2[abc]3[cd]ef"], expected: "abcabccdcdcdef" },
    ],
    hiddenTests: [
      { input: ["10[a]"], expected: "aaaaaaaaaa" },
      { input: ["2[a2[b]]c"], expected: "abbabbc" },
      { input: ["1[x]"], expected: "x" },
      { input: ["ab2[c3[d]]e"], expected: "abcdddcddde" },
    ],
  },
  {
    id: 39,
    title: "Number of Islands",
    concept: "Matrices",
    difficulty: "Medium",
    description:
      "Given a grid of `1`s (land) and `0`s (water), return the number of islands. An island is a group of land cells connected horizontally or vertically (diagonal cells are not connected).",
    functionName: "numIslands",
    params: ["grid"],
    starterCode:
      "function numIslands(grid) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "grid = [[1, 1, 0], [0, 1, 0], [0, 0, 1]]",
        output: "2",
        explanation:
          "The top-left group is one island; the single cell in the corner is another.",
      },
      {
        input:
          "grid = [[1, 1, 1, 1, 0], [1, 1, 0, 1, 0], [1, 1, 0, 0, 0], [0, 0, 0, 0, 0]]",
        output: "1",
        explanation: "All the land cells are connected.",
      },
    ],
    constraints: [
      "1 <= grid.length, grid[i].length <= 300",
      "grid[i][j] is 0 or 1",
    ],
    hint: "Loop over every cell. When you find a `1`, count one island and use DFS or BFS to turn every connected `1` into `0` so it is not counted again. Copy the grid first if you do not want to change the input.",
    visibleTests: [
      { input: [[[0]]], expected: 0 },
      { input: [[[1]]], expected: 1 },
    ],
    hiddenTests: [
      {
        input: [
          [
            [1, 0, 1],
            [0, 1, 0],
            [1, 0, 1],
          ],
        ],
        expected: 5,
      },
      {
        input: [
          [
            [1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 1, 1],
          ],
        ],
        expected: 3,
      },
      {
        input: [
          [
            [1, 0, 1, 1],
            [1, 0, 0, 1],
            [1, 1, 1, 1],
          ],
        ],
        expected: 1,
      },
      {
        input: [
          [
            [0, 0],
            [0, 0],
          ],
        ],
        expected: 0,
      },
    ],
  },
  {
    id: 40,
    title: "Course Schedule",
    concept: "Graphs",
    difficulty: "Medium",
    description:
      "There are `numCourses` courses labelled `0` to `numCourses - 1`. Each entry `[a, b]` in `prerequisites` means you must take course `b` before course `a`. Return `true` if it is possible to finish all courses, otherwise `false`.",
    functionName: "canFinish",
    params: ["numCourses", "prerequisites"],
    starterCode:
      "function canFinish(numCourses, prerequisites) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "numCourses = 2, prerequisites = [[1, 0]]",
        output: "true",
        explanation: "Take course 0, then course 1.",
      },
      {
        input: "numCourses = 2, prerequisites = [[1, 0], [0, 1]]",
        output: "false",
        explanation: "Each course needs the other first, which is a cycle.",
      },
    ],
    constraints: [
      "1 <= numCourses <= 2000",
      "0 <= prerequisites.length <= 5000",
      "prerequisites[i].length === 2",
      "a !== b for every pair",
    ],
    hint: "This is cycle detection in a directed graph. Build an adjacency list, then either use DFS with a visiting state or Kahn's algorithm (keep taking courses with no remaining prerequisites).",
    visibleTests: [
      { input: [1, []], expected: true },
      {
        input: [
          3,
          [
            [1, 0],
            [2, 1],
          ],
        ],
        expected: true,
      },
    ],
    hiddenTests: [
      {
        input: [
          3,
          [
            [1, 0],
            [2, 1],
            [0, 2],
          ],
        ],
        expected: false,
      },
      {
        input: [
          4,
          [
            [1, 0],
            [2, 0],
            [3, 1],
            [3, 2],
          ],
        ],
        expected: true,
      },
      {
        input: [
          3,
          [
            [0, 1],
            [0, 2],
            [1, 2],
          ],
        ],
        expected: true,
      },
      {
        input: [
          5,
          [
            [1, 4],
            [2, 4],
            [3, 1],
            [3, 2],
          ],
        ],
        expected: true,
      },
      {
        input: [
          4,
          [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 1],
          ],
        ],
        expected: false,
      },
    ],
  },
  {
    id: 41,
    title: "Trapping Rain Water",
    concept: "Arrays",
    difficulty: "Hard",
    description:
      "Given `n` non-negative integers representing an elevation map where each bar has width 1, compute how much water it can trap after raining.",
    functionName: "trap",
    params: ["height"],
    starterCode: "function trap(height) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
        output: "6",
        explanation:
          "Six units of water are trapped in the dips between the taller bars.",
      },
      {
        input: "height = [4, 2, 0, 3, 2, 5]",
        output: "9",
        explanation: "Water fills the gaps between the bars of height 4 and 5.",
      },
    ],
    constraints: ["1 <= height.length <= 2 * 10^4", "0 <= height[i] <= 10^5"],
    hint: "The water above a bar is `min(maxLeft, maxRight) - height`. Use two pointers from both ends, always moving the side with the lower max.",
    visibleTests: [
      { input: [[3, 0, 0, 2, 0, 4]], expected: 10 },
      { input: [[5, 4, 1, 2]], expected: 1 },
    ],
    hiddenTests: [
      { input: [[3]], expected: 0 },
      { input: [[1, 2, 3]], expected: 0 },
      { input: [[3, 0, 3]], expected: 3 },
      { input: [[2, 0, 2]], expected: 2 },
      { input: [[0, 0, 0]], expected: 0 },
      { input: [[4, 2, 3]], expected: 1 },
    ],
  },
  {
    id: 42,
    title: "Longest Valid Parentheses",
    concept: "Strings",
    difficulty: "Hard",
    description:
      "Given a string `s` containing only `(` and `)`, return the length of the longest valid (well-formed) parentheses substring.",
    functionName: "longestValidParentheses",
    params: ["s"],
    starterCode:
      "function longestValidParentheses(s) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: 's = "(()"',
        output: "2",
        explanation: "The longest valid substring is '()'.",
      },
      {
        input: 's = ")()())"',
        output: "4",
        explanation: "The longest valid substring is '()()'.",
      },
    ],
    constraints: ["0 <= s.length <= 3 * 10^4", "s[i] is '(' or ')'"],
    hint: "Use a stack of indexes and start it with `-1`. Push the index for `(`. For `)`, pop, and then the valid length is the current index minus the new top (if the stack is empty, push the current index).",
    visibleTests: [
      { input: ["()(()"], expected: 2 },
      { input: ["()(())"], expected: 6 },
    ],
    hiddenTests: [
      { input: [""], expected: 0 },
      { input: [")("], expected: 0 },
      { input: ["(()())"], expected: 6 },
      { input: ["()()"], expected: 4 },
      { input: ["((()"], expected: 2 },
      { input: ["(()))())("], expected: 4 },
    ],
  },
  {
    id: 43,
    title: "Edit Distance",
    concept: "Strings",
    difficulty: "Hard",
    description:
      "Given two strings `word1` and `word2`, return the minimum number of operations needed to convert `word1` into `word2`. You may insert a character, delete a character, or replace a character.",
    functionName: "minDistance",
    params: ["word1", "word2"],
    starterCode:
      "function minDistance(word1, word2) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: 'word1 = "horse", word2 = "ros"',
        output: "3",
        explanation:
          "horse -> rorse (replace 'h' with 'r') -> rose (delete 'r') -> ros (delete 'e').",
      },
      {
        input: 'word1 = "intention", word2 = "execution"',
        output: "5",
        explanation:
          "intention -> inention (delete 't') -> enention (replace 'i' with 'e') -> exention (replace 'n' with 'x') -> exection (replace 'n' with 'c') -> execution (insert 'u').",
      },
    ],
    constraints: [
      "0 <= word1.length, word2.length <= 500",
      "word1 and word2 consist of lowercase English letters",
    ],
    hint: "Build a table `dp[i][j]` for the first `i` letters of `word1` and the first `j` letters of `word2`. If the letters match, copy the diagonal value. Otherwise take 1 + the smallest of insert, delete or replace.",
    visibleTests: [
      { input: ["kitten", "sitting"], expected: 3 },
      { input: ["sunday", "saturday"], expected: 3 },
    ],
    hiddenTests: [
      { input: ["", ""], expected: 0 },
      { input: ["a", ""], expected: 1 },
      { input: ["", "abc"], expected: 3 },
      { input: ["abc", "abc"], expected: 0 },
      { input: ["flaw", "lawn"], expected: 2 },
      { input: ["abc", "yabd"], expected: 2 },
      { input: ["park", "spake"], expected: 3 },
    ],
  },
  {
    id: 44,
    title: "Minimum Window Substring",
    concept: "Strings",
    difficulty: "Hard",
    description:
      "Return the smallest substring of `s` that contains every character of `t`, including duplicates. If no such substring exists, return an empty string. If several substrings have the same smallest length, return the leftmost one.",
    functionName: "minWindow",
    params: ["s", "t"],
    starterCode:
      "function minWindow(s, t) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: 's = "ADOBECODEBANC", t = "ABC"',
        output: '"BANC"',
        explanation: "'BANC' is the smallest window containing A, B and C.",
      },
      {
        input: 's = "a", t = "a"',
        output: '"a"',
        explanation: "The whole string is the window.",
      },
    ],
    constraints: [
      "1 <= s.length, t.length <= 10^5",
      "s and t consist of uppercase and lowercase English letters",
    ],
    hint: "Count the characters needed from `t`. Expand the right edge until the window has everything, then shrink the left edge while it still does, saving the smallest window you see.",
    visibleTests: [
      { input: ["a", "aa"], expected: "" },
      { input: ["ab", "b"], expected: "b" },
    ],
    hiddenTests: [
      { input: ["aa", "aa"], expected: "aa" },
      { input: ["abc", "cba"], expected: "abc" },
      { input: ["ADOBECODEBANC", "AABC"], expected: "ADOBECODEBA" },
      { input: ["bba", "ab"], expected: "ba" },
      { input: ["cabwefgewcwaefgcf", "cae"], expected: "cwae" },
      { input: ["abcba", "ab"], expected: "ab" },
      { input: ["bacab", "ab"], expected: "ba" },
    ],
  },
  {
    id: 45,
    title: "Sliding Window Maximum",
    concept: "Arrays",
    difficulty: "Hard",
    description:
      "A window of size `k` slides from the far left of `nums` to the far right, moving one position at a time. Return an array containing the maximum value inside the window at each position.",
    functionName: "maxSlidingWindow",
    params: ["nums", "k"],
    starterCode:
      "function maxSlidingWindow(nums, k) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3",
        output: "[3, 3, 5, 5, 6, 7]",
        explanation:
          "The first window [1, 3, -1] has maximum 3; the next [3, -1, -3] also has 3; then 5, 5, 6, 7.",
      },
      {
        input: "nums = [1], k = 1",
        output: "[1]",
        explanation: "One window containing one element.",
      },
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "1 <= k <= nums.length",
    ],
    hint: "Keep a deque of indexes whose values are in decreasing order. Remove indexes that fall out of the window from the front and smaller values from the back. The front is always the maximum.",
    visibleTests: [
      { input: [[1, -1], 1], expected: [1, -1] },
      { input: [[9, 11], 2], expected: [11] },
    ],
    hiddenTests: [
      { input: [[4, 3, 2, 1], 2], expected: [4, 3, 2] },
      { input: [[1, 2, 3, 4], 2], expected: [2, 3, 4] },
      { input: [[7, 2, 4], 2], expected: [7, 4] },
      { input: [[1, 3, 1, 2, 0, 5], 3], expected: [3, 3, 2, 5] },
      { input: [[-7, -8, 7, 5, 7, 1, 6, 0], 4], expected: [7, 7, 7, 7, 7] },
      { input: [[5, 5, 5], 3], expected: [5] },
    ],
  },
  {
    id: 46,
    title: "N-Queens (Count Solutions)",
    concept: "Recursion",
    difficulty: "Hard",
    description:
      "The n-queens puzzle asks you to place `n` queens on an `n x n` chessboard so that no two queens attack each other (no two share a row, column or diagonal). Return the number of distinct solutions.",
    functionName: "totalNQueens",
    params: ["n"],
    starterCode:
      "function totalNQueens(n) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "n = 4",
        output: "2",
        explanation: "A 4x4 board has exactly two valid arrangements.",
      },
      { input: "n = 1", output: "1", explanation: "One queen on a 1x1 board." },
    ],
    constraints: ["1 <= n <= 9"],
    hint: "Place one queen per row using backtracking. Keep Sets for used columns and for both diagonals (`row - col` and `row + col`), and skip any square that is already attacked.",
    visibleTests: [
      { input: [2], expected: 0 },
      { input: [3], expected: 0 },
    ],
    hiddenTests: [
      { input: [5], expected: 10 },
      { input: [6], expected: 4 },
      { input: [7], expected: 40 },
      { input: [8], expected: 92 },
    ],
  },
  {
    id: 47,
    title: "Largest Rectangle in Histogram",
    concept: "Arrays",
    difficulty: "Hard",
    description:
      "Given an array `heights` representing the bar heights of a histogram where each bar has width 1, return the area of the largest rectangle that fits inside the histogram.",
    functionName: "largestRectangleArea",
    params: ["heights"],
    starterCode:
      "function largestRectangleArea(heights) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "heights = [2, 1, 5, 6, 2, 3]",
        output: "10",
        explanation:
          "The bars of height 5 and 6 form a rectangle of width 2 and height 5.",
      },
      {
        input: "heights = [2, 4]",
        output: "4",
        explanation:
          "Either the single bar of height 4, or both bars at height 2 (area 4).",
      },
    ],
    constraints: ["1 <= heights.length <= 10^5", "0 <= heights[i] <= 10^4"],
    hint: "Use a stack of indexes with increasing heights. When a bar is shorter than the top of the stack, pop it and work out the widest rectangle that bar's height could form.",
    visibleTests: [
      { input: [[1]], expected: 1 },
      { input: [[2, 1, 2]], expected: 3 },
    ],
    hiddenTests: [
      { input: [[1, 1, 1, 1]], expected: 4 },
      { input: [[6, 2, 5, 4, 5, 1, 6]], expected: 12 },
      { input: [[0, 0]], expected: 0 },
      { input: [[5, 4, 3, 2, 1]], expected: 9 },
      { input: [[1, 2, 3, 4, 5]], expected: 9 },
    ],
  },
  {
    id: 48,
    title: "Median of Two Sorted Arrays",
    concept: "Arrays",
    difficulty: "Hard",
    description:
      "Given two sorted arrays `a` and `b`, return the median of the two arrays combined. For an even total number of elements, the median is the average of the two middle values. Aim for O(log(m + n)) time.",
    functionName: "findMedianSortedArrays",
    params: ["a", "b"],
    starterCode:
      "function findMedianSortedArrays(a, b) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "a = [1, 3], b = [2]",
        output: "2",
        explanation: "The merged array is [1, 2, 3], so the median is 2.",
      },
      {
        input: "a = [1, 2], b = [3, 4]",
        output: "2.5",
        explanation:
          "The merged array is [1, 2, 3, 4], so the median is (2 + 3) / 2 = 2.5.",
      },
    ],
    constraints: [
      "0 <= a.length, b.length <= 1000",
      "1 <= a.length + b.length <= 2000",
      "-10^6 <= a[i], b[i] <= 10^6",
      "Both arrays are sorted in non-decreasing order",
    ],
    hint: "Start by merging the two arrays and picking the middle value(s). Once that works, try a binary search on the smaller array to find the correct split point in O(log(m + n)).",
    visibleTests: [
      { input: [[], [1]], expected: 1 },
      { input: [[2], []], expected: 2 },
    ],
    hiddenTests: [
      {
        input: [
          [0, 0],
          [0, 0],
        ],
        expected: 0,
      },
      {
        input: [
          [1, 2],
          [-1, 3],
        ],
        expected: 1.5,
      },
      {
        input: [
          [1, 3, 5],
          [2, 4, 6],
        ],
        expected: 3.5,
      },
      { input: [[1], [2, 3, 4, 5, 6]], expected: 3.5 },
      { input: [[100000], [1]], expected: 50000.5 },
      {
        input: [
          [1, 2, 3, 4, 5],
          [6, 7, 8, 9, 10, 11],
        ],
        expected: 6,
      },
    ],
  },
  {
    id: 49,
    title: "First Missing Positive",
    concept: "Arrays",
    difficulty: "Hard",
    description:
      "Given an unsorted array of integers `nums`, return the smallest positive integer that is not in the array. Aim for O(n) time and O(1) extra space.",
    functionName: "firstMissingPositive",
    params: ["nums"],
    starterCode:
      "function firstMissingPositive(nums) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: "nums = [1, 2, 0]",
        output: "3",
        explanation:
          "1 and 2 are present, so 3 is the smallest missing positive.",
      },
      {
        input: "nums = [3, 4, -1, 1]",
        output: "2",
        explanation: "1 is present but 2 is not.",
      },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-2^31 <= nums[i] <= 2^31 - 1"],
    hint: "The answer is between 1 and `n + 1`. Try putting each value `v` (where `1 <= v <= n`) at index `v - 1` by swapping, then find the first index where the value is wrong.",
    visibleTests: [
      { input: [[7, 8, 9, 11, 12]], expected: 1 },
      { input: [[1]], expected: 2 },
    ],
    hiddenTests: [
      { input: [[2]], expected: 1 },
      { input: [[1, 2, 3]], expected: 4 },
      { input: [[-1, -2]], expected: 1 },
      { input: [[1, 1, 1]], expected: 2 },
      { input: [[2, 1]], expected: 3 },
      { input: [[0, 2, 2, 1, 1]], expected: 3 },
      { input: [[4, 3, 2, 1, 5, 7]], expected: 6 },
    ],
  },
  {
    id: 50,
    title: "Regular Expression Matching",
    concept: "Strings",
    difficulty: "Hard",
    description:
      "Implement pattern matching with support for `.` and `*`. `.` matches any single character. `*` matches zero or more of the element before it. The pattern must match the entire string `s`, not just part of it.",
    functionName: "isMatch",
    params: ["s", "p"],
    starterCode: "function isMatch(s, p) {\n  // Write your solution here\n\n}",
    examples: [
      {
        input: 's = "aa", p = "a"',
        output: "false",
        explanation: "'a' does not cover the whole string 'aa'.",
      },
      {
        input: 's = "aa", p = "a*"',
        output: "true",
        explanation: "'*' repeats 'a' twice.",
      },
      {
        input: 's = "ab", p = ".*"',
        output: "true",
        explanation: "'.*' means zero or more of any character.",
      },
    ],
    constraints: [
      "0 <= s.length <= 20",
      "0 <= p.length <= 20",
      "s contains only lowercase English letters",
      "p contains only lowercase English letters, '.' and '*'",
      "Every '*' has a valid character before it to repeat",
    ],
    hint: "Use dynamic programming over `dp[i][j]` (does the first `i` letters of `s` match the first `j` of `p`). For `*`, either skip it with the letter before it (zero matches) or use it to match one more character.",
    visibleTests: [
      { input: ["aab", "c*a*b"], expected: true },
      { input: ["mississippi", "mis*is*p*."], expected: false },
    ],
    hiddenTests: [
      { input: ["mississippi", "mis*is*ip*."], expected: true },
      { input: ["", ""], expected: true },
      { input: ["", "a*"], expected: true },
      { input: ["a", ""], expected: false },
      { input: ["ab", ".*c"], expected: false },
      { input: ["aaa", "a*a"], expected: true },
      { input: ["aaa", "ab*a*c*a"], expected: true },
      { input: ["a", "ab*"], expected: true },
    ],
  },
];

// add the xp to every question: level XP + topic XP
const questions = baseQuestions.map((q) => ({
  ...q,
  xp: levelXp[q.difficulty] + (topicXp[q.concept] || 0),
}));

export default questions;
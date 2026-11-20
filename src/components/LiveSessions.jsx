import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import liveProblems from "../data/liveProblems";
import styles from "./LiveSessions.module.css";

// custom Monaco theme that matches the style guide colours
function setupTheme(monaco) {
  monaco.editor.defineTheme("indigo-night", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "8581aa" },
      { token: "keyword", foreground: "a79cff" },
      { token: "string", foreground: "7ed3a9" },
      { token: "number", foreground: "e0c85e" },
    ],
    colors: {
      "editor.background": "#202033",
      "editor.lineHighlightBackground": "#29283b",
      "editorLineNumber.foreground": "#5f5d71",
      "editorCursor.foreground": "#a79cff",
      "editor.selectionBackground": "#46447a",
    },
  });
}

// re-measure character widths once DM Mono has loaded
function handleMount(editor, monaco) {
  const remeasure = () => monaco.editor.remeasureFonts();
  document.fonts.load('14px "DM Mono"').then(remeasure);
  document.fonts.ready.then(remeasure);
}

// turn any value into text we can show on screen
function show(value) {
  return value === undefined ? "undefined" : JSON.stringify(value);
}

// ["level up"] with params ["sentence"] becomes: sentence = "level up"
function formatInput(input, params) {
  return input.map((arg, i) => params[i] + " = " + show(arg)).join(", ");
}

// 75 seconds becomes "01:15"
function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return minutes + ":" + seconds;
}

// run the user's function against a list of tests
function runTests(code, functionName, tests) {
  return tests.map((test) => {
    try {
      const userFunction = new Function(
        code + "\nreturn " + functionName + ";"
      )();
      // copy the input so the user's code can't change our test data
      const input = JSON.parse(JSON.stringify(test.input));
      const got = userFunction(...input);
      const passed = JSON.stringify(got) === JSON.stringify(test.expected);
      return { passed: passed, shown: show(got) };
    } catch (error) {
      return { passed: false, shown: "Error: " + error.message };
    }
  });
}

// run the code and collect everything it prints with console.log
function captureConsole(code) {
  const lines = [];
  const originalLog = console.log;

  console.log = (...args) =>
    lines.push(
      args.map((a) => (typeof a === "string" ? a : show(a))).join(" ")
    );

  try {
    new Function(code)();
  } catch (error) {
    lines.push("Error: " + error.message);
  }

  console.log = originalLog;
  return lines;
}

function LiveSessions() {
  // every problem keeps its own code, clock, test results and status
  const [problems, setProblems] = useState(
    liveProblems.map((p) => ({
      ...p,
      code: p.submittedCode || p.starterCode,
      left: p.mins * 60, // seconds left on the clock
      status: p.submittedResult ? "Submitted" : "Solving",
      result: p.submittedResult || "",
      // a problem that is already handed in shows all its tests as passed
      testResults: p.submittedResult
        ? p.tests.map((t) => ({ passed: true, shown: show(t.expected) }))
        : null,
      consoleLines: [],
    }))
  );
  const [selectedId, setSelectedId] = useState(liveProblems[0].id);
  const [inboxOpen, setInboxOpen] = useState(true); // problems list open or collapsed
  const [bottomTab, setBottomTab] = useState("tests"); // "tests" or "console"
  const [activeCase, setActiveCase] = useState(0);

  // every second, take one second off each problem that is still being solved
  useEffect(() => {
    const id = setInterval(() => {
      setProblems((current) =>
        current.map((p) =>
          p.status === "Solving" && p.left > 0 ? { ...p, left: p.left - 1 } : p
        )
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const problem = problems.find((p) => p.id === selectedId);
  const isSubmitted = problem.status === "Submitted";
  const activeTest = problem.tests[activeCase];
  const activeResult = problem.testResults
    ? problem.testResults[activeCase]
    : null;
  const passedCount = problem.testResults
    ? problem.testResults.filter((r) => r.passed).length
    : 0;

  // change some fields on one problem
  function updateProblem(id, changes) {
    setProblems((current) =>
      current.map((p) => (p.id === id ? { ...p, ...changes } : p))
    );
  }

  // pick a problem from the list
  function selectProblem(id) {
    setSelectedId(id);
    setActiveCase(0);
    setBottomTab("tests");
  }

  // Run: show what the code prints
  function runCode() {
    updateProblem(problem.id, { consoleLines: captureConsole(problem.code) });
    setBottomTab("console");
  }

  // Run tests: check the code against the test cases
  function runAllTests() {
    updateProblem(problem.id, {
      testResults: runTests(problem.code, problem.functionName, problem.tests),
    });
    setBottomTab("tests");
  }

  // Submit: run the tests, then lock the problem and record the time used
  function submit() {
    const results = runTests(problem.code, problem.functionName, problem.tests);
    const passed = results.filter((r) => r.passed).length;
    const used = problem.mins * 60 - problem.left;
    const minutes = Math.floor(used / 60);
    const secs = String(used % 60).padStart(2, "0");

    updateProblem(problem.id, {
      testResults: results,
      status: "Submitted",
      result:
        passed + "/" + results.length + " tests passed · " + minutes + "m " + secs + "s used",
    });
    setBottomTab("tests");
  }

  return (
    <div className={styles.app}>
      <main className={styles.page}>
        <div>
          <h1>Live sessions</h1>
          <p className={styles.subtitle}>
            Problems your mentor sends during a Google Meet call. Share your
            screen while you solve.
          </p>
        </div>

        <div
          className={`${styles.liveLayout} ${inboxOpen ? "" : styles.collapsed}`}
        >
          {/* LEFT: problems received (can be collapsed) */}
          <div className={styles.card}>
            {inboxOpen ? (
              <>
                <div className={styles.cardHeading}>
                  <h2>Problems received</h2>
                  <button
                    className={styles.iconBtn}
                    onClick={() => setInboxOpen(false)}
                    aria-expanded="true"
                    aria-label="Collapse problems list"
                    title="Collapse"
                  >
                    ‹
                  </button>
                </div>
                <ul className={styles.inboxList}>
                  {problems.map((p) => (
                    <li key={p.id}>
                      <button
                        className={`${styles.inboxItem} ${
                          p.id === selectedId ? styles.selected : ""
                        }`}
                        onClick={() => selectProblem(p.id)}
                      >
                        <span className={styles.inboxTitle}>
                          <span>{p.title}</span>
                          {p.status === "Submitted" ? (
                            <span className={styles.check}>✓</span>
                          ) : (
                            <span className={styles.dot}></span>
                          )}
                        </span>
                        <span className={styles.inboxMeta}>
                          From {p.from} · {p.when} · {p.mins} min
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className={styles.rail}>
                <button
                  className={styles.iconBtn}
                  onClick={() => setInboxOpen(true)}
                  aria-expanded="false"
                  aria-label="Expand problems list"
                  title="Show problems"
                >
                  ›
                </button>
                {problems.map((p, i) => (
                  <button
                    key={p.id}
                    className={`${styles.railItem} ${
                      p.id === selectedId ? styles.selected : ""
                    }`}
                    onClick={() => selectProblem(p.id)}
                    title={p.title}
                  >
                    {p.status === "Submitted" ? "✓" : i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: the selected problem */}
          <div className={styles.work}>
            <div className={`${styles.card} ${styles.problemCard}`}>
              <div className={styles.problemTop}>
                <div>
                  <div className={styles.titleRow}>
                    <h2>{problem.title}</h2>
                    <span className={styles.tag}>{problem.concept}</span>
                    <span className={styles.tag}>Live</span>
                  </div>
                  <p className={styles.sentBy}>
                    <span className={styles.dot}></span>
                    Sent by {problem.from} · {problem.when}
                  </p>
                </div>
                <div className={styles.clockBox}>
                  <p>Time left of {problem.mins} min</p>
                  <p className={styles.clock}>{formatTime(problem.left)}</p>
                </div>
              </div>
              <p className={styles.statement}>{problem.statement}</p>
              <p className={styles.shareNote}>
                Share your screen in Google Meet so your mentor can follow
                along.
              </p>
            </div>

            <div className={styles.editorColumn}>
              <div className={styles.editorCard}>
                <div className={styles.editorHeader}>
                  <span className={styles.fileName}>
                    {problem.functionName}.js
                  </span>
                  <div className={styles.editorActions}>
                    <button
                      className={`${styles.btn} ${styles.btnRun}`}
                      onClick={runCode}
                      disabled={isSubmitted}
                    >
                      Run ▶
                    </button>
                    <button
                      className={`${styles.btn} ${styles.btnRun}`}
                      onClick={runAllTests}
                      disabled={isSubmitted}
                    >
                      Run tests
                    </button>
                    <button
                      className={`${styles.btn} ${styles.btnSubmit}`}
                      onClick={submit}
                      disabled={isSubmitted}
                    >
                      {isSubmitted ? "Submitted" : "Submit"}
                    </button>
                  </div>
                </div>

                {/* drag the bottom-right corner of this box to make the editor taller */}
                <div className={styles.editorBody}>
                  <Editor
                    height="100%"
                    theme="indigo-night"
                    defaultLanguage="javascript"
                    beforeMount={setupTheme}
                    onMount={handleMount}
                    value={problem.code}
                    onChange={(value) =>
                      updateProblem(problem.id, { code: value })
                    }
                    options={{
                      fontFamily: '"DM Mono", monospace',
                      fontSize: 14,
                      minimap: { enabled: false },
                      padding: { top: 16 },
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      readOnly: isSubmitted,
                    }}
                  />
                </div>

                {/* test cases and console, at the bottom of the editor */}
                <div className={styles.testPanel}>
                  <div className={styles.testHeading}>
                    <button
                      className={bottomTab === "tests" ? styles.active : ""}
                      onClick={() => setBottomTab("tests")}
                    >
                      Test cases
                    </button>
                    <button
                      className={bottomTab === "console" ? styles.active : ""}
                      onClick={() => setBottomTab("console")}
                    >
                      Console
                    </button>
                    <span className={styles.testCount}>
                      {problem.testResults
                        ? passedCount + "/" + problem.tests.length + " passed"
                        : "Not run yet"}
                    </span>
                  </div>

                  {bottomTab === "tests" ? (
                    <div className={styles.testBody}>
                      <div className={styles.testTabs}>
                        {problem.tests.map((test, i) => {
                          const result = problem.testResults
                            ? problem.testResults[i]
                            : null;
                          return (
                            <button
                              key={i}
                              className={activeCase === i ? styles.active : ""}
                              onClick={() => setActiveCase(i)}
                            >
                              Case {i + 1}
                              {result && (result.passed ? " ✓" : " ✕")}
                            </button>
                          );
                        })}
                      </div>

                      <div className={styles.testValues}>
                        <div>
                          <span>Input</span>
                          <code>
                            {formatInput(activeTest.input, problem.params)}
                          </code>
                        </div>
                        <div>
                          <span>Expected</span>
                          <code>{show(activeTest.expected)}</code>
                        </div>
                        {activeResult && (
                          <div>
                            <span>Output</span>
                            <code
                              className={
                                activeResult.passed
                                  ? styles.outputSuccess
                                  : styles.outputFail
                              }
                            >
                              {activeResult.shown}
                            </code>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className={`${styles.testBody} ${styles.consoleLines}`}>
                      {problem.consoleLines.length === 0 ? (
                        <div>Press Run to see what your code prints</div>
                      ) : (
                        problem.consoleLines.map((line, i) => (
                          <div key={i}>&gt; {line}</div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

              {isSubmitted ? (
                <p className={styles.statusLine}>
                  <strong className={styles.pass}>Submitted.</strong> Your
                  mentor can see your solution: {problem.result}.
                </p>
              ) : (
                <p className={styles.statusLine}>
                  {problem.left === 0
                    ? "Time is up. Submit what you have."
                    : "Not submitted yet. Submit before the time runs out."}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LiveSessions;
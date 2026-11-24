import "./Auth.css";
import logoDark from "../../assets/cohort51-darkbackground.png";

// The code that scrolls past on the monitor illustration
const CODE_LINES = [
  "function characterBattle(hero, villain) {",
  "  const log = [];",
  "",
  "  for (let i = 0; i < hero.health; i++) {",
  "    villain.health -= hero.attack;",
  "    log.push(`Round ${i + 1}: ${villain.name} has ${villain.health} HP`);",
  "  }",
  "",
  "  return log;",
  "}",
  "",
  "console.log(characterBattle(",
  '  { name: "Thandi", health: 3, attack: 4 },',
  '  { name: "Glitch", health: 20 }',
  "));",
  "",
  "function countVowels(text) {",
  "  let count = 0;",
  "",
  "  for (const ch of text.toLowerCase()) {",
  '    if ("aeiou".includes(ch)) count++;',
  "  }",
  "",
  "  return count;",
  "}",
  "",
  "function topLearners(learners, minXp) {",
  "  const names = [];",
  "",
  "  for (const learner of learners) {",
  "    if (learner.xp >= minXp) names.push(learner.name);",
  "  }",
  "",
  "  return names;",
  "}",
  "",
];

const KEYWORDS = ["function", "const", "let", "for", "of", "if", "return", "console"];
const TOKEN_REGEX = /(\/\/.*$|`[^`]*`|"[^"]*"|'[^']*'|\b\d+\b|\b[a-zA-Z_]+\b)/g;

// Colours keywords, strings and numbers like a code editor
function highlight(line) {
  const parts = line.split(TOKEN_REGEX);

  return parts.map((part, i) => {
    if (part.startsWith("//")) return <span key={i} className="t-com">{part}</span>;
    if (/^[`"']/.test(part)) return <span key={i} className="t-str">{part}</span>;
    if (/^\d+$/.test(part)) return <span key={i} className="t-num">{part}</span>;
    if (KEYWORDS.includes(part)) return <span key={i} className="t-key">{part}</span>;
    return part;
  });
}

function CodeMonitor({ fileName, delay }) {
  const lines = CODE_LINES.map((line, i) => (
    <div key={i}>
      <span className="ln">{i + 1}</span>
      <span>{line ? highlight(line) : " "}</span>
    </div>
  ));

  return (
    <div className="monitor" aria-hidden="true">
      <div className="monitor-screen">
        <div className="monitor-bar">
          <i></i>
          <i></i>
          <i></i>
          <span>{fileName}</span>
        </div>
        <div className="monitor-view">
          {/* The lines are rendered twice so the scroll loops smoothly */}
          <div className="monitor-scroll" style={{ animationDelay: delay }}>
            {lines}
            {lines}
          </div>
        </div>
      </div>
      <div className="monitor-neck"></div>
      <div className="monitor-foot"></div>
    </div>
  );
}

// Dark left panel + white form area, shared by Login and Registration
const AuthLayout = ({ fileName, delay = "0s", children }) => {
  return (
    <div className="auth-page">
      <div className="auth-side">
        <img src={logoDark} alt="Cohort 51" className="auth-side-logo" />

        <CodeMonitor fileName={fileName} delay={delay} />

        <div>
          <h1 className="auth-side-title">
            Level Up.
            <br />
            Get Seen.
            <br />
            Get Hired.
          </h1>
          <p className="auth-side-text">
            Solve code challenges, earn XP and show mentors exactly what you can do.
          </p>
        </div>
      </div>

      <main className="auth-main">{children}</main>
    </div>
  );
};

export default AuthLayout;

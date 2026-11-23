import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import RoleToggle from "../components/auth/RoleToggle";
import logoIcon from "../assets/cohort51-icon.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("Mentor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // No backend yet: mentors go to the mentor home, learners to the learner home
    navigate(role === "Mentor" ? "/mentor" : "/");
  };

  return (
    <AuthLayout fileName="characterBattle.js">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div>
          <img src={logoIcon} alt="Cohort 51" className="auth-card-logo" />
          <h2 className="auth-card-title">Welcome back</h2>
          <p className="auth-card-subtitle">Sign in to continue to Cohort51.</p>
        </div>

        <RoleToggle value={role} onChange={setRole} label="Sign in as" />

        <div>
          <label className="auth-label" htmlFor="loginEmail">Email</label>
          <input
            id="loginEmail"
            className="auth-field"
            type="email"
            placeholder="you@example.com"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="auth-label" htmlFor="loginPassword">Password</label>
          <input
            id="loginPassword"
            className="auth-field"
            type="password"
            placeholder="••••••••"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="auth-btn auth-btn-primary">Sign In</button>

        <Link to="/login" className="auth-link-muted">Forgot password?</Link>

        <p className="auth-switch">
          New to Cohort51? <Link to="/register">Create an account</Link>
        </p>

        <div className="auth-demo">
          <p className="auth-eyebrow">Demo · no account needed</p>
          <div className="auth-demo-buttons">
            <Link to="/mentor" className="auth-btn auth-btn-ghost">View as mentor</Link>
            <Link to="/" className="auth-btn auth-btn-ghost">View as learner</Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;

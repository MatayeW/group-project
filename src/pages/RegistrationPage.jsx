import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import RoleToggle from "../components/auth/RoleToggle";
import logoIcon from "../assets/cohort51-icon.png";

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("Learner");
  const [form, setForm] = useState({
    name: "",
    email: "",
    cohort: "Cohort 51 · JavaScript",
    invite: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null); // { type: "error" | "success", text }

  const updateField = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value });
  };

  const changeRole = (newRole) => {
    setRole(newRole);
    setMessage(null);
  };

  const validate = () => {
    if (!form.name.trim()) return "Enter your full name.";
    if (!EMAIL_PATTERN.test(form.email.trim())) return "Enter a valid email address.";
    if (role === "Mentor" && !form.invite.trim())
      return "Enter the mentor invite code from your programme lead.";
    if (form.password.length < 8) return "Use a password of at least 8 characters.";
    if (form.password !== form.confirmPassword) return "The two passwords do not match.";
    return "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const error = validate();

    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    const page = role === "Mentor" ? "class" : "home";
    setMessage({ type: "success", text: `✓ Account created. Opening your ${page} page…` });

    // No backend yet: go to the right home page after a short pause
    setTimeout(() => navigate(role === "Mentor" ? "/mentor" : "/"), 900);
  };

  return (
    <AuthLayout fileName="topLearners.js" delay="-14s">
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <div>
          <img src={logoIcon} alt="Cohort 51" className="auth-card-logo" />
          <h2 className="auth-card-title">Create your account</h2>
          <p className="auth-card-subtitle">Join Cohort51 as a mentor or a learner.</p>
        </div>

        <RoleToggle value={role} onChange={changeRole} label="Sign up as" />

        <div>
          <label className="auth-label" htmlFor="suName">Full name</label>
          <input
            id="suName"
            className="auth-field"
            autoComplete="off"
            placeholder="First and last name"
            value={form.name}
            onChange={updateField("name")}
          />
        </div>

        <div>
          <label className="auth-label" htmlFor="suEmail">Email</label>
          <input
            id="suEmail"
            className="auth-field"
            type="email"
            autoComplete="off"
            placeholder="you@example.com"
            value={form.email}
            onChange={updateField("email")}
          />
        </div>

        {role === "Learner" && (
          <div>
            <label className="auth-label" htmlFor="suCohort">Cohort</label>
            <select
              id="suCohort"
              className="auth-field"
              value={form.cohort}
              onChange={updateField("cohort")}
            >
              <option>Cohort 51 · JavaScript</option>
              <option>Cohort 50 · JavaScript</option>
            </select>
          </div>
        )}

        {role === "Mentor" && (
          <div>
            <label className="auth-label" htmlFor="suInvite">Mentor invite code</label>
            <input
              id="suInvite"
              className="auth-field code"
              autoComplete="off"
              placeholder="C51-XXXX"
              value={form.invite}
              onChange={updateField("invite")}
            />
            <p className="auth-help">Your programme lead gives you this code.</p>
          </div>
        )}

        <div>
          <label className="auth-label" htmlFor="suPass">Password</label>
          <input
            id="suPass"
            className="auth-field"
            type="password"
            autoComplete="off"
            placeholder="At least 8 characters"
            value={form.password}
            onChange={updateField("password")}
          />
        </div>

        <div>
          <label className="auth-label" htmlFor="suPass2">Confirm password</label>
          <input
            id="suPass2"
            className="auth-field"
            type="password"
            autoComplete="off"
            placeholder="Type it again"
            value={form.confirmPassword}
            onChange={updateField("confirmPassword")}
          />
        </div>

        {message && (
          <p className={`auth-msg ${message.type}`} role="status">
            {message.text}
          </p>
        )}

        <button type="submit" className="auth-btn auth-btn-primary">
          Create {role.toLowerCase()} account
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegistrationPage;

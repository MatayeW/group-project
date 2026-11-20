// Mentor / Learner switch used on both Login and Registration
const ROLES = ["Mentor", "Learner"];

const RoleToggle = ({ value, onChange, label }) => {
  return (
    <div className="role-toggle" role="group" aria-label={label}>
      {ROLES.map((role) => (
        <button
          key={role}
          type="button"
          aria-pressed={value === role}
          onClick={() => onChange(role)}
        >
          {role}
        </button>
      ))}
    </div>
  );
};

export default RoleToggle;

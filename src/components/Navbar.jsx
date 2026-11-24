import { NavLink } from "react-router-dom";
import {
    Home,
    Video,
    BookOpen,
    Megaphone,
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react";
import logo from "../assets/cohort51-lightbackground.png";
import "./Navbar.css";
import useAnnouncements from "../hooks/useAnnouncements";
import useSidebarCollapsed from "../hooks/useSidebarCollapsed";
import { CURRENT_USER } from "../data/currentUser";
import { getInitials } from "../utils/getInitials";

const NAV_ITEMS = [
    { id: "home", label: "Home", icon: Home, to: "/", end: true },
    { id: "live-session", label: "Live sessions", icon: Video, to: "/live-session" },
    { id: "learning", label: "Learning", icon: BookOpen, to: "/learning" },
    { id: "announcements", label: "Announcements", icon: Megaphone, to: "/announcements" },
];

const NUMBER_WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

const Navbar = ({
    homework = { completed: 1, total: 3, due: "Friday" },
    user = CURRENT_USER,
    unreadAnnouncements,
}) => {
    // remembered between pages (every page renders its own Navbar)
    const [collapsed, toggleCollapsed] = useSidebarCollapsed();
    const { unreadCount } = useAnnouncements();
    const unread = unreadAnnouncements ?? unreadCount;

    const { completed, total, due } = homework;
    const remaining = Math.max(total - completed, 0);
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    const remainingWord = NUMBER_WORDS[remaining] ?? remaining;

    const homeworkMessage =
        remaining === 0
            ? "All done for this week. Nice work."
            : `${remainingWord} more to go. You have until ${due}.`;

    return (
        <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
            <div className="sidebar-header">
                <div className="brand">
                    <span className="brand-mark">
                        <img src={logo} alt="A logo for the company cohort 51" />
                    </span>
                    <span className="brand-name">
                        Cohort<span className="brand-accent">51</span>
                    </span>
                </div>
                <button
                    type="button"
                    className="toggle"
                    onClick={toggleCollapsed}
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    aria-expanded={!collapsed}
                >
                    {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
                </button>
            </div>

            {/* <p className="section-label">Workspace</p> */}

            <nav aria-label="Main">
                <ul className="nav">
                    {NAV_ITEMS.map(({ id, label, icon: Icon, to, end }) => {
                        const badge = id === "announcements" ? unread : 0;

                        return (
                            <li key={id}>
                                <NavLink
                                    to={to}
                                    end={end}
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "active" : ""}`
                                    }
                                    aria-label={collapsed ? label : undefined}
                                    title={collapsed ? label : undefined}
                                >
                                    <Icon size={20} aria-hidden="true" />
                                    <span className="nav-label">{label}</span>
                                    {badge > 0 && (
                                        <span
                                            className="nav-badge"
                                            aria-label={`${badge} unread`}
                                        >
                                            {badge}
                                        </span>
                                    )}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <section className="homework" aria-label="Weekly homework">
                <div className="homework-top">
                    <span className="homework-label">Weekly homework</span>
                    <span className="homework-count">
                        {completed}/{total}
                    </span>
                </div>
                <div
                    className="homework-bar"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={total}
                    aria-valuenow={completed}
                    aria-valuetext={`${completed} of ${total} homework tasks done`}
                >
                    <div className="homework-fill" style={{ width: `${percent}%` }} />
                </div>
                <p className="homework-note">{homeworkMessage}</p>
            </section>

            <div className="user" title={collapsed ? user.name : undefined}>
                <div className="avatar" aria-hidden="true">
                    {getInitials(user.name)}
                    <span className="status-dot" />
                </div>
                <div className="user-info">
                    <p className="user-name">{user.name}</p>
                    <p className="user-meta">
                        {user.role} · Rank {user.rank} · {user.xp} XP · {user.status}
                    </p>
                </div>
            </div>
        </aside>
    );
};

export default Navbar;
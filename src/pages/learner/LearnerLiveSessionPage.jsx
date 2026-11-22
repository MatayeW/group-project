import Navbar from "../../components/Navbar";
import LiveSessions from "../../components/LiveSessions";
import CodeEditor from "../../components/CodeEditor";

const LearnerLiveSessionPage = () => {
    return (
        <div className="layout">
            <Navbar />
            <LiveSessions />
        </div>
    );
};

export default LearnerLiveSessionPage;
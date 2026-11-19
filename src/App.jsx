import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LearnerAnnouncementPage from './pages/learner/LearnerAnnouncementPage'
import LearnerCodeEnvironmentPage from './pages/learner/LearnerCodeEnvironmentPage'
import LearnerHomePage from './pages/learner/LearnerHomePage'
import LearnerLiveSessionPage from './pages/learner/LearnerLiveSessionPage'
import LearnerNotesPage from './pages/learner/LearnerNotesPage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import MentorAnnouncementPage from './pages/mentor/MentorAnnouncementPage'
import MentorCodeEnvironmentPage from './pages/mentor/MentorCodeEnvironmentPage'
import MentorHomePage from './pages/mentor/MentorHomePage'
import MentorLiveSessionPage from './pages/mentor/MentorLiveSessionPage'
import MentorNotesPage from './pages/mentor/MentorNotesPage'

function App() {
  	return (
  		<>
			<BrowserRouter>
				<Routes>
					{/* Sign up routes */}
					<Route path='/login' element={<LoginPage />}/>
					<Route path='/register' element={<RegistrationPage />} />

					{/* learner routes */}
					<Route path='/announcements' element={<LearnerAnnouncementPage />} />
					<Route path='/code-env' element={<LearnerCodeEnvironmentPage />} />
					<Route path='/' element={<LearnerHomePage />} />
					<Route path='/live-session' element={<LearnerLiveSessionPage />} />
					<Route path='/learning' element={<LearnerNotesPage />} />

					{/* Mentor routes */}
					<Route path='/mentor-announcement' element={<MentorAnnouncementPage />} />
					<Route path='/mentor-code-env' element={<MentorCodeEnvironmentPage />} />
					<Route path='/mentor' element={<MentorHomePage />} />
					<Route path='/mentor-live-session' element={<MentorLiveSessionPage />} />
					<Route path='/mentor-notes' element={<MentorNotesPage />} />
				</Routes>
			</BrowserRouter>
  		</>
	)
}

export default App

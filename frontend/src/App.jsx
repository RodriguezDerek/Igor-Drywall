import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About'
import Service from './pages/Service';
import Project from './pages/Project';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Overview from './pages/Overview';
import ProjectSchedule from './pages/ProjectSchedule';
import CurrentProjects from './pages/CurrentProjects';
import Team from './pages/Team';
import MaterialTableFile from './components/MaterialTableFile';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/service" element={<Service />} />
                    <Route path="/project" element={<Project />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />}/>
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/overview" element={<Overview />} />
                    <Route path="/schedule" element={<ProjectSchedule />} />
                    <Route path="/projects" element={<CurrentProjects />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/test" element={<MaterialTableFile />} />
                </Routes>
            </Router>
        </>
    )
}
export default App

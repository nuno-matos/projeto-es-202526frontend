import './App.css'
import LoginPage from './components/loginPage/LoginPage'
import HomePage from './components/homePageLayout/HomePage'
import StudentDashboard from './components/dashboard/StudentDashboard'
import TeacherDashboard from './components/dashboard/TeacherDashboard'
import RegisterExercise from "./components/exerciseRegisterLayout/ExerciseRegister";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/:courseUnitName/exercise" element={<RegisterExercise />} />
                <Route path="/student/exercise/:exerciseId" element={<StudentDashboard />} />
                <Route path="/teacher/exercise/:exerciseId" element={<TeacherDashboard />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
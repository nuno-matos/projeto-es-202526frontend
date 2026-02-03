import './App.css'
import LoginPage from './components/loginPage/LoginPage'
import HomePage from './components/homePageLayout/HomePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import RegisterExercise from "./components/exerciseRegisterLayout/ExerciseRegister";

function App() {

  return (
       <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
              {/* <Route path="/:courseUnitName/exercise" element={<RegisterExercise />} /> */}
            </Routes>
        </BrowserRouter>
  )
}

export default App
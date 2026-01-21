import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./components/homePageLayout/HomePageLayout";
import LoginForm from "./components/loginLayout/LoginForm";

// TODO (APAGAR) caminhos temporários para agilizar o desenvolvimento
// ***--------------------------------------------------------------------***
import TeacherDashboard from "./components/dashboard/TeacherDashboard.jsx";
import StudentDashboard from "./components/dashboard/StudentDashboard.jsx";
// ***--------------------------------------------------------------------***

function LoginPage() {
  return (
    <main>
      <section class="vh-100">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-xl-10">
              <LoginForm />

                {/*TODO (APAGAR) caminhos temporários para agilizar o desenvolvimento*/}
                {/* --------------------------------------------------------- */}
                <div className="mt-3 text-center">
                    <small className="text-muted">Links de Acesso Rápido (Dev):</small> <br/>
                    <a href="/teacher">Ir para Docente</a> | <a href="/student">Ir para Estudante</a>
                </div>
                {/* --------------------------------------------------------- */}

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomeLayout />} />
          {/*TODO (APAGAR) caminhos temporários para agilizar o desenvolvimento*/}
          {/* --------------------------------------------------------- */}
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          {/* --------------------------------------------------------- */}
      </Routes>
    </BrowserRouter>
  );
}

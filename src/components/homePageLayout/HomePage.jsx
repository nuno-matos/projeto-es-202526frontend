import './HomePage.css'
import TeacherDashboard from "../dashboard/TeacherDashboard.jsx";
import StudentDashboard from "../dashboard/StudentDashboard.jsx";

function decodeJWT(token) {
  try {
    const payload = token.split(".")[1];
    console.log("PAYLOAD: " + payload)
    return JSON.parse(atob(payload));
  } catch (error) {
    console.error(error);
    return null;
  }
}

function HomeLayout() {
    const token = localStorage.getItem("token");
    const decoded = token ? decodeJWT(token) : null;
    const role = decoded?.role;
    //const email = decoded?.email

    // teste das dashboards -> "TEACHER" ou "STUDENT"
    // const role = "TEACHER";
    // const role = "STUDENT";

    console.log("ROLE: " + role)
    //console.log("EMAIL: " + email)

    return (
        <>
            <div className="container-fluid p-0">
                <nav className="navbar navbar-dark bg-dark mb-4 px-4">
                    <span className="navbar-brand mb-0 h1">Exercise Manager</span>
                    <button className="btn btn-outline-light btn-sm" onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/";
                    }}>Logout</button>
                </nav>

                {role === "TEACHER" && <TeacherDashboard />}
                {role === "STUDENT" && <StudentDashboard />}

                {!role && (
                    <div className="container text-center mt-5">
                        <h3>Bem-vindo!</h3>
                        <p>Por favor faz login para acederes ao painel.</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default HomeLayout;
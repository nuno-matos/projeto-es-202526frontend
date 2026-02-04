import { useState, useEffect } from "react"
import './HomePage.css'
import { useNavigate } from 'react-router-dom'

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

function HomePage() {

    const token = localStorage.getItem("token");
    const decoded = token ? decodeJWT(token) : null;
    const role = decoded?.role;
    const email = decoded?.sub; //subject

    const baseURL = "http://localhost:8080/";

    const [name, setName] = useState("");
    const [courseUnits, setCourseUnits] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) return;

        fetch(baseURL + "api/user-info", {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch user info");
                return res.json();
            })
            .then(data => {
                setName(data.name);
                setCourseUnits(data.courseUnits);
            })
            .catch(err => console.error(err));
    }, [token]);

    console.log("ROLE: " + role)
    console.log("EMAIL: " + email)
    console.log("NAME: " + name)

    const handleCreateExercise = (courseUnitName) => {
        navigate('/' + encodeURIComponent(courseUnitName) + '/exercise');
    };

    const handleStartExercise = (exerciseId) => {
        navigate('/student/exercise/' + exerciseId);
    };

    const handleCheckProgress = (exerciseId) => {
        navigate('/teacher/exercise/' + exerciseId);
    };

    return (
        <div className="container">
            <div className="row d-flex justify-content-center h-100 mt-5">
                <div className="col-12 col-md-10">
                    <div className="card card-profile shadow">
                        <div className="card-header bg-dark text-white">
                            Bem-vindo, {name}
                        </div>
                        <div className="card-body">
                            <div className="row mb-4">
                                <div className="col-md-8">
                                    <h5 className="card-title">
                                        {role === "ROLE_TEACHER" && <span className="badge bg-info">Docente</span>}
                                        {role === "ROLE_STUDENT" && <span className="badge bg-success">Estudante</span>}
                                    </h5>
                                    <p className="card-text text-muted">{email}</p>
                                </div>
                                <div className="col-md-4 text-end">
                                    <img src="src/assets/user.png" className="user-avatar-icon img-thumbnail rounded-circle" style={{width: '80px'}} />
                                </div>
                            </div>

                            <h5 className="border-bottom pb-2">As tuas Unidades Curriculares</h5>

                            <div className="accordion mt-3" id="accordionCourses">
                                {courseUnits.map((courseUnit, index) => (
                                    <div className="accordion-item" key={index}>
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`}>
                                                {courseUnit.name}
                                                <span className="badge bg-secondary ms-2">{courseUnit.exercises.length} Exercícios</span>
                                            </button>
                                        </h2>
                                        <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionCourses">
                                            <div className="accordion-body">
                                                {role === "ROLE_TEACHER" && (
                                                    <div className="mb-3 d-flex justify-content-end">
                                                        <button
                                                            className="btn btn-sm btn-outline-primary"
                                                            onClick={() => handleCreateExercise(courseUnit.name)}
                                                        >
                                                            + Novo Exercício
                                                        </button>
                                                    </div>
                                                )}
                                                {courseUnit.exercises.length > 0 ? (
                                                    <div className="list-group">
                                                        {courseUnit.exercises.map(ex => (
                                                            <div key={ex.id} className="list-group-item d-flex justify-content-between align-items-center">
                                                                <span>{ex.title}</span>

                                                                {role === "ROLE_STUDENT" && (
                                                                    <button
                                                                        className="btn btn-sm btn-success"
                                                                        onClick={() => handleStartExercise(ex.id)}
                                                                    >
                                                                        Entrar
                                                                    </button>
                                                                )}

                                                                {role === "ROLE_TEACHER" && (
                                                                    <button
                                                                        className="btn btn-sm btn-warning"
                                                                        onClick={() => handleCheckProgress(ex.id)}
                                                                    >
                                                                        Ver Progresso da Turma
                                                                    </button>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-muted text-center my-2">Sem exercícios ativos.</p>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
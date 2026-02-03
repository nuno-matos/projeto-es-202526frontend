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
                if (!res.ok) {
                    throw new Error("Failed to fetch user info");
                }
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

    return (
        <div className="container">
            <div className="row d-flex justify-content-center h-100 mt-5">
                  <div className="col-12 col-md-8 col-lg-6">
                    <div className="card card-profile">
                        <div className="card-header">
                            {name}
                        </div>
                        <div className="card-body">
                            <div className="col">
                                <img src="src/assets/user.png" className="user-avatar-icon img-thumbnail rounded float-end" />
                            </div>
                            <h5 className="card-title">
                                {role === "ROLE_TEACHER" && <p>Teacher</p>}
                                {role === "ROLE_STUDENT" && <p>Student</p>}
                                {!role && <p>User role not available</p>}
                            </h5>
                            <p className="card-text">{"Email: " + email} </p>
                        </div>
                        <div className="card-footer text-body-secondary">
                            Unidades Curriculares
                        </div>
                        <ul className="list-group list-group-flush">
                            {courseUnits.map((courseUnit, index) => (
                                <li className="list-group-item" key={index}>
                                    <span>{courseUnit}</span>

                                    {role === "ROLE_TEACHER" && (
                                        <button
                                            className="btn btn-sm btn-primary float-end"
                                            onClick={() => handleCreateExercise(courseUnit)}
                                        >
                                            Create Exercise
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
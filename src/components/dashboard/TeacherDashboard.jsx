import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function TeacherDashboard() {
    const { exerciseId } = useParams();
    const [studentsData, setStudentsData] = useState([]);
    const [grades, setGrades] = useState({});
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchClassProgress();
        const interval = setInterval(fetchClassProgress, 5000);
        return () => clearInterval(interval);
    }, [exerciseId]);

    const fetchClassProgress = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/progress/teacher/${exerciseId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStudentsData(response.data);
        } catch (error) {
            console.error("Erro ao carregar turma", error);
        }
    };

    const handleGradeChange = (id, value) => {
        setGrades({ ...grades, [id]: value });
    };

    const submitGrade = async (progressId) => {
        const gradeValue = grades[progressId];
        if (!gradeValue) return;

        try {
            await axios.post(`http://localhost:8080/api/progress/${progressId}/grade`, gradeValue, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            alert("Nota atribuída!");
            fetchClassProgress();
        } catch (error) {
            alert("Erro ao atribuir nota");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Painel de Controlo - Docente (Exercício {exerciseId})</h2>

            <div className="card shadow-sm">
                <div className="card-header bg-dark text-white">
                    <span>Monitorização em Tempo Real</span>
                </div>
                <div className="card-body">
                    <table className="table table-hover align-middle">
                        <thead>
                        <tr>
                            <th>Aluno</th>
                            <th style={{width: "40%"}}>Progresso</th>
                            <th className="text-center">Estado</th>
                            <th>Nota</th>
                            <th>Ação</th>
                        </tr>
                        </thead>
                        <tbody>
                        {studentsData.map((student) => {
                            const percent = (student.currentPhase / student.totalPhases) * 100;
                            return (
                                <tr key={student.id} className={student.helpRequested ? "table-warning" : ""}>
                                    <td>
                                        <strong>{student.studentName}</strong>
                                        {student.helpRequested && <span className="badge bg-danger ms-2">Ajuda!</span>}
                                    </td>
                                    <td>
                                        <div className="progress" style={{height: "20px"}}>
                                            <div
                                                className="progress-bar bg-info"
                                                role="progressbar"
                                                style={{width: `${percent}%`}}
                                            >
                                                {student.currentPhase}/{student.totalPhases}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        {student.finished ?
                                            <span className="badge bg-success">Terminado</span> :
                                            <span className="badge bg-secondary">Em Curso</span>
                                        }
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control form-control-sm text-center"
                                            placeholder={student.grade ? student.grade : "-"}
                                            onChange={(e) => handleGradeChange(student.id, e.target.value)}
                                            disabled={student.finished}
                                        />
                                    </td>
                                    <td>
                                        {!student.finished && (
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() => submitGrade(student.id)}
                                            >
                                                Avaliar & Terminar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                        {studentsData.length === 0 && (
                            <tr><td colSpan="5" className="text-center">Nenhum aluno iniciou este exercício ainda.</td></tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TeacherDashboard;
import React, { useState } from 'react';

function TeacherDashboard() {
    // TODO -- Usar dados reais retirados do Backend
    const [students, setStudents] = useState([
        { id: 1, name: "Ana Pereira", currentPhase: 2, totalPhases: 5, help: false, grade: null, finished: false },
        { id: 2, name: "Carlos Silva", currentPhase: 4, totalPhases: 5, help: true, grade: null, finished: false }, // Pediu ajuda
        { id: 3, name: "Beatriz Costa", currentPhase: 5, totalPhases: 5, help: false, grade: 18, finished: true },
    ]);

    const calculateProgress = (current, total) => {
        return (current / total) * 100;
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Painel de Controlo - Docente</h2>

            <div className="card shadow-sm">
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                    <span>Exercício Atual: Java Basics</span>
                    <button className="btn btn-sm btn-outline-light">Criar Novo Exercício</button>
                </div>
                <div className="card-body">
                    <table className="table table-hover align-middle">
                        <thead>
                        <tr>
                            <th>Aluno</th>
                            <th style={{width: "40%"}}>Progresso (Fases)</th>
                            <th className="text-center">Estado</th>
                            <th className="text-center">Nota</th>
                            <th>Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {students.map(student => (
                            <tr key={student.id} className={student.help ? "table-warning" : ""}>
                                <td>
                                    <div className="fw-bold">{student.name}</div>
                                    {student.help && <span className="badge bg-danger">! Pede Ajuda</span>}
                                </td>
                                <td>
                                    {/* Barra de Progresso Exigida no Ponto 32 */}
                                    <div className="progress" style={{height: "20px"}}>
                                        <div
                                            className={`progress-bar ${student.finished ? 'bg-success' : 'progress-bar-striped progress-bar-animated'}`}
                                            role="progressbar"
                                            style={{width: `${calculateProgress(student.currentPhase, student.totalPhases)}%`}}
                                        >
                                            {student.currentPhase}/{student.totalPhases}
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center">
                                    {student.finished ? <span className="badge bg-success">Terminado</span> : <span className="badge bg-secondary">Em Curso</span>}
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm text-center"
                                        placeholder="-"
                                        defaultValue={student.grade}
                                        disabled={student.finished}
                                    />
                                </td>
                                <td>
                                    {!student.finished && (
                                        <button className="btn btn-sm btn-primary">Avaliar & Terminar</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TeacherDashboard;
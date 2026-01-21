import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle, faHandPaper } from '@fortawesome/free-solid-svg-icons';

function StudentDashboard() {
    // TODO -- Usar dados reais retirados do Backend
    const [exercise, setExercise] = useState({
        title: "Exercício 1: Classes e Objetos",
        description: "Crie uma classe Carro com atributos cor e marca.",
        phases: [
            { id: 1, text: "Definir a Classe Carro", completed: true },
            { id: 2, text: "Adicionar atributos privados", completed: true },
            { id: 3, text: "Criar Getters e Setters", completed: false },
            { id: 4, text: "Criar construtor", completed: false }
        ],
        helpRequested: false
    });

    const togglePhase = (id) => {
        // Lógica visual apenas
        const newPhases = exercise.phases.map(p =>
            p.id === id ? {...p, completed: !p.completed} : p
        );
        setExercise({...exercise, phases: newPhases});
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h3>{exercise.title}</h3>
                        </div>
                        <div className="card-body">
                            <p className="lead">{exercise.description}</p>
                            <hr />

                            <h5 className="mb-3">Etapas do Exercício:</h5>
                            <div className="list-group mb-4">
                                {exercise.phases.map(phase => (
                                    <button
                                        key={phase.id}
                                        className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${phase.completed ? 'list-group-item-success' : ''}`}
                                        onClick={() => togglePhase(phase.id)}
                                    >
                                        <span>
                                            <FontAwesomeIcon icon={phase.completed ? faCheckCircle : faCircle} className="me-3" />
                                            {phase.text}
                                        </span>
                                        {phase.completed && <span className="badge bg-success rounded-pill">Feito</span>}
                                    </button>
                                ))}
                            </div>

                            <div className="d-grid gap-2">
                                <button
                                    className={`btn ${exercise.helpRequested ? 'btn-warning' : 'btn-outline-danger'} btn-lg`}
                                    onClick={() => setExercise({...exercise, helpRequested: !exercise.helpRequested})}
                                >
                                    <FontAwesomeIcon icon={faHandPaper} className="me-2" />
                                    {exercise.helpRequested ? "Aguardando Docente..." : "Chamar Docente"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;
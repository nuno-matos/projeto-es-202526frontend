import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle, faHandPaper, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function StudentDashboard() {
    const { exerciseId } = useParams();
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    // Buscar o progresso ao carregar a página
    useEffect(() => {
        fetchProgress();
    }, [exerciseId]);

    const fetchProgress = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/progress/student/${exerciseId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProgress(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Erro ao carregar exercício", error);
            setLoading(false);
        }
    };

    const handleNextPhase = async () => {
        try {
            await axios.post(`http://localhost:8080/api/progress/${progress.id}/next`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchProgress();
        } catch (error) {
            console.error("Erro ao avançar fase", error);
        }
    };

    const handleToggleHelp = async () => {
        try {
            await axios.post(`http://localhost:8080/api/progress/${progress.id}/help`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchProgress();
        } catch (error) {
            console.error("Erro ao pedir ajuda", error);
        }
    };

    if (loading) return <div className="text-center mt-5">Carregando exercício...</div>;
    if (!progress) return <div className="text-center mt-5 text-danger">Erro ao carregar dados.</div>;

    // Calculo da percentagem para a barra de progresso
    const percentage = (progress.currentPhase / progress.totalPhases) * 100;

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                            <h3>Exercício {exerciseId}</h3>
                            <span className="badge bg-light text-dark">
                                {progress.finished ? "Concluído" : "Em Curso"}
                            </span>
                        </div>
                        <div className="card-body">

                            {/* Barra de Progresso Visual */}
                            <h5 className="card-title">O teu Progresso</h5>
                            <div className="progress mb-4" style={{height: "30px"}}>
                                <div
                                    className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                                    role="progressbar"
                                    style={{width: `${percentage}%`}}
                                >
                                    Fase {progress.currentPhase} / {progress.totalPhases}
                                </div>
                            </div>

                            {/* Informação da Nota */}
                            {progress.grade && (
                                <div className="alert alert-info text-center">
                                    <h4>Nota Final: <strong>{progress.grade}</strong></h4>
                                </div>
                            )}

                            {/* Ações */}
                            <div className="d-grid gap-3">
                                {!progress.finished && (
                                    <button
                                        className="btn btn-outline-success btn-lg"
                                        onClick={handleNextPhase}
                                    >
                                        <FontAwesomeIcon icon={faArrowRight} className="me-2" />
                                        Completar Fase {progress.currentPhase + 1}
                                    </button>
                                )}

                                <button
                                    className={`btn btn-lg ${progress.helpRequested ? 'btn-warning' : 'btn-outline-danger'}`}
                                    onClick={handleToggleHelp}
                                    disabled={progress.finished}
                                >
                                    <FontAwesomeIcon icon={faHandPaper} className="me-2" />
                                    {progress.helpRequested ? "Cancelar Pedido de Ajuda" : "Pedir Ajuda ao Docente"}
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
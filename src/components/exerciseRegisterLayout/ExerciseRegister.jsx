import './ExerciseRegister.css'
import { useState } from "react";
import axios from 'axios'
import { useParams } from 'react-router-dom';

function ExerciseRegister() {
  const { courseUnitName } = useParams();
  const [exerciseTitle, setExerciseTitle] = useState("");
  const [groups, setGroups] = useState([]);
  const [savedGroups, setSavedGroups] = useState([]);
  const [confirmedGroupIds, setConfirmedGroupIds] = useState([]);

  /* ---------- GROUP CREATION ---------- */

  const handleAddGroup = () => {
    const number = groups.length + 1;

    setGroups([
      ...groups,
      {
        id: number,
        name: `Group ${number}`,
        questions: [{ id: 1, text: "" }]
      }
    ]);
  };

  const handleAddQuestion = (groupId) => {
    setGroups(groups.map(group =>
      group.id === groupId
        ? {
            ...group,
            questions: [
              ...group.questions,
              { id: group.questions.length + 1, text: "" }
            ]
          }
        : group
    ));
  };

  const handleQuestionChange = (groupId, questionId, value) => {
    setGroups(groups.map(group =>
      group.id === groupId
        ? {
            ...group,
            questions: group.questions.map(q =>
              q.id === questionId ? { ...q, text: value } : q
            )
          }
        : group
    ));
  };

  /* ---------- SAVE / CONFIRM ---------- */

  const handleSaveGroup = (groupId) => {
    const group = groups.find(g => g.id === groupId);

    if (!savedGroups.some(g => g.id === groupId)) {
      setSavedGroups([...savedGroups, group]);
    }
  };

  const handleConfirmGroup = (groupId) => {
    if (!confirmedGroupIds.includes(groupId)) {
      setConfirmedGroupIds([...confirmedGroupIds, groupId]);
    }
  };

  const handleRemoveGroup = (groupId) => {
    setSavedGroups(savedGroups.filter(g => g.id !== groupId));
    setConfirmedGroupIds(confirmedGroupIds.filter(id => id !== groupId));
  };

  /* ---------- SUBMIT ---------- */

  const handleSubmitExercise = async () => {
    const token = localStorage.getItem("token");

    // flatten groups into questions[]
    const questions = savedGroups.flatMap(group =>
        group.questions.map(q => ({
          questionText: q.text,
          group: group.name
        }))
    );

    const payload = {
      exerciseTitle: exerciseTitle,
      courseUnitName: decodeURIComponent(courseUnitName),
      questions
    };

    try {
      const response = await axios.post(
          "http://localhost:8080/api/exercise/register",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
      );

      console.log("Exercise saved:", response.data);
      alert("Exercise saved successfully!");

      setExerciseTitle("");
      setGroups([]);
      setSavedGroups([]);
      setConfirmedGroupIds([]);

    } catch (error) {
      console.error("Error saving exercise:", error);
      alert("Failed to save exercise");
    }
  };

  return (
    <div className="container">
      <div className="row mt-4">

        {/* LEFT SIDE */}
        <div className="col-md-8">

          {/* Exercise */}
          <div className="card card-exercise mb-4 float-end me-5">
            <div className="card-body">
              <h5>Exercise</h5>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Exercise title"
                value={exerciseTitle}
                onChange={(e) => setExerciseTitle(e.target.value)}
              />

              <button className="btn btn-secondary" onClick={handleAddGroup}>
                Adicionar Grupo
              </button>
            </div>
          </div>

          {/* Groups */}
          {groups.map(group => (
            <div className="card card-exercise mb-3 float-end me-5" key={group.id}>
              <div className="card-body">
                <h6>{group.name}</h6>

                {group.questions.map(question => (
                  <div className="mb-2" key={question.id}>
                    <label className="form-label">
                      Question {question.id}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={question.text}
                      onChange={(e) =>
                        handleQuestionChange(
                          group.id,
                          question.id,
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => handleAddQuestion(group.id)}
                  >
                    Add Question
                  </button>

                  <button
                    className="btn btn-success"
                    onClick={() => handleSaveGroup(group.id)}
                  >
                    Save Group
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-4">
          <div className="card card-exercise position-sticky">
            <div className="card-body">
              <h5>Saved Groups</h5>

              {savedGroups.length === 0 && (
                <p className="text-muted">No groups saved</p>
              )}

              <ul className="list-group list-group-flush">
                {savedGroups.map(group => {
                  const confirmed = confirmedGroupIds.includes(group.id);

                  return (
                    <li className="list-group-item" key={group.id}>
                      <strong>{group.name}</strong>
                      <div className="small text-muted">
                        {group.questions.length} questions
                      </div>

                      <div className="d-flex gap-2 mt-2">
                        <button
                          className="btn btn-sm btn-success"
                          disabled={confirmed}
                          onClick={() => handleConfirmGroup(group.id)}
                        >
                          {confirmed ? "Confirmed" : "Confirm"}
                        </button>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleRemoveGroup(group.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <button
                className="btn btn-primary w-100 mt-3"
                disabled={
                  savedGroups.length === 0 ||
                  confirmedGroupIds.length !== savedGroups.length
                }
                onClick={handleSubmitExercise}
              >
                Save Exercise
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ExerciseRegister;
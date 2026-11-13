import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import api from "../services/api";

import {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../redux/taskSlice";

import TaskCard from "../components/TaskCard";

function ProjectDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const tasks = useSelector(
    (state) => state.tasks.tasks
  );

  const project = useSelector((state) =>
    state.projects.projects.find(
      (project) => project.id === Number(id)
    )
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "À faire",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [id]);

  const fetchTasks = async () => {
    try {
      const response = await api.get(
        `/projects/${id}/tasks`
      );

      dispatch(setTasks(response.data));
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Impossible de récupérer les tâches."
      );
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        `/projects/${id}/tasks`,
        formData
      );

      dispatch(addTask(response.data));

      setFormData({
        title: "",
        description: "",
        status: "À faire",
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Erreur lors de l'ajout."
      );
    }
  };

  const handleStatusChange = async (taskId, status) => {
    try {
      const response = await api.put(
        `/tasks/${taskId}`,
        { status }
      );

      dispatch(updateTask(response.data));
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Erreur lors de la modification."
      );
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);

      dispatch(deleteTask(taskId));
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Erreur lors de la suppression."
      );
    }
  };

  return (
    <div className="container py-5">
      <Link
        to="/projects"
        className="text-decoration-none"
      >
        ← Retour aux projets
      </Link>

      <div className="mt-4 mb-5">
        <h1 className="fw-bold">
          {project?.title || "Projet"}
        </h1>

        <p className="text-muted">
          {project?.description}
        </p>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="card shadow-sm mb-5">
        <div className="card-body">
          <h4 className="fw-bold mb-4">
            Ajouter une tâche
          </h4>

          <form onSubmit={handleAddTask}>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">
                  Titre
                </label>

                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  Description
                </label>

                <input
                  type="text"
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  Statut
                </label>

                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="À faire">
                    À faire
                  </option>

                  <option value="En cours">
                    En cours
                  </option>

                  <option value="Terminé">
                    Terminé
                  </option>
                </select>
              </div>
            </div>

            <button className="btn btn-primary">
              + Ajouter la tâche
            </button>
          </form>
        </div>
      </div>

      <h3 className="fw-bold mb-4">
        Tâches ({tasks.length})
      </h3>

      {tasks.length === 0 ? (
        <div className="alert alert-light border">
          Aucune tâche dans ce projet.
        </div>
      ) : (
        <div>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;
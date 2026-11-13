import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import api from "../services/api";

import {
  setProjects,
  addProject,
  deleteProject,
} from "../redux/projectSlice";

import ProjectCard from "../components/ProjectCard";

function Projects() {
  const dispatch = useDispatch();

  const projects = useSelector(
    (state) => state.projects.projects
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");

      dispatch(setProjects(response.data));
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Impossible de récupérer les projets."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/projects",
        formData
      );

      dispatch(addProject(response.data));

      setFormData({
        title: "",
        description: "",
        due_date: "",
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Erreur lors de la création."
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer ce projet ?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/projects/${id}`);

      dispatch(deleteProject(id));
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Erreur lors de la suppression."
      );
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold">Mes projets</h1>
          <p className="text-muted">
            Créez et gérez vos projets.
          </p>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="card shadow-sm mb-5">
        <div className="card-body">
          <h4 className="fw-bold mb-4">
            Nouveau projet
          </h4>

          <form onSubmit={handleSubmit}>
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
                  Date d'échéance
                </label>

                <input
                  type="date"
                  name="due_date"
                  className="form-control"
                  value={formData.due_date}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button className="btn btn-primary">
              + Créer le projet
            </button>
          </form>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-5">
          <h4>Aucun projet</h4>

          <p className="text-muted">
            Créez votre premier projet.
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {projects.map((project) => (
            <div className="col-md-6 col-lg-4" key={project.id}>
              <ProjectCard
                project={project}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
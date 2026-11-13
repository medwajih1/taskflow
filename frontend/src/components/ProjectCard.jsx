import { Link } from "react-router-dom";

function ProjectCard({ project, onDelete }) {
  return (
    <div className="card h-100 shadow-sm project-card">
      <div className="card-body">
        <h5 className="card-title fw-bold">
          {project.title}
        </h5>

        <p className="card-text text-muted">
          {project.description || "No description"}
        </p>

        <p className="small text-muted mb-3">
          <strong>Deadline:</strong>{" "}
          {project.due_date
            ? new Date(project.due_date).toLocaleDateString()
            : "No deadline"}
        </p>

        <div className="d-flex gap-2">
          <Link
            to={`/projects/${project.id}`}
            className="btn btn-primary btn-sm"
          >
            Open
          </Link>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(project.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
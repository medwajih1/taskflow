function TaskCard({ task, onStatusChange, onDelete }) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5 className="mb-2">{task.title}</h5>

            <p className="text-muted mb-2">
              {task.description || "No description"}
            </p>
          </div>

          <span
            className={`badge ${
              task.status === "Terminé"
                ? "bg-success"
                : task.status === "En cours"
                ? "bg-warning text-dark"
                : "bg-secondary"
            }`}
          >
            {task.status}
          </span>
        </div>

        <div className="d-flex gap-2 mt-3">
          <select
            className="form-select form-select-sm"
            value={task.status}
            onChange={(e) =>
              onStatusChange(task.id, e.target.value)
            }
            style={{ maxWidth: "180px" }}
          >
            <option value="À faire">À faire</option>
            <option value="En cours">En cours</option>
            <option value="Terminé">Terminé</option>
          </select>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const projects = useSelector(
    (state) => state.projects.projects
  );

  return (
    <div className="container py-5">
      <div className="mb-5">
        <h1 className="fw-bold">
          Bonjour, {user?.firstName || user?.name} 👋
        </h1>

        <p className="text-muted">
          Bienvenue sur votre espace TaskFlow.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="dashboard-card">
            <h6 className="text-muted">
              Projets
            </h6>

            <h2>{projects.length}</h2>

            <Link to="/projects">
              Voir mes projets →
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="dashboard-card">
            <h6 className="text-muted">
              Tâches
            </h6>

            <h2>Gestion</h2>

            <span className="text-muted">
              Organisez vos tâches
            </span>
          </div>
        </div>

        <div className="col-md-4">
          <div className="dashboard-card">
            <h6 className="text-muted">
              Compte
            </h6>

            <h2>Actif</h2>

            <Link to="/profile">
              Voir mon profil →
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-5 p-5 bg-light rounded-4">
        <h3 className="fw-bold">
          Organisez votre travail avec TaskFlow
        </h3>

        <p className="text-muted">
          Créez des projets, ajoutez des tâches et suivez
          leur progression.
        </p>

        <Link to="/projects" className="btn btn-primary">
          Gérer mes projets
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
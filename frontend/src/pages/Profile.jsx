import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <h2 className="fw-bold mb-4">
                Mon profil
              </h2>

              <div className="mb-3">
                <label className="form-label text-muted">
                  Prénom
                </label>

                <input
                  className="form-control"
                  value={user?.firstName || ""}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-muted">
                  Nom
                </label>

                <input
                  className="form-control"
                  value={user?.lastName || ""}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-muted">
                  Email
                </label>

                <input
                  className="form-control"
                  value={user?.email || ""}
                  disabled
                />
              </div>

              <div className="alert alert-info mt-4">
                Votre profil est protégé par
                authentification JWT.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
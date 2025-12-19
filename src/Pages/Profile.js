import { useEffect, useState } from "react";
import { Container, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authFetch } from "../utils/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* ================= CHANGE PASSWORD ================= */
  const handleChangePassword = async () => {
    setError("");
    setMessage("");

    if (!oldPassword || !newPassword) {
      setError("Both fields are required");
      return;
    }

    try {
      const res = await authFetch("/auth/change-password", {
        method: "PUT",
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setMessage("Password changed successfully");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    authFetch("/auth/profile")
      .then((res) => {
        if (res.status === 401) {
          logout();
          navigate("/");
          return;
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [logout, navigate]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card className="shadow-sm p-4">
        <h4 className="mb-3">My Account</h4>

        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>

        <hr />

        <h5 className="mt-4">Change Password</h5>

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        {error && <div className="text-danger mb-2">{error}</div>}
        {message && <div className="text-success mb-2">{message}</div>}

        <button className="btn btn-primary" onClick={handleChangePassword}>
          Change Password
        </button>
      </Card>
    </Container>
  );
}

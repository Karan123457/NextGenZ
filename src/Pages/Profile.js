import { useEffect, useState } from "react";
import { Container, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authFetch } from "../utils/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  useEffect(() => {
    authFetch("/auth/profile", {}, token)
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
  }, [token, logout, navigate]);

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
      </Card>
    </Container>
  );
}

import { useEffect, useState } from "react";
import { Container, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://futurely-backend.onrender.com/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 🔐 If not logged in → redirect
    if (!token) {
      navigate("/");
      return;
    }

    fetch(`${API_BASE}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.clear();
          navigate("/");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [navigate]);

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

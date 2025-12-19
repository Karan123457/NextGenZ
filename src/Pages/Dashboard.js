import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_BASE = "https://futurely-backend.onrender.com/api";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/auth/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          logout();
          navigate("/");
          return;
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
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
      <h3 className="mb-4">Dashboard</h3>

      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-sm text-center p-3">
            <h5>Exams Attempted</h5>
            <h2 className="text-primary">{data.stats.examsAttempted}</h2>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm text-center p-3">
            <h5>Resources Saved</h5>
            <h2 className="text-success">{data.stats.resourcesSaved}</h2>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm text-center p-3">
            <h5>Jobs Applied</h5>
            <h2 className="text-warning">{data.stats.jobsApplied}</h2>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

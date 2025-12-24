import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const API_BASE = "https://futurely-backend.onrender.com/api";

export default function Leaderboard() {
  const [list, setList] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    fetch(`${API_BASE}/leaderboard/physics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setList(data));
  }, [token]);

  if (!list.length) {
    return (
      <Container className="mt-5 text-center">
        <h5>No leaderboard data yet</h5>
        <p>Attempt Physics questions to appear here</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h3 className="mb-4">🏆 Physics Leaderboard</h3>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {list.map((u) => (
            <tr key={u.position}>
              <td>{u.position}</td>
              <td>{u.name}</td>
              <td>{u.points}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

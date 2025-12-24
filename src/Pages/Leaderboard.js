import { useEffect, useState } from "react";
import { Container, Table, Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const API_BASE = "https://futurely-backend.onrender.com/api";

export default function Leaderboard() {
  const [list, setList] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    fetch(`${API_BASE}/leaderboard/physics`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setList);
  }, [token]);

  const top3 = list.slice(0, 3);
  const others = list.slice(3);

  return (
    <Container className="mt-5">
      <h3 className="mb-4">🏆 Physics Leaderboard</h3>

      {/* TOP 3 */}
      <div className="d-flex gap-3 mb-4">
        {top3.map((u, i) => (
          <Card key={i} className="text-center p-3 flex-fill">
            <h4>{["🥇", "🥈", "🥉"][i]}</h4>
            <h5>{u.name}</h5>
            <strong>{u.points} pts</strong>
          </Card>
        ))}
      </div>

      {/* FULL TABLE */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {others.map((u) => (
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

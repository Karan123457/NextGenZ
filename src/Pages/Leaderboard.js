import { useEffect, useMemo, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const API_BASE = "https://futurely-backend.onrender.com/api";

export default function Leaderboard() {
  const { token, user } = useAuth();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch(`${API_BASE}/leaderboard/physics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setList(Array.isArray(result) ? result : []);
      })
      .catch((err) => console.error("Leaderboard error:", err));
  }, [token]);

  /* ✅ compute myRank ONLY from state */
  const myRank = useMemo(() => {
    if (!user || !list.length) return null;
    return list.find((u) => u.userId === user._id) || null;
  }, [list, user]);

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
      <h3 className="mb-4 text-center">🏆 Physics Leaderboard</h3>

      {/* ===== YOUR RANK ===== */}
      {myRank && (
        <div className="my-rank-card mb-4">
          <div>
            <strong>Your Rank</strong>
            <div className="text-muted">Physics</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 22, fontWeight: 800 }}>
              #{myRank.position}
            </div>
            <div>{myRank.points} pts</div>
          </div>
        </div>
      )}

      {/* ===== TABLE ===== */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {list.map((u) => {
            const isMe = u.userId === user?._id;

            return (
              <tr
                key={u.position}
                style={{
                  background: isMe ? "#e0f2ff" : "transparent",
                  fontWeight: isMe ? 700 : 400,
                }}
              >
                <td>
                  {u.position}
                  {isMe && <span className="you-badge">YOU</span>}
                </td>
                <td>{u.name}</td>
                <td>{u.points}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

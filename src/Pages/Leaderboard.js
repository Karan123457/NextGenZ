import { useEffect, useMemo, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const API_BASE = "https://futurely-backend.onrender.com/api";

export default function Leaderboard() {
  const [list, setList] = useState([]);
  const { token, user } = useAuth();

  /* ================= FETCH OVERALL LEADERBOARD ================= */
  useEffect(() => {
    if (!token) return;

    fetch(`${API_BASE}/leaderboard/overall`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setList(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Leaderboard error:", err));
  }, [token]);

  /* ================= MY RANK ================= */
  const myRank = useMemo(() => {
    if (!user || !list.length) return null;
    return list.find((u) => u.userId === user.id) || null;
  }, [list, user]);

  /* ================= EMPTY STATE ================= */
  if (!list.length) {
    return (
      <Container className="mt-5 text-center">
        <h5>No leaderboard data yet</h5>
        <p>Attempt questions to appear here</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h3 className="mb-4 text-center">🏆 Overall Leaderboard</h3>

      {/* ================= YOUR RANK ================= */}
      {myRank && (
        <div className="my-rank-card mb-4">
          <div>
            <h5>Your Rank</h5>
            <small className="text-muted">Overall Performance</small>
          </div>
          <div>
            <div className="rank-number">#{myRank.position}</div>
            <div className="rank-points">{myRank.points} pts</div>
          </div>
        </div>
      )}

      {/* ================= TOP 3 PODIUM ================= */}
      {list.length >= 3 && (
        <div className="podium-container mb-5">
          <div className="podium second">🥈 {list[1].name}</div>
          <div className="podium first">🥇 {list[0].name}</div>
          <div className="podium third">🥉 {list[2].name}</div>
        </div>
      )}

      {/* ================= TABLE ================= */}
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
            const isMe = u.userId === user?.id;
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

      {/* ================= STYLES ================= */}
      <style>{`
        .my-rank-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #e0f2ff, #f8fbff);
          border-radius: 16px;
          padding: 16px 18px;
          margin-bottom: 20px;
        }

        .rank-number {
          font-size: 26px;
          font-weight: 800;
          color: #2563eb;
        }

        .rank-points {
          font-size: 14px;
          font-weight: 600;
        }

        .podium-container {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 40px;
        }

        .podium {
          width: 120px;
          padding: 14px;
          border-radius: 14px;
          font-weight: 700;
          text-align: center;
        }

        .first {
          background: #ffd700;
        }

        .second {
          background: #cfd8dc;
        }

        .third {
          background: #cd7f32;
        }

        .you-badge {
          background: #2563eb;
          color: #fff;
          font-size: 11px;
          padding: 2px 6px;
          border-radius: 6px;
          margin-left: 6px;
        }
      `}</style>
    </Container>
  );
}

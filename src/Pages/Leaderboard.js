import { useEffect, useMemo, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const API_BASE = "https://futurely-backend.onrender.com/api";

export default function Leaderboard() {
  const [list, setList] = useState([]);
  const { token, user } = useAuth();

  /* ================= FETCH LEADERBOARD ================= */
  useEffect(() => {
    if (!token) return;

    fetch(`${API_BASE}/leaderboard/physics`, {
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
    return list.find((u) => u.userId === user._id) || null;
  }, [list, user]);

  /* ================= EMPTY STATE ================= */
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

      {/* ================= YOUR RANK CARD ================= */}
      {myRank && (
        <div className="my-rank-card mb-4">
          <div className="rank-left">
            <span className="rank-badge">🏅</span>
            <div>
              <h5 className="mb-1">Your Rank</h5>
              <small className="text-muted">Physics Leaderboard</small>
            </div>
          </div>

          <div className="rank-right">
            <div className="rank-number">#{myRank.position}</div>
            <div className="rank-points">{myRank.points} pts</div>
          </div>
        </div>
      )}

      {/* ================= TOP 3 PODIUM ================= */}
      {list.length >= 3 && (
        <div className="podium-container mb-5">
          <div className="podium second">
            <div className="rank">🥈</div>
            <div className="name">{list[1].name}</div>
            <div className="points">{list[1].points} pts</div>
          </div>

          <div className="podium first">
            <div className="rank">🥇</div>
            <div className="name">{list[0].name}</div>
            <div className="points">{list[0].points} pts</div>
          </div>

          <div className="podium third">
            <div className="rank">🥉</div>
            <div className="name">{list[2].name}</div>
            <div className="points">{list[2].points} pts</div>
          </div>
        </div>
      )}

      {/* ================= FULL TABLE ================= */}
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
          box-shadow: 0 8px 24px rgba(37, 99, 235, 0.15);
        }

        .rank-left {
          display: flex;
          gap: 14px;
          align-items: center;
        }

        .rank-badge {
          font-size: 34px;
        }

        .rank-number {
          font-size: 26px;
          font-weight: 800;
          color: #2563eb;
        }

        .rank-points {
          font-size: 14px;
          font-weight: 600;
          color: #334155;
        }

        .podium-container {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 20px;
        }

        .podium {
          width: 140px;
          border-radius: 14px;
          text-align: center;
          padding: 16px 10px;
          font-weight: 700;
        }

        .podium .rank {
          font-size: 32px;
        }

        .first {
          background: linear-gradient(180deg, #ffd700, #ffec8b);
          height: 200px;
        }

        .second {
          background: linear-gradient(180deg, #cfd8dc, #eceff1);
          height: 160px;
        }

        .third {
          background: linear-gradient(180deg, #cd7f32, #e0a96d);
          height: 140px;
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

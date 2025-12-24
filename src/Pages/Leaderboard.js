import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const API_BASE = "https://futurely-backend.onrender.com/api";

export default function Leaderboard() {
  const [list, setList] = useState([]);
  const { token, user } = useAuth();

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
      <h3 className="mb-4 text-center">🏆 Physics Leaderboard</h3>

      {/* ===== TOP 3 PODIUM ===== */}
      {list.length >= 3 && (
        <div className="podium-container mb-5">
          {/* 🥈 SECOND */}
          <div className="podium second">
            <div className="rank">🥈</div>
            <div className="name">{list[1].name}</div>
            <div className="points">{list[1].points} pts</div>
          </div>

          {/* 🥇 FIRST */}
          <div className="podium first">
            <div className="rank">🥇</div>
            <div className="name">{list[0].name}</div>
            <div className="points">{list[0].points} pts</div>
          </div>

          {/* 🥉 THIRD */}
          <div className="podium third">
            <div className="rank">🥉</div>
            <div className="name">{list[2].name}</div>
            <div className="points">{list[2].points} pts</div>
          </div>
        </div>
      )}

      {/* ===== FULL TABLE ===== */}
      <Table striped bordered hover>
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
                className={isMe ? "my-rank" : ""}
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

      {/* ===== STYLES ===== */}
      <style>{`
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
        color: #111;
        font-weight: 700;
      }

      .podium .rank {
        font-size: 32px;
      }

      .podium .name {
        margin-top: 8px;
        font-size: 15px;
      }

      .podium .points {
        font-size: 13px;
        margin-top: 4px;
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
        .my-rank {
  background: #e0edff !important;
  font-weight: 800;
}

.you-badge {
  background: #2563eb;
  color: #fff;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 6px;
  margin-left: 6px;
}


      @media (max-width: 600px) {
        .podium {
          width: 110px;
        }
      }
    `}</style>
    </Container>
  );

}

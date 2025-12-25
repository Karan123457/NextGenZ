import { useEffect, useMemo, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const API_BASE = "https://futurely-backend.onrender.com/api";

export default function Leaderboard() {
  const [list, setList] = useState([]);
  const { token, user } = useAuth();

  useEffect(() => {
    if (!token) return;

    fetch(`${API_BASE}/leaderboard/physics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // backend may return either array OR { leaderboard, myRank }
        const arr = Array.isArray(data) ? data : (Array.isArray(data.leaderboard) ? data.leaderboard : []);
        setList(arr);
        console.log("LEADERBOARD RAW:", data);
        console.log("LEADERBOARD ARRAY:", arr);
      })
      .catch((err) => console.error("Leaderboard error:", err));
  }, [token]);

  // support user.id (from your auth) or user._id
  const userId = user?.id || user?._id || null;

  const myRank = useMemo(() => {
    if (!userId || !list.length) return null;
    return list.find((u) => u.userId === userId) || null;
  }, [list, userId]);

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
            const isMe = u.userId === userId;
            return (
              <tr
                key={u.userId || u.position}
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

      <style>{/* styles same as yours */}</style>
    </Container>
  );
}

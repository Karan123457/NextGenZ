import { useEffect, useMemo, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { toPng } from "html-to-image";

const API_BASE = "https://futurely-backend.onrender.com/api";

export default function Leaderboard() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, user } = useAuth();

  /* ================= FETCH LEADERBOARD ================= */
  useEffect(() => {
    if (!token) return;

    setLoading(true);
    fetch(`${API_BASE}/leaderboard/overall`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setList(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  /* ================= MY RANK ================= */
  const myRank = useMemo(() => {
    if (!user || !list.length) return null;
    return list.find((u) => u.userId === user._id) || null;
  }, [list, user]);

  /* ================= SHARE HANDLER ================= */
  async function handleShare() {
    if (!myRank) return;

    const node = document.getElementById("rank-card");
    if (!node) return;

    try {
      const dataUrl = await toPng(node);
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "my-rank.png", { type: "image/png" });

      if (navigator.share) {
        await navigator.share({
          files: [file],
          title: "My Rank on Futurely",
          text: "Check my rank on Futurely 🚀",
        });
      } else {
        const link = document.createElement("a");
        link.download = "my-rank.png";
        link.href = dataUrl;
        link.click();
      }
    } catch {
      const text = `🏆 My Rank: #${myRank.position}
Points: ${myRank.points}
https://futurely.in/leaderboard`;
      navigator.clipboard.writeText(text);
      alert("Rank copied to clipboard!");
    }
  }

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <p>Loading leaderboard...</p>
      </Container>
    );
  }

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

      {/* ================= YOUR RANK (ORIGINAL BEHAVIOUR KEPT) ================= */}
      {myRank && (
        <div className="my-rank-card mb-4">
          <div>
            <h5>Your Rank</h5>
            <small className="text-muted">Overall Performance</small>
          </div>

          <div style={{ textAlign: "right" }}>
            <div className="rank-number">#{myRank.position}</div>
            <div className="rank-points">
              {myRank.points} pts
              <button
                className="share-icon-btn"
                title="Share Rank"
                onClick={handleShare}
              >
                🔗
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PODIUM (UNCHANGED) ================= */}
      {list.length >= 3 && (
        <div className="podium-container mb-5">
          <div className="podium second">🥈 {list[1].name}</div>
          <div className="podium first">🥇 {list[0].name}</div>
          <div className="podium third">🥉 {list[2].name}</div>
        </div>
      )}

      {/* ================= TABLE (UNCHANGED) ================= */}
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
                key={u.userId}
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

      {/* ================= HIDDEN SHARE IMAGE CARD ================= */}
      {myRank && (
        <div
          id="rank-card"
          style={{
            position: "absolute",
            left: "-9999px",
            width: "320px",
            padding: "20px",
            borderRadius: "16px",
            background: "linear-gradient(135deg,#2563eb,#4f83ff)",
            color: "#fff",
            textAlign: "center",
            fontFamily: "Inter, system-ui",
          }}
        >
          <h3>🏆 My Rank</h3>
          <h1>#{myRank.position}</h1>
          <p>Points: {myRank.points}</p>
          <p style={{ fontSize: 12, marginTop: 10 }}>futurely.in</p>
        </div>
      )}

      {/* ================= STYLES (UNCHANGED + SMALL ADDITION) ================= */}
      <style>{`
        .my-rank-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #e0f2ff, #f8fbff);
          border-radius: 16px;
          padding: 16px 18px;
        }

        .rank-number {
          font-size: 26px;
          font-weight: 800;
          color: #2563eb;
        }

        .rank-points {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 600;
          justify-content: flex-end;
        }

        .share-icon-btn {
          background: #2563eb;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 4px 8px;
          cursor: pointer;
          font-size: 14px;
        }

        .podium-container {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .podium {
          width: 120px;
          padding: 14px;
          border-radius: 14px;
          font-weight: 700;
          text-align: center;
        }

        .first { background: #ffd700; }
        .second { background: #cfd8dc; }
        .third { background: #cd7f32; }

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

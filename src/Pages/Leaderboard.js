import { useEffect, useMemo, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { toPng } from "html-to-image";

const API_BASE = "https://futurely-backend.onrender.com/api";

export default function Leaderboard() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, user } = useAuth();

  /* ================= FETCH OVERALL LEADERBOARD ================= */
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
    return (
      list.find(
        (u) => String(u.userId) === String(user?._id)
      ) || null
    );
  }, [list, user]);

  /* ================= AUTO SCROLL TO MY ROW ================= */
  useEffect(() => {
    const row = document.getElementById("my-row");
    row?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [list]);

  /* ================= SHARE ================= */
  async function handleShare() {
    if (!myRank) return;

    const card = document.getElementById("rank-card");
    if (!card) return;

    try {
      const dataUrl = await toPng(card);
      if (navigator.share) {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], "my-rank.png", {
          type: "image/png",
        });

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
https://futurely.in`;
      navigator.clipboard.writeText(text);
      alert("Rank copied!");
    }
  }

  /* ================= SKELETON ================= */
  if (loading) {
    return (
      <Container className="mt-5">
        <div className="skeleton title-skel" />
        <div className="skeleton podium-skel" />
        <div className="skeleton row-skel" />
        <div className="skeleton row-skel" />
        <style>{skeletonCSS}</style>
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
    <Container className="leaderboard-container">
      <h3 className="mb-4 text-center">🏆 Overall Leaderboard</h3>

      {/* ================= MY RANK CARD ================= */}
      {myRank && (
        <div className="my-rank-card mb-4">
          <div>
            <h5>Your Rank</h5>
            <small>Overall Performance</small>
          </div>

          <div style={{ textAlign: "right" }}>
            <div className="rank-number">#{myRank.position}</div>
            <div className="rank-points">
              {myRank.points} pts
              <button
                className="share-icon-btn"
                onClick={handleShare}
                title="Share Rank"
              >
                🔗
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PODIUM ================= */}
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
            const isMe =
              String(u.userId) === String(user?._id);

            return (
              <tr
                key={u.userId}
                id={isMe ? "my-row" : undefined}
                style={{
                  backgroundColor: isMe ? "#eef6ff" : undefined,
                  fontWeight: isMe ? 700 : 400,
                  boxShadow: isMe
                    ? "0 0 0 2px #2563eb inset"
                    : "none",
                  transform: isMe ? "scale(1.01)" : "none",
                }}
              >
                <td>
                  {u.position}
                  {isMe && (
                    <span className="you-badge">YOU</span>
                  )}
                </td>
                <td>{u.name}</td>
                <td>{u.points}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* ================= SHARE IMAGE CARD ================= */}
      {myRank && (
        <div
          id="rank-card"
          style={{
            position: "absolute",
            left: "-9999px",
            width: 320,
            padding: 20,
            borderRadius: 16,
            background:
              "linear-gradient(135deg,#2563eb,#4f83ff)",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <h3>🏆 My Rank</h3>
          <h1>#{myRank.position}</h1>
          <p>{myRank.points} Points</p>
          <p style={{ fontSize: 12 }}>futurely.in</p>
        </div>
      )}

      {/* ================= STYLES ================= */}
      <style>{`
        .leaderboard-container { margin-top: 90px; }

        .my-rank-card{
          display:flex;
          justify-content:space-between;
          align-items:center;
          background:linear-gradient(135deg,#2563eb,#4f83ff);
          color:#fff;
          border-radius:18px;
          padding:18px 20px;
          box-shadow:0 10px 30px rgba(37,99,235,.25);
        }

        .rank-number{
          font-size:28px;
          font-weight:800;
        }

        .rank-points{
          display:flex;
          gap:6px;
          align-items:center;
        }

        .share-icon-btn{
          background:none;
          border:none;
          color:#fff;
          font-size:18px;
          cursor:pointer;
        }

        .podium-container{
          display:flex;
          justify-content:center;
          gap:20px;
        }

        .podium{
          width:120px;
          padding:14px;
          border-radius:14px;
          font-weight:700;
          text-align:center;
          animation:rise .6s ease forwards;
        }

        .first{background:#ffd700}
        .second{background:#cfd8dc}
        .third{background:#cd7f32}

        .you-badge{
          background:#2563eb;
          color:#fff;
          font-size:11px;
          padding:2px 6px;
          border-radius:6px;
          margin-left:6px;
        }
      `}</style>
    </Container>
  );
}

/* ================= SKELETON ================= */
const skeletonCSS = `
.skeleton{
  background:linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 37%,#e5e7eb 63%);
  background-size:400% 100%;
  animation:shimmer 1.4s infinite;
  border-radius:8px;
  margin-bottom:14px;
}
.title-skel{height:32px;width:220px;margin:auto}
.podium-skel{height:120px}
.row-skel{height:20px}
@keyframes shimmer{
  0%{background-position:100% 0}
  100%{background-position:-100% 0}
}
`;

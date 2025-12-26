import { useEffect, useMemo, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { toPng } from "html-to-image"; // optional; fallback handled

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
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

  /* ================= SHARE (IMAGE + FALLBACK TEXT) ================= */
  async function handleShare() {
    if (!myRank) return;

    // attempt image share first (if html-to-image available)
    try {
      const card = document.getElementById("rank-card");
      if (card && toPng) {
        const dataUrl = await toPng(card);

        if (navigator.share) {
          const blob = await (await fetch(dataUrl)).blob();
          const file = new File([blob], "my-rank.png", { type: "image/png" });

          await navigator.share({
            files: [file],
            title: "My Rank on Futurely",
            text: `My Rank: #${myRank.position} — ${myRank.points} pts`,
          });
          return;
        } else {
          // download image fallback for desktop
          const link = document.createElement("a");
          link.download = "my-rank.png";
          link.href = dataUrl;
          link.click();
          return;
        }
      }
    } catch (e) {
      // continue to fallback text share
      console.warn("Image share failed, falling back to text.", e);
    }

    // fallback: copy text to clipboard / navigator.share text
    const text = `🏆 My Rank: #${myRank.position}\nPoints: ${myRank.points}\nCheck your rank on Futurely: https://futurely.in/leaderboard`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "My Leaderboard Rank",
          text,
          url: "https://futurely.in/leaderboard",
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        alert("Rank copied to clipboard!");
      } else {
        alert(text);
      }
    } catch (err) {
      console.error("Share failed:", err);
      alert("Could not share — copied to clipboard instead.");
      try {
        navigator.clipboard && (await navigator.clipboard.writeText(text));
      } catch {}
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
        <div className="skeleton row-skel" />

        <style>{skeletonCSS}</style>
      </Container>
    );
  }

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
    <Container className="leaderboard-container">
      <h3 className="mb-4 text-center">🏆 Overall Leaderboard</h3>

      {/* ================= YOUR RANK (unchanged behavior: only rendered when myRank exists) ================= */}
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
                className="share-btn mt-2"
                onClick={handleShare}
                title="Share Rank"
              >
                🔗 Share Rank
              </button>
            </div>
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

      {/* ================= HIDDEN SHARE CARD (only present when myRank exists) ================= */}
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

      {/* ================= STYLES ================= */}
      <style>{`
      .leaderboard-container {
        margin-top: 90px;
      }

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
          font-size: 14px;
          font-weight: 600;
          margin-top: 6px;
        }

        .share-btn {
          background: #2563eb;
          color: #fff;
          border: none;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 13px;
          cursor: pointer;
          margin-left: 10px;
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
          opacity: 0;
          transform: translateY(20px);
          animation: rise 0.6s ease forwards;
        }

        .first { background: #ffd700; animation-delay: 0.1s; }
        .second { background: #cfd8dc; animation-delay: 0.3s; }
        .third { background: #cd7f32; animation-delay: 0.5s; }

        @keyframes rise {
          to {
            opacity: 1;
            transform: translateY(0);
          }
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

/* ================= SKELETON CSS ================= */
const skeletonCSS = `
.skeleton {
  background: linear-gradient(
    90deg,
    #e5e7eb 25%,
    #f3f4f6 37%,
    #e5e7eb 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
  border-radius: 8px;
  margin-bottom: 14px;
}

.title-skel {
  height: 32px;
  width: 220px;
  margin: 0 auto 24px;
}

.podium-skel {
  height: 120px;
}

.row-skel {
  height: 20px;
}

@keyframes shimmer {
  0% { background-position: 100% 0 }
  100% { background-position: -100% 0 }
}
`;

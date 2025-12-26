import { useEffect, useMemo, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { toPng } from "html-to-image"; // make sure html-to-image is installed

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
  async function handleShareImage() {
    // Only share if we have a rank
    if (!myRank) return;

    const card = document.getElementById("rank-card-for-share");
    if (!card) return;

    try {
      const dataUrl = await toPng(card);
      // If Web Share API with files is available (mobile/secure contexts), use it
      if (navigator.share && typeof navigator.canShare === "function") {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], "my-rank.png", { type: "image/png" });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `My Rank #${myRank.position} on Futurely`,
            text: `I scored ${myRank.points} points on Futurely!`,
          });
          return;
        }
      }

      // Fallback: trigger download
      const link = document.createElement("a");
      link.download = "my-rank.png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      // If any error, fallback to copying a simple text share
      const text = `🏆 My Rank: #${myRank.position}\nPoints: ${myRank.points}\nCheck your rank: https://futurely.in/leaderboard`;
      try {
        await navigator.clipboard.writeText(text);
        alert("Rank copied to clipboard!");
      } catch {
        alert(text);
      }
    }
  }

  /* ================= TEXT SHARE (fallback) ================= */
  function handleShareText() {
    if (!myRank) return;
    const text = `🏆 My Rank: #${myRank.position}\nPoints: ${myRank.points}\nCheck your rank on Futurely: https://futurely.in/leaderboard`;
    if (navigator.share) {
      navigator.share({
        title: "My Leaderboard Rank",
        text,
        url: "https://futurely.in/leaderboard",
      }).catch(() => {
        navigator.clipboard.writeText(text);
        alert("Rank copied to clipboard!");
      });
    } else {
      navigator.clipboard.writeText(text);
      alert("Rank copied to clipboard!");
    }
  }

  /* ================= SKELETON LOADING ================= */
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

      {/* ================= YOUR RANK (only render if myRank exists; keep original behavior) ================= */}
      {myRank && (
        <div className="my-rank-card mb-4">
          <div>
            <h5>Your Rank</h5>
            <small className="text-muted">Overall Performance</small>
          </div>

          <div style={{ textAlign: "right" }}>
            {/* show actual rank and points (restore correct values) */}
            <div className="rank-number">#{myRank.position}</div>
            <div className="rank-points">
              {myRank.points} pts
              {/* Share buttons: image-first (preferred), text fallback */}
              <button
                className="share-icon-btn"
                onClick={handleShareImage}
                title="Share rank as image"
                style={{ marginLeft: 8 }}
              >
                🖼️
              </button>

              <button
                className="share-icon-btn"
                onClick={handleShareText}
                title="Share rank as text"
                style={{ marginLeft: 6 }}
              >
                🔗
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

      {/* ================= HIDDEN CARD USED FOR IMAGE SHARE (only present when myRank exists) ================= */}
      {myRank && (
        <div
          id="rank-card-for-share"
          style={{
            position: "absolute",
            left: "-9999px",
            width: 400,
            padding: 24,
            borderRadius: 16,
            background: "linear-gradient(135deg,#2563eb,#4f83ff)",
            color: "#fff",
            textAlign: "center",
            fontFamily: "Inter, system-ui",
            boxSizing: "border-box",
          }}
        >
          <div style={{ fontSize: 16, opacity: 0.95, marginBottom: 8 }}>
            🏆 Futurely
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>
            #{myRank.position}
          </div>
          <div style={{ fontSize: 18, marginBottom: 12 }}>
            {myRank.points} pts
          </div>
          <div style={{ fontSize: 14, opacity: 0.9 }}>Keep learning — Futurely.in</div>
        </div>
      )}

      {/* ================= STYLES (keep existing look & feel) ================= */}
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
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: flex-end;
        }

        .share-icon-btn {
          background: transparent;
          border: none;
          font-size: 16px;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
        }

        .share-icon-btn:hover {
          background: rgba(0,0,0,0.06);
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

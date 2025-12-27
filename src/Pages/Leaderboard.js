import { useEffect, useMemo, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { toPng } from "html-to-image"; // ✅ NEW

const API_BASE = "https://futurely-backend.onrender.com/api";

export default function Leaderboard() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, user } = useAuth();
  const myUserId = String(user?._id || user?.id || user?.userId || "");


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
    return list.find((u) => String(u.userId) === myUserId) || null;
  }, [list, user]);

  /* ================= PODIUM YOU CHECK ================= */
const isMe = (userId) => String(userId) === myUserId;


  /* ================= TOP 10 ================= */
  const top10 = useMemo(() => {
    return list.slice(0, 10);
  }, [list]);

  const isMeInTop10 = useMemo(() => {
    if (!myRank) return false;
    return top10.some((u) => u.userId === myRank.userId);
  }, [top10, myRank]);


  /* ================= SHARE (IMAGE + FALLBACK TEXT) ================= */
  async function handleShare() {
    if (!myRank) return;

    const card = document.getElementById("rank-card");
    if (!card) return;

    try {
      const dataUrl = await toPng(card);

      if (navigator.share) {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], "my-rank.png", { type: "image/png" });

        await navigator.share({
          files: [file],
          title: "My Rank on Futurely",
          text: "Check my rank on Futurely 🚀",
        });
      } else {
        // fallback → download image
        const link = document.createElement("a");
        link.download = "my-rank.png";
        link.href = dataUrl;
        link.click();
      }
    } catch (e) {
      // fallback → text share
      const text = `🏆 My Rank: #${myRank.position}
Points: ${myRank.points}
https://futurely.in/leaderboard`;
      navigator.clipboard.writeText(text);
      alert("Rank copied to clipboard!");
    }
  }
  /* ================= PODIUM IMAGE SHARE ================= */
async function handlePodiumShare() {
  const podium = document.getElementById("podium-card");
  if (!podium) return;

  try {
    // 👁️ Enable watermark for export
    podium.setAttribute("data-export", "true");

    const dataUrl = await toPng(podium, {
      backgroundColor: "#f8fafc",
      pixelRatio: 2,
    });

    // ❌ Remove watermark after export
    podium.removeAttribute("data-export");

    if (navigator.share) {
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "futurely-podium.png", {
        type: "image/png",
      });

      await navigator.share({
        files: [file],
        title: "Top 3 on Futurely 🏆",
        text: "Top performers on Futurely leaderboard 🚀",
      });
    } else {
      const link = document.createElement("a");
      link.download = "futurely-podium.png";
      link.href = dataUrl;
      link.click();
    }
  } catch (err) {
    podium.removeAttribute("data-export");
    alert("Unable to share podium right now");
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

      {/* ================= YOUR RANK ================= */}
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
{/* ================= PODIUM SHARE BUTTON ================= */}
{list.length >= 3 && (
  <div style={{ textAlign: "center", marginBottom: 12 }}>
    <button
      className="podium-share-btn"
      onClick={handlePodiumShare}
    >
       📸 Share Top 3
    </button>
  </div>
)}

      {/* ================= PODIUM ================= */}
    {/* ================= ENHANCED PODIUM ================= */}
{list.length >= 3 && (
  <div id="podium-card">

    {/* ===== PODIUM ===== */}
    <div className="podium-wrapper mb-5">

      {/* 🥈 SECOND */}
      <div className={`podium-card second ${isMe(list[1].userId) ? "me" : ""}`}>
        {isMe(list[1].userId) && <div className="you-podium">YOU</div>}
        <div className="medal silver">🥈</div>
        <div className="name">{list[1].name}</div>
        <div className="points">{list[1].points} pts</div>
        <div className="stand s2" />
      </div>

      {/* 🥇 FIRST */}
      <div className={`podium-card first ${isMe(list[0].userId) ? "me" : ""}`}>
        {isMe(list[0].userId) && <div className="you-podium">YOU</div>}
        <div className={`crown ${isMe(list[0].userId) ? "crown-you" : ""}`}>
          👑
        </div>
        <div className="medal gold">🥇</div>
        <div className="name">{list[0].name}</div>
        <div className="points">{list[0].points} pts</div>
        <div className="stand s1" />
      </div>

      {/* 🥉 THIRD */}
      <div className={`podium-card third ${isMe(list[2].userId) ? "me" : ""}`}>
        {isMe(list[2].userId) && <div className="you-podium">YOU</div>}
        <div className="medal bronze">🥉</div>
        <div className="name">{list[2].name}</div>
        <div className="points">{list[2].points} pts</div>
        <div className="stand s3" />
      </div>

    </div>

    {/* ===== WATERMARK (IMAGE SHARE ONLY) ===== */}
    <div className="podium-watermark">
      <span className="brand">Futurely</span>
      <span className="tagline">Learn • Compete • Win</span>
    </div>

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
          {/* ===== TOP 10 USERS ===== */}
          {top10.map((u) => {
            const isMe = String(u.userId) === myUserId;

            return (
              <tr
                key={u.userId}
                style={{
                  backgroundColor: isMe ? "#dbeafe" : undefined,
                  fontWeight: isMe ? 700 : 400,
                  borderLeft: isMe ? "6px solid #2563eb" : "none",
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

          {/* ===== YOUR RANK (IF NOT IN TOP 10) ===== */}
          {myRank && !isMeInTop10 && (
            <tr
              style={{
                backgroundColor: "#eff6ff",
                fontWeight: 700,
                borderTop: "2px dashed #2563eb",
                borderLeft: "6px solid #2563eb",
              }}
            >
              <td>
                {myRank.position}
                <span className="you-badge">YOU</span>
              </td>
              <td>{myRank.name}</td>
              <td>{myRank.points}</td>
            </tr>
          )}
        </tbody>

      </Table>

      {/* ================= HIDDEN SHARE CARD ================= */}
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

      /* ================= PODIUM WATERMARK ================= */

#podium-card {
  position: relative;
}

/* Hidden on screen, visible in image */
.podium-watermark {
  position: absolute;
  bottom: 8px;
  right: 12px;
  opacity: 0.18;
  text-align: right;
  pointer-events: none;
}

/* Brand */
.podium-watermark .brand {
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 0.5px;
 color: #0d6efd; /* ✅ Futurely brand blue */
}

/* Tagline */
.podium-watermark .tagline {
  display: block;
  font-size: 10px;
  font-weight: 600;
  color: #0d6efd;
  
}

/* 👁 Hide watermark on live UI */
.podium-watermark {
  visibility: hidden;
}

/* 📸 Show ONLY during image capture */
#podium-card[data-export="true"] .podium-watermark {
  visibility: visible;
}

      /* ================= CROWN ANIMATION (ONLY FOR YOU) ================= */

.crown {
  position: absolute;
  top: -26px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 22px;
}

/* Animate ONLY when it's YOU */
.crown-you {
  animation: crownJump 1.4s ease-in-out infinite;
  filter: drop-shadow(0 0 6px gold);
}

@keyframes crownJump {
  0%   { transform: translateX(-50%) translateY(0) rotate(0deg); }
  30%  { transform: translateX(-50%) translateY(-10px) rotate(-5deg); }
  60%  { transform: translateX(-50%) translateY(-10px) rotate(5deg); }
  100% { transform: translateX(-50%) translateY(0) rotate(0deg); }
}

      /* ================= YOU PODIUM BADGE ================= */
.you-podium {
  position: absolute;
  top: -12px;
  right: -10px;
  background: #2563eb;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  padding: 4px 8px;
  border-radius: 999px;
  box-shadow: 0 0 0 3px #fff;
  animation: glow 1.6s infinite;
}

/* Highlight card if it's YOU */
.podium-card.me {
  box-shadow: 0 0 0 3px rgba(37,99,235,0.35);
  border-radius: 16px;
}

/* Glow animation */
@keyframes glow {
  0% { box-shadow: 0 0 0 0 rgba(37,99,235,0.7); }
  70% { box-shadow: 0 0 0 8px rgba(37,99,235,0); }
  100% { box-shadow: 0 0 0 0 rgba(37,99,235,0); }
}

/* ================= PODIUM SHARE BUTTON ================= */
.podium-share-btn {
  background: linear-gradient(135deg, #2563eb, #4f83ff);
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.podium-share-btn:hover {
  opacity: 0.9;
}

      /* ================= ENHANCED PODIUM ================= */

.podium-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 22px;
  margin-top: 10px;
}

/* COMMON CARD */
.podium-card {
  width: 130px;
  text-align: center;
  font-weight: 700;
  animation: popIn 0.6s ease forwards;
  position: relative;
}

.podium-card .name {
  margin-top: 6px;
  font-size: 14px;
}

.podium-card .points {
  font-size: 12px;
  opacity: 0.8;
}

/* MEDALS */
.medal {
  font-size: 26px;
}

.gold { color: #facc15; }
.silver { color: #cbd5e1; }
.bronze { color: #fb923c; }

/* 👑 Crown for #1 */
.crown {
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 22px;
  animation: bounce 1.5s infinite;
}

/* STANDS */
.stand {
  width: 100%;
  border-radius: 12px 12px 0 0;
  margin-top: 10px;
}

.s1 {
  height: 90px;
  background: linear-gradient(180deg,#fde047,#facc15);
}

.s2 {
  height: 70px;
  background: linear-gradient(180deg,#e5e7eb,#cbd5e1);
}

.s3 {
  height: 55px;
  background: linear-gradient(180deg,#fdba74,#fb923c);
}

/* POSITION SCALING */
.podium-card.first {
  transform: scale(1.08);
  z-index: 2;
}

.podium-card.second,
.podium-card.third {
  opacity: 0.95;
}

/* ANIMATIONS */
@keyframes popIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-6px); }
}

        .leaderboard-container { margin-top: 90px; }

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
          gap: 6px;
          justify-content: flex-end;
        }

        .share-icon-btn {
          background: transparent;
          border: none;
          font-size: 18px;
          cursor: pointer;
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
          to { opacity: 1; transform: translateY(0); }
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

.title-skel { height: 32px; width: 220px; margin: 0 auto 24px; }
.podium-skel { height: 120px; }
.row-skel { height: 20px; }

@keyframes shimmer {
  0% { background-position: 100% 0 }
  100% { background-position: -100% 0 }
}
`;












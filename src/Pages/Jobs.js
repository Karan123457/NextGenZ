import React from "react";

const DATA = [
  { id: "2025", year: "2025", title: "Question Paper", total: 118, attempted: 4 },
  { id: "2024", year: "2024", title: "Question Paper", total: 118, attempted: 4 },
  { id: "2023", year: "2023", title: "Question Paper", total: 70, attempted: 20 },
];

export default function FuturelyPYQExact() {
  const totalAttempted = DATA.reduce((s, i) => s + i.attempted, 0);

  return (
    <div className="pyq-app">
      <style>{`
/* ROOT */
.pyq-app{
  font-family: Inter, system-ui;
  background:#f4f7fb;
  min-height:100vh;
  margin-top:56px;
  display:flex;
  flex-direction:column;
  align-items:center;
}

/* WIDTH CONTROL */
.pyq-header,
.pyq-card{
  width:100%;
  max-width:760px;
}

/* HEADER */
.pyq-header{
  background:linear-gradient(180deg,#6c45ff,#4f83ff);
  color:#fff;
  padding:20px 16px 24px;
  border-radius:0 0 22px 22px;
  text-align:center;
}

.pyq-header h1{
  margin:0;
  font-size:clamp(18px, 5vw, 22px);
  font-weight:800;
}

.pyq-header p{
  margin:6px 0 14px;
  font-size:clamp(13px, 3.5vw, 14px);
  opacity:.95;
}

/* STATS */
.pyq-stats{
  display:flex;
  justify-content:center;
  gap:26px;
  font-size:13px;
}

.pyq-stats span{
  display:flex;
  flex-direction:column;
  align-items:center;
  font-weight:600;
}

.pyq-stats strong{
  font-size:15px;
}

/* TABS */
.pyq-tabs{
  margin-top:14px;
  display:flex;
  gap:8px;
  justify-content:center;
  flex-wrap:wrap;
}

.pyq-tabs button{
  border:none;
  padding:8px 16px;
  border-radius:999px;
  background:rgba(255,255,255,.25);
  color:#fff;
  font-size:13px;
  font-weight:700;
  min-height:36px;
}

.pyq-tabs button.active{
  background:#fff;
  color:#2563eb;
}

/* CONTENT CARD */
.pyq-card{
  background:#fff;
  margin:16px 12px;
  border-radius:18px;
  padding:16px;
  box-shadow:0 10px 30px rgba(0,0,0,.06);
}

.pyq-card h2{
  margin:0;
  font-size:15px;
  font-weight:800;
  color:#2563eb;
  text-align:center;
}

.pyq-card .sub{
  text-align:center;
  font-size:13px;
  color:#6b7280;
  margin-top:6px;
}

/* LIST */
.pyq-list{
  margin-top:14px;
  display:flex;
  flex-direction:column;
  gap:10px;
}

.pyq-row{
  display:flex;
  justify-content:space-between;
  align-items:center;
  background:#f9fbff;
  border-radius:14px;
  padding:12px;
}

/* LEFT */
.pyq-left{
  display:flex;
  gap:12px;
  align-items:center;
}

.pyq-year{
  width:42px;
  height:42px;
  border-radius:12px;
  background:#eef3ff;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:800;
  color:#2563eb;
}

/* RIGHT */
.pyq-progress{
  font-size:14px;
  font-weight:800;
  color:#2563eb;
  text-align:right;
}

.pyq-small{
  font-size:11px;
  color:#6b7280;
  text-align:right;
  margin-top:3px;
}

/* MOBILE: EDGE-TO-EDGE HEADER ONLY */
@media (max-width:600px){
  .pyq-header{
    width:100vw;
    max-width:100vw;
    margin-left:calc(-50vw + 50%);
    margin-right:calc(-50vw + 50%);
    padding-left:16px;
    padding-right:16px;
    position:sticky;
    top:56px;
    z-index:50;
    box-shadow:0 6px 20px rgba(0,0,0,.08);
  }
}
  /* ========== DESKTOP POLISH ========== */
@media (min-width:1024px){

  /* Overall container */
  .pyq-app{
    align-items:center;
  }

  /* Increase comfortable width */
  .pyq-header,
  .pyq-card{
    max-width:980px;
  }

  /* Header refinement */
  .pyq-header{
    padding:28px 32px 26px;
    border-radius:0 0 28px 28px;
  }

  .pyq-header h1{
    font-size:26px;
    letter-spacing:-0.3px;
  }

  .pyq-header p{
    font-size:15px;
    margin-top:8px;
  }

  /* Stats row looks premium */
  .pyq-stats{
    gap:48px;
    margin-top:12px;
  }

  .pyq-stats strong{
    font-size:18px;
  }

  /* Tabs like nav */
  .pyq-tabs{
    margin-top:18px;
    gap:12px;
  }

  .pyq-tabs button{
    padding:10px 22px;
    font-size:14px;
    cursor:pointer;
    transition:all .2s ease;
  }

  .pyq-tabs button:hover{
    background:rgba(255,255,255,.35);
  }

  /* Content card spacing */
  .pyq-card{
    margin:28px auto;
    padding:22px;
    border-radius:22px;
  }

  .pyq-card h2{
    font-size:18px;
  }

  .pyq-card .sub{
    font-size:14px;
  }

  /* Rows feel clickable */
  .pyq-row{
    padding:14px 16px;
    transition:all .2s ease;
    cursor:pointer;
  }

  .pyq-row:hover{
    background:#f1f5ff;
    transform:translateY(-1px);
  }

  .pyq-year{
    width:46px;
    height:46px;
    font-size:15px;
  }

  .pyq-progress{
    font-size:15px;
  }

  .pyq-small{
    font-size:12px;
  }
}

      `}</style>

      {/* HEADER */}
      <div className="pyq-header">
        <h1>Jharkhand D2D PYQ</h1>
        <p>(2021 – 2025) — For 2026 Exam</p>

        <div className="pyq-stats">
          <span><strong>2021–2025</strong>Years</span>
          <span><strong>5</strong>Papers</span>
          <span><strong>350</strong>Questions</span>
        </div>

        <div className="pyq-tabs">
          <button className="active">Physics</button>
          <button>Chemistry</button>
          <button>Math</button>
          <button>Analysis</button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="pyq-card">
        <h2>Physics Previous Year Questions</h2>
        <div className="sub">{totalAttempted} attempted</div>

        <div className="pyq-list">
          {DATA.map(item => (
            <div key={item.id} className="pyq-row">
              <div className="pyq-left">
                <div className="pyq-year">{item.year}</div>
                <div>{item.title}</div>
              </div>

              <div>
                <div className="pyq-progress">
                  {item.attempted}/{item.total}
                </div>
                <div className="pyq-small">
                  Total {item.total} • Attempted {item.attempted}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

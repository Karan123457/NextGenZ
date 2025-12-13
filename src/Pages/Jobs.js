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
.pyq-app{
  font-family: Inter, system-ui;
  background:#f4f7fb;
  min-height:100vh;
  margin-top:56px;
}

/* HEADER */
.pyq-header{
  background:linear-gradient(180deg,#6c45ff,#4f83ff);
  color:#fff;
  padding:18px 16px 22px;
  border-radius:0 0 22px 22px;
}
.pyq-header h1{
  margin:0;
  text-align:center;
  font-size:18px;
  font-weight:800;
}
.pyq-header p{
  margin:4px 0 10px;
  text-align:center;
  font-size:12px;
  opacity:.95;
}

/* STATS */
.pyq-stats{
  display:flex;
  justify-content:center;
  gap:28px;
  font-size:12px;
}
.pyq-stats span{
  display:flex;
  flex-direction:column;
  align-items:center;
  font-weight:600;
}

/* TABS */
.pyq-tabs{
  margin-top:14px;
  display:flex;
  gap:8px;
  justify-content:center;
}
.pyq-tabs button{
  border:none;
  padding:7px 14px;
  border-radius:999px;
  background:rgba(255,255,255,.25);
  color:#fff;
  font-size:13px;
  font-weight:700;
}
.pyq-tabs button.active{
  background:#fff;
  color:#2563eb;
}

/* CARD */
.pyq-card{
  background:#fff;
  margin:14px 12px;
  border-radius:18px;
  padding:16px;
  box-shadow:0 10px 30px rgba(0,0,0,.06);
}
.pyq-card h2{
  margin:0;
  text-align:center;
  font-size:15px;
  font-weight:800;
  color:#2563eb;
}
.pyq-card .sub{
  text-align:center;
  font-size:13px;
  color:#6b7280;
  margin-top:4px;
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
  font-size:14px;
}
.pyq-meta{
  line-height:1.2;
}
.pyq-title{
  font-size:14px;
  font-weight:700;
  color:#111827;
}

/* RIGHT */
.pyq-right{
  text-align:right;
}
.pyq-progress{
  font-size:14px;
  font-weight:800;
  color:#2563eb;
}
.pyq-small{
  font-size:11px;
  color:#6b7280;
  margin-top:3px;
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
                <div className="pyq-meta">
                  <div className="pyq-title">{item.title} …</div>
                </div>
              </div>

              <div className="pyq-right">
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


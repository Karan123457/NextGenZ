import React, { useState } from "react";

import PhysicsQuestions from "./PhysicsQuestions";
import ChemistryQuestions from "./ChemistryQuestions";
import MathematicsQuestions from "./MathematicsQuestions";
// import Analysis from "./Analysis"; // optional later

export default function FuturelyPYQExact() {
  const [activeTab, setActiveTab] = useState("Physics");
  const [focusMode, setFocusMode] = useState(false); // NEW

  return (
    <div className={`pyq-app ${focusMode ? "focus-mode" : ""}`}>
      <style>{`
/* ================= ROOT ================= */
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

/* ================= HEADER ================= */
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

.pyq-header h2{
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
  cursor:pointer;
}

.pyq-tabs button.active{
  background:#fff;
  color:#2563eb;
}

/* ================= CONTENT CARD ================= */
.pyq-card{
  background:#fff;
  margin:16px 12px;
  border-radius:18px;
  padding:16px;
  box-shadow:0 10px 30px rgba(0,0,0,.06);
}

/* ================= FOCUS MODE ================= */
.focus-mode .pyq-header,
.focus-mode .pyq-seo{
  display:none;
}

.focus-mode .pyq-card{
  margin:0;
  padding:0;
  width:100%;
  max-width:100%;
  border-radius:0;
  box-shadow:none;
}

/* ================= MOBILE ================= */
@media (max-width:600px){
  .pyq-header{
    width:100vw;
    max-width:100vw;
    margin-left:calc(-50vw + 50%);
    margin-right:calc(-50vw + 50%);
    position:sticky;
    top:56px;
    z-index:50;
  }
}
      `}</style>

      {/* ================= HEADER ================= */}
      {!focusMode && (
        <div className="pyq-header">
          <h1>Jharkhand D2D Previous Year Questions (PYQ)</h1>
          <h2>(2021 – 2025) — For 2026 Exam</h2>

          <div className="pyq-stats">
            <span><strong>2021–2025</strong>Years</span>
            <span><strong>5</strong>Papers</span>
            <span><strong>350+</strong>Questions</span>
          </div>

          <div className="pyq-tabs">
            <button className={activeTab === "Physics" ? "active" : ""} onClick={() => setActiveTab("Physics")}>Physics</button>
            <button className={activeTab === "Chemistry" ? "active" : ""} onClick={() => setActiveTab("Chemistry")}>Chemistry</button>
            <button className={activeTab === "Math" ? "active" : ""} onClick={() => setActiveTab("Math")}>Math</button>
            <button className={activeTab === "Analysis" ? "active" : ""} onClick={() => setActiveTab("Analysis")}>Analysis</button>
          </div>
        </div>
      )}

      {/* ================= CONTENT ================= */}
      <div className="pyq-card">
        {activeTab === "Physics" && (
          <PhysicsQuestions setFocusMode={setFocusMode} />
        )}
        {activeTab === "Chemistry" && (
  <ChemistryQuestions setFocusMode={setFocusMode} />
)}

{activeTab === "Math" && (
  <MathematicsQuestions setFocusMode={setFocusMode} />
)}

        {activeTab === "Analysis" && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#6b7280" }}>
            Analysis section coming soon 🚀
          </div>
        )}
      </div>

      {/* ================= SEO CONTENT ================= */}
      {!focusMode && (
        <div className="pyq-seo">
          <h2>Jharkhand D2D Previous Year Question Papers</h2>
          <p>
            Prepare for the <strong>Jharkhand Diploma to Degree (D2D) Exam 2026</strong>
            using official previous year question papers from <strong>2021 to 2025</strong>.
          </p>
        </div>
      )}
    </div>
  );
}

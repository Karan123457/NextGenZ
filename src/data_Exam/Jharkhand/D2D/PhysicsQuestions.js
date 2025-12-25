// PhysicsQuestions.js

import React, { useState, useRef, useEffect } from "react";

import { Button } from "react-bootstrap";

import { authFetch } from "../../../utils/api";

/* ================= DATA ================= */

export const physicsQuestionsByYear = {

"2025 Questions": [

{ id: "2025-q1", text: "Newton's Law?", options: ["A", "B", "C", "D"], correctIndex: 0 },

{ id: "2025-q2", text: "Kinematics?", options: ["A", "B", "C", "D"], correctIndex: 0 },

],

"2024 Questions": [

{ id: "2024-q1", text: "Dynamics?", options: ["A", "B", "C", "D"], correctIndex: 0 },

{ id: "2024-q2", text: "What is Computer?", options: ["A", "B", "C", "D"], correctIndex: 0 },

],

};

/* ================= COMPONENT ================= */

export default function PhysicsQuestions({ setFocusMode }) {

const years = [

{ year: "All Previous Year Questions", key: "ALL" },

{ year: "2025 Questions", key: "2025" },

{ year: "2024 Questions", key: "2024" },

{ year: "2023 Questions", key: "2023" },

{ year: "2022 Questions", key: "2022" },

];

const timerRef = useRef(null);

const [selectedYear, setSelectedYear] = useState(null);

const [yearQuestions, setYearQuestions] = useState([]);

const [currentIndex, setCurrentIndex] = useState(0);

/* per-question states */

const [selectedAnswers, setSelectedAnswers] = useState({});

const [attempted, setAttempted] = useState({});

const [showAnswer, setShowAnswer] = useState({}); // false | "PARTIAL" | "FULL"

const [attemptCount, setAttemptCount] = useState({});

const [timeLeft, setTimeLeft] = useState(0);

const [viewMode, setViewMode] = useState("years");

/* ================= EFFECTS ================= */

useEffect(() => {

if (viewMode === "viewer" && yearQuestions.length > 0) {

  startTimer();

}

return () => timerRef.current && clearInterval(timerRef.current);

// eslint-disable-next-line react-hooks/exhaustive-deps

}, [viewMode, yearQuestions]);

/* ================= HELPERS ================= */

function startTimer() {

if (timerRef.current) clearInterval(timerRef.current);

setTimeLeft(0);

timerRef.current = setInterval(() => {

  setTimeLeft(prev => prev + 1);

}, 1000);

}

function formatTime(sec) {

const m = Math.floor(sec / 60).toString().padStart(2, "0");

const s = (sec % 60).toString().padStart(2, "0");

return `${m}:${s}`;

}

function getTotal(y) {

if (y.key === "ALL") {

  return Object.values(physicsQuestionsByYear).reduce((s, a) => s + a.length, 0);

}

return physicsQuestionsByYear[y.year]?.length || 0;

}

function getAttempted(y) {

if (y.key === "ALL") {

  return Object.keys(attempted).filter(k => attempted[k]).length;

}

const arr = physicsQuestionsByYear[y.year] || [];

return arr.filter(q => attempted[q.id]).length;

}

/* ================= ACTIONS ================= */

function openYearQuestions(yearObj) {

let qs = [];

if (yearObj.key === "ALL") {

  Object.values(physicsQuestionsByYear).forEach(arr => (qs = qs.concat(arr)));

} else {

  qs = physicsQuestionsByYear[yearObj.year] || [];

}



setYearQuestions(qs);

setCurrentIndex(0);

setViewMode("viewer");

setSelectedYear(yearObj);

setFocusMode && setFocusMode(true);



// initialize per-question maps without overriding other-year data

setSelectedAnswers(prev => {

  const next = { ...prev };

  qs.forEach(q => { if (next[q.id] === undefined) next[q.id] = undefined; });

  return next;

});

setAttempted(prev => {

  const next = { ...prev };

  qs.forEach(q => { if (next[q.id] === undefined) next[q.id] = false; });

  return next;

});

setShowAnswer(prev => {

  const next = { ...prev };

  qs.forEach(q => { if (next[q.id] === undefined) next[q.id] = false; });

  return next;

});

setAttemptCount(prev => {

  const next = { ...prev };

  qs.forEach(q => { if (next[q.id] === undefined) next[q.id] = 0; });

  return next;

});



startTimer();

}

function handleSelectOption(qid, idx) {

// block selecting when feedback is visible for this question

if (showAnswer[qid]) return;

setSelectedAnswers(prev => ({ ...prev, [qid]: idx }));

}

async function handleCheckAnswer() {

const q = yearQuestions[currentIndex];

if (!q) return;



const qid = q.id;

const selected = selectedAnswers[qid];

if (selected === undefined) return;



const alreadyAttempted = attempted[qid];



setAttempted(prev => ({ ...prev, [qid]: true }));



setAttemptCount(prev => {

  const next = (prev[qid] || 0) + 1;



  if (next === 1) setShowAnswer(p => ({ ...p, [qid]: "PARTIAL" }));

  if (next >= 2) setShowAnswer(p => ({ ...p, [qid]: "FULL" }));



  return { ...prev, [qid]: next };

});



// 🔐 SAVE ONLY ON FIRST ATTEMPT

if (!alreadyAttempted) {

  try {

    await authFetch("/physics/attempt", {

      method: "POST",

      body: JSON.stringify({

        questionId: q.id,

        year:

          selectedYear?.key === "ALL"

            ? q.id.split("-")[0]

            : selectedYear?.year,

        selectedIndex: selected,

        correctIndex: q.correctIndex,

        timeTaken: timeLeft,

      }),

    });





  } catch (err) {

    console.error("Failed to save attempt", err);

  }

}



timerRef.current && clearInterval(timerRef.current);

}

function handleTryAgain() {

const q = yearQuestions[currentIndex];

if (!q) return;

const qid = q.id;



// hide feedback and clear selection so user picks again

setShowAnswer(prev => ({ ...prev, [qid]: false }));

setSelectedAnswers(prev => ({ ...prev, [qid]: undefined }));

startTimer();

}

function goNext() {

if (currentIndex < yearQuestions.length - 1) {

  setCurrentIndex(i => i + 1);

  startTimer();

}

}

function goPrevious() {

if (currentIndex > 0) {

  setCurrentIndex(i => i - 1);

  startTimer();

}

}

function backToYears() {

setViewMode("years");

setSelectedYear(null);

setYearQuestions([]);

setCurrentIndex(0);

setFocusMode && setFocusMode(false);

timerRef.current && clearInterval(timerRef.current);

}

const attemptedCount = yearQuestions.filter(q => attempted[q.id]).length;

/* ================= bottomBar ================= */

const showBottomBar = viewMode === "viewer" && yearQuestions.length > 0;

let bottomBar = null;

if (showBottomBar) {

const qid = yearQuestions[currentIndex].id;

const isShown = showAnswer[qid] === "PARTIAL" || showAnswer[qid] === "FULL";

const chosen = selectedAnswers[qid];

const correctIdx = yearQuestions[currentIndex].correctIndex;

const showTryAgain = isShown && chosen !== correctIdx;



bottomBar = (

  <div className="bottom-action-bar">

    <div className="bottom-action-inner">

      <Button variant="light" onClick={goPrevious} disabled={currentIndex === 0}>Previous</Button>



      {showTryAgain ? (

        <button className="try-btn" onClick={handleTryAgain} aria-label="Try again">

          <span style={{ fontSize: 18 }}>↺</span>

          Try Again

        </button>

      ) : (

        <Button

          variant="primary"

          onClick={handleCheckAnswer}

          // disabled when a feedback state is active OR when no option selected

          disabled={isShown || selectedAnswers[qid] === undefined}

          style={{ minWidth: 160 }}

        >

          Check Answer

        </Button>

      )}



      <Button variant="light" onClick={goNext} disabled={currentIndex === yearQuestions.length - 1}>Next</Button>

    </div>

  </div>

);

}

/* ================= UI ================= */

return (

<div className="physics-box">

  <style>{`

  .pyq-title{

margin: 0;

font-size: 15px;

font-weight: 800;

color: #2563eb;

text-align: center;

margin-bottom: 30px;

}

.pyq-list{display:flex;flex-direction:column;gap:10px}

  .pyq-row{display:flex;justify-content:space-between;align-items:center;background:#f9fbff;border-radius:14px;padding:12px;cursor:pointer;transition:.2s}

  .pyq-row:hover{background:#eef3ff;transform:translateY(-1px)}

  .pyq-left{display:flex;gap:12px;align-items:center}

  .pyq-year{width:42px;height:42px;border-radius:12px;background:#eef3ff;display:flex;align-items:center;justify-content:center;font-weight:800;color:#2563eb}

  .pyq-progress{font-size:14px;font-weight:800;color:#2563eb;text-align:right}

  .pyq-small{font-size:11px;color:#6b7280;margin-top:3px;text-align:right}



  .exam-topbar{display:flex;justify-content:space-between;align-items:center;background:#0f172a;color:#fff;margin-left:-16px;margin-right:-16px;padding:10px 14px;margin-bottom:14px;border-radius:0}

  .exam-left span{display:block;font-size:12px;opacity:.8}

  .exam-center{font-weight:700}

  .exam-right{display:flex;gap:8px;align-items:center}



  .timer-pill{padding:6px 14px;border-radius:999px;font-weight:800;font-size:13px;background:#e0edff;color:#1d4ed8}



  .option-box{

    display:flex;align-items:center;gap:15px;

    border:2px solid #e5e7eb;border-radius:14px;

    padding:14px 16px;margin-bottom:16px;

    cursor:pointer;background:#fff;user-select:none;

    transition: all .18s ease;

  }



  .option-box strong{

    width:38px;height:38px;border-radius:50%;

    background:#f1f5f9;color:#475569;display:flex;

    align-items:center;justify-content:center;font-weight:700;font-size:15px;

    flex-shrink:0;

  }



  .option-box.selected{

    border:2px solid #1d4ed8;

    background:#ffffff;

  }

  .option-box.selected strong{

    background:#1d4ed8;

    color:#ffffff;

  }



  .option-box.correct{

    border-color:#22c55e;

    background:#f0fdf4;

  }

  .option-box.correct strong{

    background:#22c55e;

    color:#ffffff;

  }



  .option-box.incorrect{

    border-color:#ef4444;

    background:#fef2f2;

  }

  .option-box.incorrect strong{

    background:#ef4444;

    color:#ffffff;

  }



  .bottom-action-bar{

    position:fixed;

    bottom:0;

    left:0;

    width:100%;

    background:#ffffff;

    padding:14px 16px 18px;

    border-top:1px solid #e5e7eb;

    z-index:1000;

  }



  .bottom-action-inner{

    max-width:760px;

    margin:0 auto;

    display:flex;

    justify-content:space-between;

    align-items:center;

    gap:12px;

  }



  .bottom-action-inner button{

    min-width:110px;

    height:44px;

    border-radius:12px;

    font-weight:600;

    font-size:15px;

  }



  .bottom-action-inner .btn-light{

    border-radius:12px !important;

    border:1.5px solid #d1d5db !important;

    background:#ffffff !important;

    color:#111827;

  }

  .bottom-action-inner .btn-light:hover{

    background:#f9fafb !important;

  }

  .bottom-action-inner .btn-light:disabled,

  .bottom-action-inner .btn-light.disabled{

    border-radius:12px !important;

    border:1.5px solid #d1d5db !important;

    background:#ffffff !important;

    color:#9ca3af !important;

    opacity:1 !important;

  }



  .try-btn{

    background:#111827;

    color:#fff;

    border:0;

    min-width:160px;

    height:44px;

    border-radius:12px;

    display:inline-flex;

    align-items:center;

    justify-content:center;

    gap:10px;

    font-weight:700;

    font-size:15px;

  }

  .try-btn:hover{opacity:.95}



  .mcq-viewer{padding-bottom:120px}



  @media (max-width:600px){

    .exam-topbar{margin-left:-12px;margin-right:-12px}

    .option-box{padding:12px 14px}

    .option-box strong{min-width:32px;height:32px;font-size:13px}

    .bottom-action-inner{gap:8px}

  }

  `}</style>



  {/* ================= YEAR LIST ================= */}

  {viewMode === "years" && (

    <>

      <h2 className="pyq-title">Physics Previous Year Questions</h2>

      {attemptedCount > 0 && (

        <div className="small text-muted mb-2">

          {attemptedCount} attempted

        </div>

      )}





      <div className="pyq-list">

        {years.map((y, i) => (

          <div key={i} className="pyq-row" onClick={() => openYearQuestions(y)}>

            <div className="pyq-left">

              <div className="pyq-year">{y.key}</div>

              <div>

                <div style={{ fontWeight: 400 }}>

                  {y.key === "ALL" ? "All Previous Year Questions" : "D2D Physics PYQ"}

                </div>



              </div>

            </div>



            <div>

              <div className="pyq-progress">{getAttempted(y)}/{getTotal(y)}</div>

            </div>

          </div>



        ))}

      </div>

    </>

  )}



  {/* ================= MCQ VIEWER ================= */}

  {viewMode === "viewer" && yearQuestions.length > 0 && (

    <div className="mcq-viewer">

      <div className="exam-topbar">

        <div className="exam-left">

          <strong>Jharkhand D2D</strong>

          <span>Physics – {selectedYear?.key === "ALL" ? "All PYQ" : selectedYear?.year}</span>

        </div>

        <div className="exam-center">Q {currentIndex + 1} / {yearQuestions.length}</div>

        <div className="exam-right">

          <div className="timer-pill">⏱ {formatTime(timeLeft)}</div>

          <Button size="sm" variant="light" onClick={backToYears}>✕</Button>

        </div>

      </div>



      <div className="fw-bold mb-5" style={{ fontSize: "1.02rem" }}>

        {yearQuestions[currentIndex].text}

      </div>



      {yearQuestions[currentIndex].options.map((opt, idx) => {

        const qid = yearQuestions[currentIndex].id;

        const showState = showAnswer[qid]; // false | "PARTIAL" | "FULL"

        const isCorrect = yearQuestions[currentIndex].correctIndex === idx;

        const isSelected = selectedAnswers[qid] === idx;



        let cls = "option-box";

        /* BEFORE CHECK */

        if (!showState && isSelected) cls += " selected";



        /* FIRST CHECK (attempt 1) */

        if (showState === "PARTIAL" && isSelected && isCorrect) cls += " correct";

        if (showState === "PARTIAL" && isSelected && !isCorrect) cls += " incorrect";



        /* SECOND CHECK (attempt 2+) */

        if (showState === "FULL" && isCorrect) cls += " correct";

        if (showState === "FULL" && isSelected && !isCorrect) cls += " incorrect";



        return (

          <div

            key={idx}

            className={cls}

            onClick={() => handleSelectOption(qid, idx)}

            role="button"

            tabIndex={0}

            onKeyDown={(e) => {

              if (e.key === "Enter" || e.key === " ") {

                e.preventDefault();

                handleSelectOption(qid, idx);

              }

            }}

            aria-pressed={isSelected}

            aria-disabled={!!showState}

            style={{ opacity: 1 }}

          >

            <strong>{String.fromCharCode(65 + idx)}</strong>

            <div>{opt}</div>

          </div>

        );

      })}

    </div>

  )}



  {/* ===== FIXED BOTTOM BUTTONS ===== */}

  {bottomBar}

</div>

);

}

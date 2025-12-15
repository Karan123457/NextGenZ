// PhysicsQuestions.js
import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";

/* ================= DATA ================= */
export const physicsQuestionsByYear = {
  "2025 Questions": [
    { id: "2025-q1", text: "Newton's Law?", options: ["A","B","C","D"], correctIndex: 0 },
    { id: "2025-q2", text: "Kinematics?", options: ["A","B","C","D"], correctIndex: 0 },
  ],
  "2024 Questions": [
    { id: "2024-q1", text: "Dynamics?", options: ["A","B","C","D"], correctIndex: 0 },
    { id: "2024-q1", text: "What is Computer", options: ["A","B","C","D"], correctIndex: 0 },
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

  const [yearQuestions, setYearQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checked, setChecked] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [viewMode, setViewMode] = useState("years");

  /* ================= EFFECTS ================= */
  useEffect(() => {
    if (viewMode === "viewer" && yearQuestions.length > 0) {
      startTimer();
      const qid = yearQuestions[currentIndex].id;
      setIsDisabled(Boolean(checked[qid]));
    }
  }, [currentIndex, viewMode, yearQuestions, checked]);

  useEffect(() => {
    return () => timerRef.current && clearInterval(timerRef.current);
  }, []);

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

  function getTotalQuestions(y) {
    if (y.key === "ALL") {
      return Object.values(physicsQuestionsByYear)
        .reduce((s, arr) => s + arr.length, 0);
    }
    return physicsQuestionsByYear[y.year]?.length || 0;
  }

  function getAttemptedQuestions(y) {
    if (y.key === "ALL") {
      return Object.values(physicsQuestionsByYear)
        .flat()
        .filter(q => checked[q.id]).length;
    }
    return (physicsQuestionsByYear[y.year] || [])
      .filter(q => checked[q.id]).length;
  }

  /* ================= ACTIONS ================= */
  function openYearQuestions(yearObj) {
    let qs = [];
    if (yearObj.key === "ALL") {
      Object.values(physicsQuestionsByYear).forEach(arr => qs = qs.concat(arr));
    } else {
      qs = physicsQuestionsByYear[yearObj.year] || [];
    }

    setYearQuestions(qs);
    setCurrentIndex(0);
    setViewMode("viewer");
    setFocusMode?.(true);

    setChecked(prev => {
      const next = { ...prev };
      qs.forEach(q => {
        if (next[q.id] === undefined) next[q.id] = false;
      });
      return next;
    });
  }

  function handleSelectOption(qid, idx) {
    if (isDisabled) return;
    setSelectedAnswers(prev => ({ ...prev, [qid]: idx }));
  }

  function handleCheckAnswer() {
    const q = yearQuestions[currentIndex];
    if (!q) return;
    setChecked(prev => ({ ...prev, [q.id]: true }));
    setIsDisabled(true);
    timerRef.current && clearInterval(timerRef.current);
  }

  function goNext() {
    if (currentIndex < yearQuestions.length - 1) {
      setCurrentIndex(i => i + 1);
      setIsDisabled(false);
    }
  }

  function goPrevious() {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
      setIsDisabled(false);
    }
  }

  function backToYears() {
    setViewMode("years");
    setYearQuestions([]);
    setCurrentIndex(0);
    setFocusMode?.(false);
    timerRef.current && clearInterval(timerRef.current);
  }

  const attemptedCount = Object.values(checked).filter(Boolean).length;

  /* ================= UI ================= */
  return (
    <div className="physics-box">
      <style>{`
      .pyq-list{display:flex;flex-direction:column;gap:10px}
      .pyq-row{display:flex;justify-content:space-between;align-items:center;background:#f9fbff;border-radius:14px;padding:12px;cursor:pointer;transition:.2s}
      .pyq-row:hover{background:#eef3ff;transform:translateY(-1px)}
      .pyq-left{display:flex;gap:12px;align-items:center}
      .pyq-year{width:42px;height:42px;border-radius:12px;background:#eef3ff;display:flex;align-items:center;justify-content:center;font-weight:800;color:#2563eb}
      .pyq-progress{font-weight:800;color:#2563eb;text-align:right}
      .pyq-small{font-size:11px;color:#6b7280;margin-top:3px;text-align:right}

      .exam-topbar{
        display:flex;justify-content:space-between;align-items:center;
        background:#0f172a;color:#fff;
        margin-left:-16px;margin-right:-16px;
        padding:10px 14px;margin-bottom:14px;
      }
      .exam-left span{display:block;font-size:12px;opacity:.8}
      .exam-center{font-weight:700}
      .exam-right{display:flex;gap:8px;align-items:center}

      .timer-pill{
        padding:6px 14px;border-radius:999px;
        font-weight:800;font-size:13px;
        background:#e0edff;color:#1d4ed8;
      }

      .option-box{
  display:flex;
  align-items:center;
  gap:16px;
  padding:16px 18px;
  margin-bottom:14px;
  border:1.5px solid #e5e7eb;
  border-radius:16px;
  background:#fff;
  cursor:pointer;
  transition:all .2s ease;
}

.option-box strong{
  width:38px;
  height:38px;
  border-radius:50%;
  background:#f1f5f9;
  color:#475569;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:700;
  font-size:15px;
}

/* Selected (blue border like image) */
.option-box.selected{
  border:2px solid #1d4ed8;
  background:#ffffff;
}

.option-box.selected strong{
  background:#1d4ed8;
  color:#fff;
}

/* Correct / Incorrect (after check) */
.option-box.correct{
  border-color:#22c55e;
  background:#f0fdf4;
}

.option-box.incorrect{
  border-color:#ef4444;
  background:#fef2f2;
}


      /* ===== FIXED BOTTOM BUTTON BAR ===== */
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
  /* FIX Bootstrap override for light buttons */
.bottom-action-inner .btn-light{
  border-radius:12px !important;
  border:1.5px solid #d1d5db !important;
  background:#ffffff !important;
  color:#111827;
}

.bottom-action-inner .btn-light:hover{
  background:#f9fafb !important;
}
/* FIX disabled state border loss (FIRST & LAST QUESTION) */
.bottom-action-inner .btn-light:disabled,
.bottom-action-inner .btn-light.disabled{
  border-radius:12px !important;
  border:1.5px solid #d1d5db !important;
  background:#ffffff !important;
  color:#9ca3af !important;
  opacity:1 !important;   /* stop bootstrap fade */
}


      .mcq-viewer{
        padding-bottom:100px;
      }
      @media (max-width:600px){
        .exam-topbar{margin-left:-12px;margin-right:-12px}
        .option-box{padding:12px 14px}
        .option-box strong{min-width:32px;height:32px;font-size:13px}
      }
      `}</style>

      {/* ================= YEAR LIST ================= */}
      {viewMode === "years" && (
        <>
          <h5>Physics Previous Year Questions</h5>
          <div className="small text-muted mb-2">{attemptedCount} attempted</div>

          <div className="pyq-list">
            {years.map((y, i) => {
              const total = getTotalQuestions(y);
              const attempted = getAttemptedQuestions(y);
              return (
                <div key={i} className="pyq-row" onClick={() => openYearQuestions(y)}>
                  <div className="pyq-left">
                    <div className="pyq-year">{y.key}</div>
                    <div>
                      <div style={{ fontWeight: 700 }}>{y.year}</div>
                      <div className="pyq-small">Previous Year Questions</div>
                    </div>
                  </div>
                  <div>
                    <div className="pyq-progress">{attempted}/{total}</div>
                    <div className="pyq-small">Total {total} • Attempted {attempted}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ================= MCQ VIEWER ================= */}
      {viewMode === "viewer" && yearQuestions.length > 0 && (
        <div className="mcq-viewer">
          <div className="exam-topbar">
            <div className="exam-left">
              <strong>Jharkhand D2D</strong>
              <span>Physics – PYQ</span>
            </div>
            <div className="exam-center">
              Q {currentIndex + 1} / {yearQuestions.length}
            </div>
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
            const isChecked = checked[qid];
            const isCorrect = yearQuestions[currentIndex].correctIndex === idx;
            const isSelected = selectedAnswers[qid] === idx;

            let cls = "option-box";
            if (!isChecked && isSelected) cls += " selected";
            if (isChecked && isCorrect) cls += " correct";
            if (isChecked && isSelected && !isCorrect) cls += " incorrect";

            return (
              <div key={idx} className={cls} onClick={() => handleSelectOption(qid, idx)}>
                <strong>{String.fromCharCode(65 + idx)}</strong>
                {opt}
              </div>
            );
          })}
        </div>
      )}

      {/* ===== FIXED BOTTOM BUTTONS ===== */}
      {viewMode === "viewer" && yearQuestions.length > 0 && (
       <div className="bottom-action-bar">
  <div className="bottom-action-inner">
    <Button
      variant="light"
      onClick={goPrevious}
      disabled={currentIndex === 0}
    >
      Previous
    </Button>

    <Button
      variant="primary"
      onClick={handleCheckAnswer}
      disabled={
        isDisabled ||
        selectedAnswers[yearQuestions[currentIndex].id] === undefined
      }
      style={{ minWidth: 160 }}
    >
      Check Answer
    </Button>

    <Button
      variant="light"
      onClick={goNext}
      disabled={currentIndex === yearQuestions.length - 1}
    >
      Next
    </Button>
  </div>
</div>

      )}
    </div>
  );
}

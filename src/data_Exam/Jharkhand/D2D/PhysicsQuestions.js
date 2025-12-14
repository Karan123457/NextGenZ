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

  function handleSelectOption(qid, optionIndex) {
    if (isDisabled) return;
    setSelectedAnswers(prev => ({ ...prev, [qid]: optionIndex }));
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

      {/* ===== SHARED PYQ YEAR LIST STYLES (SAME AS CHEMISTRY) ===== */}
      <style>{`
      .pyq-list{display:flex;flex-direction:column;gap:10px}
      .pyq-row{display:flex;justify-content:space-between;align-items:center;
        background:#f9fbff;border-radius:14px;padding:12px;
        cursor:pointer;transition:.2s}
      .pyq-row:hover{background:#eef3ff;transform:translateY(-1px)}
      .pyq-left{display:flex;gap:12px;align-items:center}
      .pyq-year{width:42px;height:42px;border-radius:12px;background:#eef3ff;
        display:flex;align-items:center;justify-content:center;
        font-weight:800;color:#2563eb}
      .pyq-progress{font-weight:800;color:#2563eb;text-align:right}
      .pyq-small{font-size:11px;color:#6b7280;margin-top:3px;text-align:right}

      /* ===== EXAM VIEW ===== */
      .exam-topbar1{
        display:flex;justify-content:center;
        background:#0f172a;color:#fff;
        width:100vw;margin-left:calc(-50vw + 50%);
        padding:12px 0;font-weight:800;
      }
      .exam-topbar2{
        display:flex;justify-content:space-between;
        align-items:center;
        background:#fff;width:100vw;
        margin-left:calc(-50vw + 50%);
        padding:10px 14px;
        border-bottom:1px solid #e5e7eb;
      }
      .timer-pill{
        padding:6px 14px;border-radius:999px;
        font-weight:800;font-size:13px;
        background:#eef2ff;color:#1d4ed8;
      }
      .exam-question{
        background:#fff;border-radius:14px;
        padding:16px;margin:14px 0;font-weight:600;
      }
      .exam-option{
        display:flex;gap:12px;
        align-items:center;
        border:1px solid #e5e7eb;
        border-radius:12px;
        padding:12px;margin-bottom:10px;
        cursor:pointer;
      }
      .exam-option.selected{background:#eef3ff;border-color:#2563eb}
      .exam-option.correct{background:#dcfce7;border-color:#22c55e}
      .exam-option.incorrect{background:#fee2e2;border-color:#ef4444}
      .exam-label{
        width:32px;height:32px;border-radius:8px;
        background:#e5e7eb;
        display:flex;align-items:center;justify-content:center;
        font-weight:700;
      }
      `}</style>

      {/* ===== YEAR LIST ===== */}
      {viewMode === "years" && (
        <>
          <h5>Physics Previous Year Questions</h5>
          <div className="small text-muted mb-2">
            {attemptedCount} attempted
          </div>

          <div className="pyq-list">
            {years.map((y, i) => {
              const total = getTotalQuestions(y);
              const attempted = getAttemptedQuestions(y);

              return (
                <div
                  key={i}
                  className="pyq-row"
                  onClick={() => openYearQuestions(y)}
                >
                  <div className="pyq-left">
                    <div className="pyq-year">{y.key}</div>
                    <div>
                      <div style={{ fontWeight: 700 }}>{y.year}</div>
                      <div className="pyq-small">Previous Year Questions</div>
                    </div>
                  </div>

                  <div>
                    <div className="pyq-progress">{attempted}/{total}</div>
                    <div className="pyq-small">
                      Total {total} • Attempted {attempted}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ===== EXAM VIEW ===== */}
      {viewMode === "viewer" && yearQuestions.length > 0 && (
        <>
          <div className="exam-topbar1">Jharkhand D2D &gt; Physics</div>

          <div className="exam-topbar2">
            <strong>Q {currentIndex + 1} / {yearQuestions.length}</strong>
            <div style={{ display: "flex", gap: 10 }}>
              <div className="timer-pill">⏱ {formatTime(timeLeft)}</div>
              <Button size="sm" variant="outline-dark" onClick={backToYears}>✕</Button>
            </div>
          </div>

          <div className="exam-question">
            {yearQuestions[currentIndex].text}
          </div>

          {yearQuestions[currentIndex].options.map((opt, idx) => {
            const qid = yearQuestions[currentIndex].id;
            const isChecked = checked[qid];
            const isCorrect = yearQuestions[currentIndex].correctIndex === idx;
            const isSelected = selectedAnswers[qid] === idx;

            let cls = "exam-option";
            if (!isChecked && isSelected) cls += " selected";
            if (isChecked && isCorrect) cls += " correct";
            if (isChecked && isSelected && !isCorrect) cls += " incorrect";

            return (
              <div
                key={idx}
                className={cls}
                onClick={() => handleSelectOption(qid, idx)}
              >
                <div className="exam-label">
                  {String.fromCharCode(65 + idx)}
                </div>
                {opt}
              </div>
            );
          })}

          <div className="d-flex justify-content-between mt-3">
            <Button onClick={goPrevious} disabled={currentIndex === 0}>Previous</Button>
            <Button onClick={handleCheckAnswer} disabled={isDisabled}>Check Answer</Button>
            <Button onClick={goNext} disabled={currentIndex === yearQuestions.length - 1}>Next</Button>
          </div>
        </>
      )}
    </div>
  );
}

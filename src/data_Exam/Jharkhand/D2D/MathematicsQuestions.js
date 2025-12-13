// MathematicsQuestions.js
import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";

/* ================= DATA ================= */
export const mathematicsQuestionsByYear = {
  "2025 Questions": [
    { id: "2025-q1", text: "Calculus basic?", options: ["A","B","C","D"], correctIndex: 0 },
    { id: "2025-q2", text: "Algebra question?", options: ["A","B","C","D"], correctIndex: 0 },
  ],
  "2024 Questions": [
    { id: "2024-q1", text: "Trigonometry?", options: ["A","B","C","D"], correctIndex: 0 },
  ],
};

/* ================= COMPONENT ================= */
export default function MathematicsQuestions() {

  const years = [
    { year: "All Previous Year Questions", key: "ALL" },
    { year: "2025 Questions", key: "2025" },
    { year: "2024 Questions", key: "2024" },
    { year: "2023 Questions", key: "2023" },
    { year: "2022 Questions", key: "2022" },
    { year: "2021 Questions", key: "2021" },
  ];

  const questionsByYear = mathematicsQuestionsByYear;

  const QUESTION_TIME_SECONDS = 60;
  const timerRef = useRef(null);

  const [selectedYear, setSelectedYear] = useState(null);
  const [yearQuestions, setYearQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checked, setChecked] = useState({});
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_SECONDS);
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

  /* ================= FUNCTIONS ================= */
  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(0);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => prev + 1);
    }, 1000);
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function openYearQuestions(yearObj) {
    let qs = [];

    if (yearObj.key === "ALL") {
      Object.values(questionsByYear).forEach(arr => {
        qs = qs.concat(arr);
      });
    } else {
      qs = questionsByYear[yearObj.year] || [];
    }

    setYearQuestions(qs);
    setCurrentIndex(0);
    setViewMode("viewer");
    setSelectedYear(yearObj);

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
    setSelectedYear(null);
    setYearQuestions([]);
    setCurrentIndex(0);
    timerRef.current && clearInterval(timerRef.current);
  }

  const attemptedCount = yearQuestions.filter(q => checked[q.id]).length;

  /* ================= UI ================= */
  return (
    <div className="physics-box">

      {/* ================= PYQ UI STYLES ================= */}
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

      .option-box{border:1px solid #e5e7eb;border-radius:12px;padding:12px;margin-bottom:10px;cursor:pointer}
      .option-box.selected{background:#eef3ff}
      .option-box.correct{background:#dcfce7;border-color:#22c55e}
      .option-box.incorrect{background:#fee2e2;border-color:#ef4444}
      .timer-pill{background:#eef3ff;padding:6px 12px;border-radius:999px;font-weight:700}
      `}</style>

      <h5>Mathematics Previous Year Questions</h5>
      <div className="small text-muted mb-2">{attemptedCount} attempted</div>

      {/* ================= YEAR SELECTION (PYQ UI) ================= */}
      {viewMode === "years" && (
        <div className="pyq-list">
          {years.map((y, i) => {
            let total = 0;

            if (y.key === "ALL") {
              Object.values(questionsByYear).forEach(arr => total += arr.length);
            } else {
              total = questionsByYear[y.year]?.length || 0;
            }

            const attempted = Object.keys(checked).filter(k =>
              checked[k] &&
              (y.key === "ALL"
                ? true
                : questionsByYear[y.year]?.some(q => q.id === k))
            ).length;

            return (
              <div
                key={i}
                className="pyq-row"
                onClick={() => openYearQuestions(y)}
                role="button"
                tabIndex={0}
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
      )}

      {/* ================= MCQ VIEWER ================= */}
      {viewMode === "viewer" && yearQuestions.length > 0 && (
        <div className="mcq-viewer">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <strong>{selectedYear.year.replace(" Questions", "")}</strong><br/>
              Question {currentIndex + 1} / {yearQuestions.length}
            </div>
            <div className="d-flex gap-2">
              <div className="timer-pill">⏱ {formatTime(timeLeft)}</div>
              <Button size="sm" variant="outline-secondary" onClick={backToYears}>
                ← Back
              </Button>
            </div>
          </div>

          <div className="mb-3 fw-bold">
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
              <div
                key={idx}
                className={cls}
                onClick={() => handleSelectOption(qid, idx)}
              >
                <strong>{String.fromCharCode(65 + idx)}.</strong> {opt}
              </div>
            );
          })}

          <div className="d-flex justify-content-between mt-3">
            <Button onClick={goPrevious} disabled={currentIndex === 0}>
              Previous
            </Button>
            <Button
              onClick={handleCheckAnswer}
              disabled={
                isDisabled ||
                selectedAnswers[yearQuestions[currentIndex].id] === undefined
              }
            >
              Check Answer
            </Button>
            <Button
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

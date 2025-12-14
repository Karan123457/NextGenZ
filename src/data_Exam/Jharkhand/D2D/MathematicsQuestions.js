// MathematicsQuestions.js
import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";

/* ================= DATA ================= */
export const mathematicsQuestionsByYear = {
  "2025 Questions": [
    { id: "2025-q1", text: "Alkali metal from the following with least melting point is", options: ["Na","Cs","K","Rb"], correctIndex: 0 },
    { id: "2025-q2", text: "Lime reacts exothermally with water to give ‘
’ which has low solubility in water. Aqueous solution of ‘
’ is often used for the test of 
, a test in which insoluble 
 is formed. If 
 is further reacted with 
 then soluble compound is formed. ‘A
' is", options: ["Quick lime ","Lime water","Slaked lime","White lime"], correctIndex: 0 },
  ],
  "2024 Questions": [
    { id: "2024-q1", text: "Trigonometry?", options: ["A","B","C","D"], correctIndex: 0 },
  ],
};

/* ================= COMPONENT ================= */
export default function MathematicsQuestions({ setFocusMode }) {


  const years = [
    { year: "All Previous Year Questions", key: "ALL" },
    { year: "2025 Questions", key: "2025" },
    { year: "2024 Questions", key: "2024" },
    { year: "2023 Questions", key: "2023" },
    { year: "2022 Questions", key: "2022" },
    { year: "2021 Questions", key: "2021" },
  ];

  const questionsByYear = mathematicsQuestionsByYear;
  const timerRef = useRef(null);

  const [selectedYear, setSelectedYear] = useState(null);
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
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function openYearQuestions(yearObj) {
    let qs = [];

    if (yearObj.key === "ALL") {
      Object.values(questionsByYear).forEach(arr => qs = qs.concat(arr));
    } else {
      qs = questionsByYear[yearObj.year] || [];
    }

    setYearQuestions(qs);
    setCurrentIndex(0);
    setViewMode("viewer");
setSelectedYear(yearObj);
setFocusMode(true); // ✅ HIDE UPPER PART


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
setSelectedYear(null);
setYearQuestions([]);
setCurrentIndex(0);
setFocusMode(false); // ✅ SHOW UPPER PART

    timerRef.current && clearInterval(timerRef.current);
  }

  const attemptedCount = yearQuestions.filter(q => checked[q.id]).length;

  /* ================= UI ================= */
  return (
    <div className="physics-box">
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

     .exam-topbar{
  display:flex;
  justify-content:space-between;
  align-items:center;
  background:#0f172a;
  color:#fff;

  /* 🔥 REMOVE SIDE MARGIN */
  margin-left:-16px;
  margin-right:-16px;

  padding:10px 14px;
  margin-bottom:14px;

  /* FULL BLEED LOOK */
  border-radius:0;
}

      .exam-left span{display:block;font-size:12px;opacity:.8}
      .exam-center{font-weight:700}
      .exam-right{display:flex;gap:8px;align-items:center}

      .option-box{border:1px solid #e5e7eb;border-radius:12px;padding:12px;margin-bottom:10px;cursor:pointer}
      .option-box.selected{background:#eef3ff}
      .option-box.correct{background:#dcfce7;border-color:#22c55e}
      .option-box.incorrect{background:#fee2e2;border-color:#ef4444}

      .timer-pill{padding:6px 14px;border-radius:999px;font-weight:800;
        font-size:13px;background:#e0edff;color:#1d4ed8}
      `}</style>

      {/* ================= YEAR LIST ================= */}
      {viewMode === "years" && (
        <>
          <h5>Mathematics Previous Year Questions</h5>
          <div className="small text-muted mb-2">
            {attemptedCount} attempted
          </div>

          <div className="pyq-list">
            {years.map((y, i) => {
              let total = 0;
              if (y.key === "ALL") {
                Object.values(questionsByYear).forEach(arr => total += arr.length);
              } else {
                total = questionsByYear[y.year]?.length || 0;
              }

              const attempted = Object.keys(checked).filter(
                k =>
                  checked[k] &&
                  (y.key === "ALL" ||
                    questionsByYear[y.year]?.some(q => q.id === k))
              ).length;

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

      {/* ================= MCQ VIEWER ================= */}
      {viewMode === "viewer" && yearQuestions.length > 0 && (
        <div className="mcq-viewer">
          <div className="exam-topbar">
            <div className="exam-left">
              <strong>Jharkhand D2D</strong>
              <span>
                Mathematics – {selectedYear?.key === "ALL"
                  ? "All PYQ"
                  : `${selectedYear?.year.replace(" Questions", "")} Qs`}
              </span>
            </div>

            <div className="exam-center">
              Q {currentIndex + 1} / {yearQuestions.length}
            </div>

            <div className="exam-right">
              <div className="timer-pill">⏱ {formatTime(timeLeft)}</div>
              <Button size="sm" variant="light" onClick={backToYears}>✕</Button>
            </div>
          </div>

          <div className="fw-bold mb-3">
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
                <strong>{String.fromCharCode(65 + idx)}.</strong> {opt}
              </div>
            );
          })}

          <div className="d-flex justify-content-between mt-3">
            <Button onClick={goPrevious} disabled={currentIndex === 0}>Previous</Button>
            <Button
              onClick={handleCheckAnswer}
              disabled={isDisabled || selectedAnswers[yearQuestions[currentIndex].id] === undefined}
            >
              Check Answer
            </Button>
            <Button onClick={goNext} disabled={currentIndex === yearQuestions.length - 1}>Next</Button>
          </div>
        </div>
      )}
    </div>
  );
}



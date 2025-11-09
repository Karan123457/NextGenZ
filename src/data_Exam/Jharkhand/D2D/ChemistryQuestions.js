// ChemistryQuestions.js
import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";

export const chemistryQuestionsByYear = {
  "2025 Questions": [
    { id: "2025-q1", text: "Atomic number of Carbon?", options: ["6","12","14","8"], correctIndex: 0 },
    { id: "2025-q2", text: "Define molarity.", options: ["Moles per liter","Mass per liter","Moles per kg","Mass per kg"], correctIndex: 0 },
    { id: "2025-q3", text: "Le Chatelier's Principle?", options: ["Equilibrium shifts to counter change","Reaction stops","Temperature constant","No effect"], correctIndex: 0 },
    { id: "2025-q4", text: "IUPAC name of H2SO4?", options: ["Sulfuric acid","Sulfurous acid","Hydrosulfuric acid","Sulfur acid"], correctIndex: 0 },
    { id: "2025-q5", text: "Ionic bonding?", options: ["Transfer of electrons","Sharing of electrons","No bonding","Covalent"], correctIndex: 0 },
    { id: "2025-q6", text: "Molar mass of NaCl?", options: ["58.44 g/mol","22.99 g/mol","35.45 g/mol","40 g/mol"], correctIndex: 0 },
  ],
  "2024 Questions": [
    { id: "2024-q1", text: "Water formula?", options: ["H2O","HO2","OH2","H2O2"], correctIndex: 0 },
    { id: "2024-q2", text: "pH of neutral solution?", options: ["7","0","14","1"], correctIndex: 0 },
    { id: "2024-q3", text: "What is NaCl?", options: ["Salt","Sugar","Acid","Base"], correctIndex: 0 },
  ],
};

export default function ChemistryQuestions({ backToYearList }) {
  const years = [
    { year: "All Previous Year Questions", key: "all" },
    { year: "2025 Questions", key: "2025" },
    { year: "2024 Questions", key: "2024" },
    { year: "2023 Questions", key: "2023" },
    { year: "2022 Questions", key: "2022" },
    { year: "2021 Questions", key: "2021" },
  ];

  // questions are defined at module level in `chemistryQuestionsByYear`

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

  useEffect(() => {
    if (viewMode === "viewer" && yearQuestions.length > 0) {
      startTimer();
      const qid = yearQuestions[currentIndex].id;
      setIsDisabled(Boolean(checked[qid]));
    }
  }, [currentIndex, viewMode, yearQuestions, checked]);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(0);
    timerRef.current = setInterval(() => setTimeLeft((prev) => prev + 1), 1000);
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function openYearQuestions(yearObj) {
    const qs = chemistryQuestionsByYear[yearObj.year] || [];
    setYearQuestions(qs);
    setCurrentIndex(0);
    setViewMode("viewer");
    setSelectedYear(yearObj);

    setChecked((prev) => {
      const next = { ...prev };
      qs.forEach((q) => { if (next[q.id] === undefined) next[q.id] = false; });
      return next;
    });
  }

  function handleSelectOption(qid, optionIndex) {
    if (isDisabled) return;
    setSelectedAnswers((prev) => ({ ...prev, [qid]: optionIndex }));
  }

  function handleCheckAnswer() {
    const q = yearQuestions[currentIndex];
    if (!q) return;
    setChecked((prev) => ({ ...prev, [q.id]: true }));
    setIsDisabled(true);
    if (timerRef.current) clearInterval(timerRef.current);
  }

  function goNext() {
    if (currentIndex < yearQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setIsDisabled(false);
      const nextQ = yearQuestions[currentIndex + 1];
      if (nextQ && checked[nextQ.id]) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsDisabled(true);
      }
    }
  }

  function goPrevious() {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setIsDisabled(false);
      const prevQ = yearQuestions[currentIndex - 1];
      if (prevQ && checked[prevQ.id]) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsDisabled(true);
      }
    }
  }

  function backToYears() {
    setViewMode("years");
    setSelectedYear(null);
    setYearQuestions([]);
    setCurrentIndex(0);
    if (timerRef.current) clearInterval(timerRef.current);
  }

  // calculate attempted
  const attemptedCount = yearQuestions.filter(q => checked[q.id]).length;

  return (
    <div className="physics-box">
      <h5 className="section-title">Chemistry Previous Year Questions</h5>
      <div className="small text-muted mb-2">{attemptedCount} attempted</div>

      {viewMode === "years" && (
        <div className="year-list">
          {years.map((y, i) => {
            const total = chemistryQuestionsByYear[y.year]?.length || 0;
            const attempted = Object.keys(checked).filter(k => checked[k] && chemistryQuestionsByYear[y.year]?.some(q => q.id === k)).length;
            return (
              <div
                key={i}
                className={`year-card ${selectedYear?.year === y.year ? "active" : ""}`}
                onClick={() => openYearQuestions(y)}
              >
                <span className="year-label">{y.year}</span>
                <span className="year-info">
                  Total {total} | Attempted {attempted}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {viewMode === "viewer" && yearQuestions.length > 0 && (
        <div className="mcq-viewer">
          <div className="mcq-header" style={{ marginBottom: "1rem" }}>
            <div>
              <div className="mcq-year">{selectedYear.year.replace(" Questions", "")}</div>
              <div className="mcq-qnum">Question {currentIndex + 1} / {yearQuestions.length}</div>
              
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div className="timer-pill">⏱ {formatTime(timeLeft)}</div>
              <Button variant="outline-secondary" size="sm" onClick={backToYears}>← Back to Years</Button>
            </div>
          </div>

          <div className="question-text">{yearQuestions[currentIndex].text}</div>

          <div>
            {yearQuestions[currentIndex].options.map((opt, idx) => {
              const qid = yearQuestions[currentIndex].id;
              const userSel = selectedAnswers[qid];
              const isChecked = Boolean(checked[qid]);
              const isCorrect = yearQuestions[currentIndex].correctIndex === idx;
              const isSelected = userSel === idx;

              let classNames = "option-box";
              if (!isChecked && isSelected) classNames += " selected";
              if (isChecked && isCorrect) classNames += " correct";
              if (isChecked && isSelected && !isCorrect) classNames += " incorrect";

              return (
                <div
                  key={idx}
                  className={classNames}
                  onClick={() => handleSelectOption(qid, idx)}
                  role="button"
                  aria-pressed={isSelected}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "6px" }}
                >
                  <div><strong>{String.fromCharCode(65 + idx)}.</strong> &nbsp; {opt}</div>
                  {isChecked && isCorrect && <div style={{ fontWeight: 700 }}>✅ Correct</div>}
                  {isChecked && !isCorrect && isSelected && <div style={{ fontWeight: 700 }}>❌ Incorrect</div>}
                </div>
              );
            })}
          </div>

          <div className="mcq-footer">
            <div className="mcq-controls">
              <Button variant="light" onClick={goPrevious} disabled={currentIndex === 0} style={{ fontWeight: 700 }}>Previous</Button>
              <Button variant="primary" onClick={handleCheckAnswer} disabled={isDisabled || selectedAnswers[yearQuestions[currentIndex].id] === undefined} style={{ fontWeight: 700 }}>Check Answer</Button>
              <Button variant="light" onClick={goNext} disabled={currentIndex === yearQuestions.length - 1} style={{ fontWeight: 700 }}>Next</Button>
            </div>
          </div>
        </div>
      )}

      {viewMode === "viewer" && yearQuestions.length === 0 && (
        <div className="question-list">No questions available for {selectedYear.year}.</div>
      )}
    </div>
  );
}

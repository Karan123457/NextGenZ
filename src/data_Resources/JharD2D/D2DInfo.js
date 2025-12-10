import React from "react";

const D2DExam = () => {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)",
        borderRadius: "20px",
        padding: "1px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        color: "#212529",
        fontFamily: "'Segoe UI', sans-serif",
        lineHeight: 1.7,
        maxWidth: "1000px",
        margin: "auto",
      }}
    >
      {/* 🔹 Header */}
      <h2
        style={{
          color: "#0d6efd",
          marginTop: "40px",
          marginBottom: "14px",
          fontWeight: 700,
          textAlign: "center",
          fontSize: "1.5rem",
          lineHeight: "1.3",
        }}
      >
        Jharkhand D2D Exam Information (B.Tech Lateral Entry)
      </h2>

      {/* 🔸 Intro */}
      <p
        style={{
          textAlign: "left",
          fontSize: "0.95rem",
          color: "#495057",
          marginBottom: "25px",
        }}
      >
        Jharkhand D2D Exam (Diploma to Degree) JCECEB द्वारा आयोजित की जाती है। यह परीक्षा
        Polytechnic Diploma छात्रों को B.Tech में सीधे 2nd Year में admission दिलाने के लिए होती है।
      </p>

      {/* 🔹 Exam Highlights */}
      <div
        style={{
          background: "linear-gradient(135deg, #e6f7ff, #ffffff)",
          border: "2px solid #0d6efd",
          borderRadius: "16px",
          padding: "25px",
          marginBottom: "25px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        }}
      >
        <h3
          style={{
            color: "#0d6efd",
            marginBottom: "15px",
            fontWeight: 700,
            fontSize: "1.1rem",
          }}
        >
          Exam Highlights:
        </h3>
        <ul
          style={{
            margin: 0,
            paddingLeft: "0.1px",
            fontSize: "0.80rem",
            color: "#333",
          }}
        >
          <li><b>Exam Name:</b> Diploma to Degree (D2D) Entrance Exam</li>
          <li><b>Conducting Body:</b> Jharkhand Combined Entrance Competitive Examination Board (JCECEB)</li>
          <li><b>Exam Level:</b> State-Level Entrance Exam</li>
          <li><b>Course:</b> Direct 2nd Year B.Tech Admission</li>
          <li><b>Exam Duration:</b> 2 Hours 30 Minutes</li>
          <li><b>Exam Mode:</b> Offline (OMR Based)</li>
          <li><b>Negative Marking:</b> –0.25 per wrong answer</li>
        </ul>
      </div>

      {/* 🔹 Eligibility */}
      <div
        style={{
          background: "linear-gradient(135deg, #fff8e6, #ffffff)",
          border: "2px solid #ffc107",
          borderRadius: "16px",
          padding: "25px",
          marginBottom: "25px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        }}
      >
        <h3
          style={{
            color: "#ffb300",
            marginBottom: "15px",
            fontWeight: 700,
            fontSize: "1.1rem",
          }}
        >
          Eligibility Criteria:
        </h3>
        <ul
          style={{
            paddingLeft: "0.1px",
            color: "#333",
            fontSize: "0.80rem",
          }}
        >
          <li>Candidate must have a <b>Diploma in Engineering/Technology</b>.</li>
          <li>Candidate must be a <b>domicile of Jharkhand</b>.</li>
          <li>Minimum Marks: <b>50%</b> in Diploma final year.</li>
          <li>No upper age limit.</li>
        </ul>
      </div>

      {/* 🔹 Exam Pattern */}
      <div
        style={{
          background: "linear-gradient(135deg, #e6ffe6, #ffffff)",
          border: "2px solid #198754",
          borderRadius: "16px",
          padding: "25px",
          marginBottom: "25px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        }}
      >
        <h3
          style={{
            color: "#198754",
            marginBottom: "15px",
            fontWeight: 700,
            fontSize: "1.1rem",
          }}
        >
          Exam Pattern (Single Paper – 3 Sections)
        </h3>

        {/* Short explanation */}
        <p
          style={{
            color: "#333",
            marginBottom: "10px",
            fontSize: "0.80rem",
            paddingLeft: "1px",
          }}
        >
          D2D Exam में केवल <b>एक ही Question Paper</b> होता है जिसमें तीन sections होते हैं –
          <b> Physics, Chemistry</b> और <b>Mathematics</b>. सभी questions objective type (MCQ) होते हैं।
        </p>

        {/* Key Pattern Points */}
        <ul
          style={{
            paddingLeft: "16px",
            marginBottom: "18px",
            color: "#333",
            fontSize: "0.80rem",
          }}
        >
          <li><b>Total Questions:</b> 150</li>
          <li><b>Total Marks:</b> 150</li>
          <li><b>Question Type:</b> Objective Type (MCQ)</li>
          <li><b>Duration:</b> 2 Hours 30 Minutes</li>
          <li><b>Medium of Exam:</b> आमतौर पर <b>Hindi &amp; English</b></li>
        </ul>

        {/* Subject-wise Distribution Table */}
        <h4
          style={{
            fontSize: "0.85rem",
            fontWeight: 700,
            marginBottom: "8px",
            color: "#198754",
          }}
        >
          Subject-wise Question &amp; Marks Distribution:
        </h4>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
            fontSize: "0.80rem",
          }}
        >
          <thead style={{ background: "#198754", color: "#fff" }}>
            <tr>
              <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>Section</th>
              <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>No. of Questions</th>
              <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>Marks</th>
            </tr>
          </thead>
          <tbody>
            {["Physics", "Chemistry", "Mathematics"].map((sub, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#f8f9fa" : "#fff" }}>
                <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{sub}</td>
                <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>50</td>
                <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>50</td>
              </tr>
            ))}
            <tr style={{ background: "#e9ffe9", fontWeight: "bold" }}>
              <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>Total</td>
              <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>150</td>
              <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>150 Marks</td>
            </tr>
          </tbody>
        </table>

        {/* Marking Scheme */}
        <p
          style={{
            marginTop: "15px",
            color: "#555",
            fontSize: "0.80rem",
            paddingLeft: "0.5px",
          }}
        >
          <b>Marking Scheme:</b> <br />
          ✅ Correct Answer: <b>+1 Mark</b> <br />
          ❌ Wrong Answer: <b>–0.25 Mark</b> (Negative Marking) <br />
          🔸 Unattempted Question: <b>0 Mark</b>
        </p>
      </div>

      {/* 🔹 Final Note */}
      <p
        style={{
          textAlign: "left",
          fontSize: "0.95rem",
          color: "#495057",
          marginTop: "20px",
        }}
      >
        Jharkhand D2D Exam हर साल <b>May–June</b> में होती है। यह Polytechnic Diploma छात्रों
        के लिए B.Tech 2nd Year का gateway है।
      </p>

      {/* ✅ Footer */}
      <p
        style={{
          fontSize: "0.75rem",
          color: "#777",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        Last Updated: December 2025
      </p>

      <p
        style={{
          fontSize: "0.7rem",
          color: "#999",
          textAlign: "center",
          marginTop: "2px",
        }}
      >
        All information is for educational purposes only and based on previous year data. We do not claim official ownership.
      </p>
    </div>
  );
};

export default D2DExam;


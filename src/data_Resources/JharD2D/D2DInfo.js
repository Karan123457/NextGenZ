import React from "react";

const D2DExam = () => {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)",
        borderRadius: "20px",
        padding: "35px",
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
          marginBottom: "14px",
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        🎓 Jharkhand D2D Exam Information <br/>BTech (Laterl Entry)
      </h2>

      {/* 🔸 Intro */}
      <p
        style={{
          textAlign: "center",
          fontSize: "1.05rem",
          color: "#495057",
          marginBottom: "25px",
        }}
      >
        Jharkhand D2D Exam (Diploma to Degree) JCECEB द्वारा आयोजित की जाती है,  
        जो Polytechnic Diploma छात्रों को B.Tech में सीधे 2nd Year में प्रवेश दिलाने के लिए होती है।  
        परीक्षा <b>Single Paper – 3 Sections</b> में ली जाती है।
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
            fontSize: "1.3rem",
          }}
        >
          📘 Exam Highlights:
        </h3>
        <ul
          style={{
            margin: 0,
            paddingLeft: "22px",
            fontSize: "1rem",
            color: "#333",
          }}
        >
          <li>📅 <b>Exam Name:</b> Diploma to Degree (D2D) Entrance Exam</li>
          <li>🏛️ <b>Conducting Body:</b> Jharkhand Combined Entrance Competitive Examination Board (JCECEB)</li>
          <li>🧭 <b>Exam Level:</b> State-Level Entrance Exam</li>
          <li>📚 <b>Eligible Courses:</b> Direct 2nd Year B.Tech Admission</li>
          <li>🕘 <b>Exam Duration:</b> 2 Hours 30 Minutes</li>
          <li>📝 <b>Exam Mode:</b> Offline (OMR Based)</li>
          <li>⚠️ <b>Negative Marking:</b> 0.25 per wrong answer</li>
        </ul>
      </div>

      {/* 🔹 Eligibility Criteria */}
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
            fontSize: "1.3rem",
          }}
        >
          🧾 Eligibility Criteria:
        </h3>
        <ul style={{ paddingLeft: "22px", color: "#333" }}>
          <li>📖 Candidate must have a <b>Diploma in Engineering/Technology</b> from a recognized Polytechnic Board.</li>
          <li>🏠 Candidate must be a <b>domicile of Jharkhand</b>.</li>
          <li>🎯 Minimum Marks: 50% in Diploma final year.</li>
          <li>🧒 Age Limit: No upper age limit.</li>
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
            fontSize: "1.3rem",
          }}
        >
          🧮 Exam Pattern (Single Paper – 3 Sections)
        </h3>
        <p style={{ color: "#333", marginBottom: "15px" }}>
          D2D Exam में केवल <b>एक ही question paper</b> होता है जिसमें तीन sections होते हैं –  
          <b>Physics, Chemistry, Mathematics</b>. हर section में 50 questions होते हैं,  
          यानी कुल <b>150 objective-type questions</b>.
        </p>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
            fontSize: "1rem",
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
            {["Physics", "Chemistry", "Mathematics"].map((sub, index) => (
              <tr key={index} style={{ background: index % 2 !== 0 ? "#f8f9fa" : "transparent" }}>
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

        <p style={{ marginTop: "15px", color: "#555" }}>
          ✅ Correct Answer: +1 Mark &nbsp; | &nbsp; ❌ Wrong Answer: –0.25 Mark &nbsp; | &nbsp; 🔸 Unattempted: 0 Mark
        </p>
      </div>

      {/* 🔹 Final Note */}
      <p
        style={{
          textAlign: "center",
          fontSize: "1.05rem",
          color: "#495057",
          marginTop: "20px",
        }}
      >
        💡 D2D Exam हर साल <b>May–June</b> में आयोजित की जाती है। यह Polytechnic Diploma छात्रों के लिए B.Tech 2nd Year का gateway है।
      </p>
    </div>
  );
};

export default D2DExam;

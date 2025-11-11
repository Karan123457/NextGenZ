// src/data_Resources/JharDiploma/Sem1.jsx
import React from "react";

const Sem1 = () => {
  const containerStyle = {
    background: "linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)",
    borderRadius: "20px",
    padding: "5vw",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    color: "#212529",
    fontFamily: "'Segoe UI', sans-serif",
    lineHeight: 1.7,
    maxWidth: "1000px",
    margin: "auto",
  };

  const sectionBox = (borderColor, bg) => ({
    background: bg,
    border: `2px solid ${borderColor}`,
    borderRadius: "16px",
    padding: "4vw",
    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
    marginTop: "5vw",
  });

  const tableContainer = {
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "12px",
    marginTop: "10px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
    fontSize: "clamp(0.8rem, 2.5vw, 0.95rem)",
    minWidth: "500px",
  };

  const thtd = {
    border: "1px solid #dee2e6",
    padding: "10px",
    wordBreak: "break-word",
  };

  const headingStyle = {
    color: "#0d6efd",
    marginBottom: "14px",
    fontWeight: 700,
    textAlign: "center",
    fontSize: "clamp(1.2rem, 4vw, 1.8rem)",
  };

  const paragraphStyle = {
    marginBottom: "16px",
    fontSize: "clamp(0.9rem, 3.5vw, 1rem)",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>📘 Diploma 1st Semester Jharkhand (JUT Ranchi)</h2>

      <p style={paragraphStyle}>
        This 1st Semester material has been carefully prepared to help Jharkhand Polytechnic Diploma students prepare effectively for their examinations.
        <br />
        इसमें important questions, previous year question papers, तथा important topics शामिल हैं, जिससे students को semester examinations में आने वाले pattern और topics की clear understanding मिल सके।
      </p>

      {/* Subjects Section */}
      <div style={sectionBox("#198754", "linear-gradient(135deg, #e6ffed, #ffffff)")}>
        <h4
          style={{
            color: "#198754",
            marginBottom: "15px",
            fontWeight: 600,
            fontSize: "clamp(1rem, 3.5vw, 1.2rem)",
            textAlign: "center",
          }}
        >
          📝 Subjects of 1st Semester Jharkhand (Total 4):
        </h4>

        <ul
          style={{
            margin: 0,
            paddingLeft: "20px",
            color: "#212529",
            fontSize: "clamp(0.9rem, 3vw, 1rem)",
            lineHeight: 1.7,
          }}
        >
          <li>Engineering Physics</li>
          <li>Engineering Chemistry</li>
          <li>Engineering Mathematics</li>
          <li>🔹 Mechanical Science & Engineering (Mechanical/ Metallurgy/ Automobile Branch)</li>
          <li>🔹 Basics of Electrical Power System (Electrical-EE Branch)</li>
          <li>🔹 Fundamental of Computer (Computer-CSE Branch)</li>
          <li>🔹 Electronic Component & Device (Electronic-ECE Branch)</li>
          <li>🔹 Basic Surveying (Civil Branch)</li>
        </ul>
      </div>

      <p style={{ ...paragraphStyle, marginTop: "16px" }}>
        सभी 1st Semester के छात्रों के लिए इन 4 विषयों की External Exam में उपस्थित होना अनिवार्य है।
        अंतिम परीक्षा का प्रश्नपत्र JUT Ranchi द्वारा तैयार किया जाता है।
      </p>

      {/* Question Paper Section */}
      <div style={{ marginTop: "8vw" }}>
        <h3
          style={{
            textAlign: "center",
            color: "#0d6efd",
            fontWeight: 700,
            marginBottom: "20px",
            fontSize: "clamp(1.2rem, 4vw, 1.6rem)",
          }}
        >
          📝 Previous Year Question Papers
        </h3>

        {[2024, 2023, 2022, 2021].map((year) => (
          <div
            key={year}
            style={sectionBox("#0d6efd", "linear-gradient(135deg, #e6f0ff, #ffffff)")}
          >
            <h2
              style={{
                textAlign: "center",
                color: "#0d6efd",
                fontWeight: 600,
                marginBottom: 20,
                fontSize: "clamp(1rem, 3.5vw, 1.3rem)",
              }}
            >
              {year} Question Paper 1st Semester
            </h2>

            <div style={tableContainer}>
              <table style={tableStyle}>
                <thead style={{ background: "#f1f3f5" }}>
                  <tr>
                    <th style={thtd}>Subjects</th>
                    <th style={thtd}>Year</th>
                    <th style={thtd}>Download [PDF]</th>
                  </tr>
                </thead>
                <tbody>
                  {["Engineering Mathematics", "Engineering Chemistry", "Engineering Physics"].map(
                    (sub, i) => (
                      <tr
                        key={i}
                        style={{
                          background: i % 2 !== 0 ? "#f8f9fa" : "transparent",
                        }}
                      >
                        <td style={thtd}>{sub}</td>
                        <td style={thtd}>{year}</td>
                        <td style={thtd}>
                          <a
                            href="/"
                            onClick={(e) => e.preventDefault()}
                            style={{
                              color: "#0d6efd",
                              textDecoration: "underline",
                              fontWeight: 500,
                              fontSize: "clamp(0.85rem, 3vw, 1rem)",
                            }}
                          >
                            Download [PDF]
                          </a>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sem1;

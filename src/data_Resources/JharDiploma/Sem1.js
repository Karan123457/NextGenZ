// src/data_Resources/JharDiploma/Sem1.jsx
import React from "react";

const Sem1 = () => {
  const containerStyle = {
    background: "linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)",
    borderRadius: "16px",
    padding: "4vw 5vw",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    color: "#212529",
    fontFamily: "'Segoe UI', sans-serif",
    lineHeight: 1.6,
    maxWidth: "950px",
    margin: "auto",
  };

  const sectionBox = (borderColor, bg) => ({
    background: bg,
    border: `2px solid ${borderColor}`,
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    marginTop: "18px",
  });

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
    fontSize: "clamp(0.8rem, 2.5vw, 0.95rem)",
  };

  const thtd = {
    border: "1px solid #dee2e6",
    padding: "8px 6px",
    wordBreak: "break-word",
  };

  return (
    <div style={containerStyle}>
      <h2
        style={{
          color: "#0d6efd",
          marginBottom: "12px",
          fontWeight: 700,
          textAlign: "center",
          fontSize: "clamp(1.1rem, 3.5vw, 1.6rem)",
        }}
      >
        📘 Diploma 1st Semester Jharkhand (JUT Ranchi)
      </h2>

      <p
        style={{
          marginBottom: "14px",
          fontSize: "clamp(0.85rem, 3vw, 0.95rem)",
          textAlign: "justify",
        }}
      >
        This 1st Semester material has been carefully prepared to help Jharkhand Polytechnic Diploma students prepare effectively for their examinations.
        <br />
        इसमें important questions, previous year question papers, तथा important topics शामिल हैं, जिससे students को semester examinations में आने वाले pattern और topics की clear understanding मिल सके।
      </p>

      {/* Subject Box */}
      <div
        style={sectionBox(
          "#198754",
          "linear-gradient(135deg, #e9fff0, #ffffff)"
        )}
      >
        <h4
          style={{
            color: "#198754",
            marginBottom: "12px",
            fontWeight: 600,
            fontSize: "clamp(0.95rem, 3vw, 1.1rem)",
          }}
        >
          📝 Subjects of 1st Semester Jharkhand (Total 4):
        </h4>

        <ul
          style={{
            margin: 0,
            paddingLeft: "18px",
            color: "#212529",
            fontSize: "clamp(0.85rem, 2.8vw, 0.95rem)",
            lineHeight: 1.6,
          }}
        >
          <li>Engineering Physics</li>
          <li>Engineering Chemistry</li>
          <li>Engineering Mathematics</li>
          <li>🔹Mechanical Science & Engineering (Mechanical/ Metallurgy/ Automobile)</li>
          <li>🔹Basics of Electrical Power System (Electrical - EE)</li>
          <li>🔹Fundamentals of Computer (Computer - CSE)</li>
          <li>🔹Electronic Component & Device (Electronics - ECE)</li>
          <li>🔹Basic Surveying (Civil Branch)</li>
        </ul>
      </div>

      <p
        style={{
          marginTop: "14px",
          fontSize: "clamp(0.85rem, 2.8vw, 0.95rem)",
        }}
      >
        सभी 1st Semester के छात्रों के लिए इन 4 विषयों की External Exam में उपस्थित होना अनिवार्य है। अंतिम परीक्षा का प्रश्नपत्र JUT Ranchi द्वारा तैयार किया जाता है।
      </p>

      {/* Question Paper Section */}
      <div style={{ marginTop: "30px" }}>
        <h3
          style={{
            textAlign: "center",
            color: "#0d6efd",
            fontWeight: 700,
            marginBottom: "16px",
            fontSize: "clamp(1rem, 3.5vw, 1.4rem)",
          }}
        >
          📝 Previous Year Question Papers
        </h3>

        {[2024, 2023, 2022, 2021].map((year) => (
          <div
            key={year}
            style={sectionBox("#0d6efd", "linear-gradient(135deg, #e9f1ff, #ffffff)")}
          >
            <h2
              style={{
                textAlign: "center",
                color: "#0d6efd",
                fontWeight: 600,
                marginBottom: 16,
                fontSize: "clamp(0.95rem, 3vw, 1.2rem)",
              }}
            >
              {year} Question Paper - 1st Semester
            </h2>

            <div style={{ overflowX: "auto" }}>
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
                        style={{ background: i % 2 !== 0 ? "#f8f9fa" : "transparent" }}
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
                              fontSize: "clamp(0.8rem, 2.5vw, 0.95rem)",
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


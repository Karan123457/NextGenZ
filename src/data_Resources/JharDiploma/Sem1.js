// src/data_Resources/JharDiploma/Sem1.jsx
import React from "react";

const Sem1 = () => {
  const containerStyle = {
    background: "linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)",
    borderRadius: "12px",
    padding: "3vw 4vw",
    boxShadow: "0 3px 8px rgba(0,0,0,0.06)",
    color: "#212529",
    fontFamily: "'Segoe UI', sans-serif",
    lineHeight: 1.5,
    maxWidth: "900px",
    margin: "auto",
  };

  const sectionBox = (borderColor, bg) => ({
    background: bg,
    border: `1.5px solid ${borderColor}`,
    borderRadius: "10px",
    padding: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
    marginTop: "12px",
  });

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
    fontSize: "clamp(0.78rem, 2.4vw, 0.9rem)",
  };

  const thtd = {
    border: "1px solid #dee2e6",
    padding: "6px 5px",
    wordBreak: "break-word",
  };

  return (
    <div style={containerStyle}>
      <h2
        style={{
          color: "#0d6efd",
          marginBottom: "8px",
          fontWeight: 700,
          textAlign: "center",
          fontSize: "clamp(1rem, 3vw, 1.4rem)",
        }}
      >
        📘 Diploma 1st Semester Jharkhand (JUT Ranchi)
      </h2>

      <p
        style={{
          marginBottom: "10px",
          fontSize: "clamp(0.8rem, 2.8vw, 0.9rem)",
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
          "linear-gradient(135deg, #edfff2, #ffffff)"
        )}
      >
        <h4
          style={{
            color: "#198754",
            marginBottom: "8px",
            fontWeight: 600,
            fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
          }}
        >
          📝 Subjects of 1st Semester Jharkhand (Total 4):
        </h4>

        <ul
          style={{
            margin: 0,
            paddingLeft: "16px",
            color: "#212529",
            fontSize: "clamp(0.8rem, 2.4vw, 0.9rem)",
            lineHeight: 1.5,
          }}
        >
          <li>Engineering Physics</li>
          <li>Engineering Chemistry</li>
          <li>Engineering Mathematics</li>
          <li>🔹Mechanical Science & Engineering (Mechanical / Metallurgy / Automobile)</li>
          <li>🔹Basics of Electrical Power System (Electrical - EE)</li>
          <li>🔹Fundamentals of Computer (Computer - CSE)</li>
          <li>🔹Electronic Component & Device (Electronics - ECE)</li>
          <li>🔹Basic Surveying (Civil Branch)</li>
        </ul>
      </div>

      <p
        style={{
          marginTop: "10px",
          fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
        }}
      >
        सभी 1st Semester के छात्रों के लिए इन 4 विषयों की External Exam में उपस्थित होना अनिवार्य है। अंतिम परीक्षा का प्रश्नपत्र JUT Ranchi द्वारा तैयार किया जाता है।
      </p>

      {/* Question Paper Section */}
      <div style={{ marginTop: "20px" }}>
        <h3
          style={{
            textAlign: "center",
            color: "#0d6efd",
            fontWeight: 700,
            marginBottom: "12px",
            fontSize: "clamp(0.95rem, 3vw, 1.2rem)",
          }}
        >
          📝 Previous Year Question Papers
        </h3>

        {[2024, 2023, 2022, 2021].map((year) => (
          <div
            key={year}
            style={sectionBox(
              "#0d6efd",
              "linear-gradient(135deg, #eef5ff, #ffffff)"
            )}
          >
            <h2
              style={{
                textAlign: "center",
                color: "#0d6efd",
                fontWeight: 600,
                marginBottom: 10,
                fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
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
                              fontSize: "clamp(0.78rem, 2.3vw, 0.9rem)",
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


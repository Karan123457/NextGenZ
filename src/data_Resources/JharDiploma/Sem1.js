import React from "react";

const Sem1 = () => {
  const containerStyle = {
    background: "linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)",
    borderRadius: "20px",
    padding: "25px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    color: "#212529",
    fontFamily: "'Segoe UI', sans-serif",
    lineHeight: 1.7,
    maxWidth: "1000px",
    margin: "auto",
  };

  const responsiveContainer = {
    ...containerStyle,
    width: "90%",
  };

  const headingStyle = {
    color: "#0d6efd",
    marginBottom: "14px",
    fontWeight: 700,
    textAlign: "center",
    fontSize: "1.6rem",
  };

  const subjectBox = {
    background: "linear-gradient(135deg, #e6ffed, #ffffff)",
    border: "2px solid #198754",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
    marginTop: "20px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
    fontSize: "0.95rem",
    minWidth: "400px",
  };

  const cellStyle = {
    border: "1px solid #dee2e6",
    padding: "8px",
  };

  const yearBox = {
    background: "linear-gradient(135deg, #e6f0ff, #ffffff)",
    border: "2px solid #0d6efd",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
    overflowX: "auto",
    marginBottom: "25px",
  };

  return (
    <div style={responsiveContainer}>
      <h2 style={headingStyle}>📘 Diploma 1st Semester Jharkhand (JUT Ranchi)</h2>
      <p style={{ marginBottom: "16px", fontSize: "1rem", textAlign: "justify" }}>
        This 1st Semester material has been carefully prepared to help Jharkhand
        Polytechnic Diploma students prepare effectively for their examinations. <br />
        इसमें important questions, previous year question papers, तथा important topics शामिल हैं,
        जिससे students को semester examinations में आने वाले pattern और topics की clear understanding मिल सके।
      </p>

      <div style={subjectBox}>
        <h4 style={{ color: "#198754", marginBottom: "12px", fontWeight: 600, fontSize: "1.15rem" }}>
          📝 Subjects of 1st Semester Jharkhand (Total 4):
        </h4>

        <ul
          style={{
            margin: 0,
            paddingLeft: "18px",
            color: "#212529",
            fontSize: "1rem",
            lineHeight: 1.7,
          }}
        >
          <li>Engineering Physics</li>
          <li>Engineering Chemistry</li>
          <li>Engineering Mathematics</li>
          <li>🔹 Mechanical Science & Engineering (Mechanical/Metallurgy/Automobile Branch)</li>
          <li>🔹 Basics of Electrical Power System (Electrical-EE Branch)</li>
          <li>🔹 Fundamental of Computer (Computer-CSE Branch)</li>
          <li>🔹 Electronic Component & Device (Electronic-ECE Branch)</li>
          <li>🔹 Basic Surveying (Civil Branch)</li>
        </ul>
      </div>

      <p style={{ marginTop: "16px", fontSize: "0.95rem" }}>
        सभी 1st Semester के छात्रों के लिए इन 4 विषयों की External Exam में उपस्थित होना अनिवार्य है।
        अंतिम परीक्षा का प्रश्नपत्र JUT Ranchi द्वारा तैयार किया जाता है।
      </p>

      <div style={{ marginTop: "35px" }}>
        <h3
          style={{
            textAlign: "center",
            color: "#0d6efd",
            fontWeight: 700,
            marginBottom: "20px",
            fontSize: "1.4rem",
          }}
        >
          📝 Previous Year Question Papers
        </h3>

        {[2024, 2023, 2022, 2021].map((year) => (
          <div key={year} style={yearBox}>
            <h2
              style={{
                textAlign: "center",
                color: "#0d6efd",
                fontWeight: 600,
                marginBottom: 16,
                fontSize: "1.2rem",
              }}
            >
              {year} Question Paper 1st Semester
            </h2>

            <div style={{ overflowX: "auto" }}>
              <table style={tableStyle}>
                <thead style={{ background: "#f1f3f5" }}>
                  <tr>
                    <th style={cellStyle}>Subjects</th>
                    <th style={cellStyle}>Year</th>
                    <th style={cellStyle}>Download [PDF]</th>
                  </tr>
                </thead>
                <tbody>
                  {["Engineering Mathematics", "Engineering Chemistry", "Engineering Physics"].map((sub, i) => (
                    <tr key={i} style={{ background: i % 2 !== 0 ? "#f8f9fa" : "transparent" }}>
                      <td style={cellStyle}>{sub}</td>
                      <td style={cellStyle}>{year}</td>
                      <td style={cellStyle}>
                        <a
                          href="/"
                          onClick={(e) => e.preventDefault()}
                          style={{
                            color: "#0d6efd",
                            textDecoration: "underline",
                            fontWeight: 500,
                          }}
                        >
                          Download [PDF]
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Small screen responsive fix */}
      <style>
        {`
          @media (max-width: 768px) {
            h2 { font-size: 1.3rem !important; }
            h3 { font-size: 1.1rem !important; }
            p { font-size: 0.95rem !important; }
            ul li { font-size: 0.95rem; }
            table { font-size: 0.9rem; }
            div { padding: 10px; }
          }

          @media (max-width: 480px) {
            div { padding: 8px !important; }
            table { font-size: 0.85rem; }
            h2, h3, h4 { text-align: center !important; }
          }
        `}
      </style>
    </div>
  );
};

export default Sem1;

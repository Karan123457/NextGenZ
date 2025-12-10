import React from "react";

const JHQPaper = () => {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)",
        borderRadius: "20px",
        padding: "1px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        color: "#212529",
        fontFamily: "'Segoe UI', sans-serif",
        lineHeight: 1.6,
        maxWidth: "1000px",
        margin: "auto",
      }}
    >
      {/* 🔹 Title Section */}
      <h2
        style={{
          color: "#0d6efd",
          marginBottom: "14px",
          fontWeight: 700,
          textAlign: "center",
          marginTop: "35px",
        }}
      >
        Jharkhand Polytechnic Past Year Papers (PECE)
      </h2>

      <p
        style={{
          textAlign: "left",
          fontSize: "0.95rem",
          color: "#495057",
          marginBottom: "25px",
        }}
      >
        Jharkhand Polytechnic (PECE) के सभी छात्रों के लिए यहां पर पिछले वर्षों के प्रश्नपत्र उपलब्ध हैं।
        यह papers परीक्षा की तैयारी में बहुत सहायक होंगे, जिससे आपको paper pattern और
        important topics की पूरी समझ मिलेगी।
      </p>

      <div
        style={{
          background: "linear-gradient(135deg, #e6f0ff, #ffffff)",
          border: "2px solid #0d6efd",
          borderRadius: "20px",
          padding: "15px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
          marginTop: "25px",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            color: "#0d6efd",
            fontWeight: 700,
            marginBottom: "20px",
            fontSize: "1.1rem",
          }}
        >
          Jharkhand Polytechnic Question Papers
        </h3>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
            fontSize: "1rem",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <thead style={{ background: "#0d6efd", color: "#fff" }}>
            <tr>
              <th style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                Year
              </th>
              <th style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                Paper Name
              </th>
              <th style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                Download [PDF]
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              "2025 Question Paper",
              "2024 Question Paper",
              "2023 Question Paper",
              "2022 Question Paper",
              "2021 Question Paper",
            ].map((paper, i) => (
              <tr
                key={i}
                style={{
                  background: i % 2 === 0 ? "#f8f9fa" : "#ffffff",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#e8f0ff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    i % 2 === 0 ? "#f8f9fa" : "#ffffff")
                }
              >
                <td
                  style={{
                    border: "1px solid #dee2e6",
                    padding: "10px",
                    fontWeight: 600,
                    color: "#0d6efd",
                  }}
                >
                  {paper.split(" ")[0]}
                </td>
                <td
                  style={{
                    border: "1px solid #dee2e6",
                    padding: "10px",
                  }}
                >
                  {paper}
                </td>
                <td
                  style={{
                    border: "1px solid #dee2e6",
                    padding: "10px",
                  }}
                >
                  {/* ✅ NEW GRADIENT DOWNLOAD BUTTON */}
                  <a
                    href="/"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      background: "linear-gradient(90deg, #0d6efd, #6610f2)",
                      color: "#fff",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      fontSize: "0.78rem",
                      textDecoration: "none",
                      display: "inline-block",
                      fontWeight: 600,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.opacity = "0.9";
                      e.target.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.opacity = "1";
                      e.target.style.transform = "scale(1)";
                    }}
                  >
                    📥 Download PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p
        style={{
          marginTop: "25px",
          fontSize: "0.95rem",
          color: "#495057",
          textAlign: "left",
        }}
      >
        सभी Jharkhand Polytechnic छात्रों को सलाह दी जाती है कि वे इन question papers को अच्छे
        से पढ़ें ताकि आने वाली परीक्षा में उनका प्रदर्शन बेहतर हो सके।
      </p>
    </div>
  );
};

export default JHQPaper;

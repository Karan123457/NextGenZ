import React from "react";

const JHQPaper = () => {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)",
        borderRadius: "20px",
        padding: "35px",
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
        }}
      >
        📘 Jharkhand Polytechnic Past Year Papers (PECE)
      </h2>

      <p
        style={{
          textAlign: "center",
          fontSize: "1.05rem",
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
          padding: "25px",
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
            fontSize: "1.4rem",
          }}
        >
          📝 Jharkhand Polytechnic Question Papers
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
                  <a href="/" onClick={(e) => e.preventDefault()}
                    style={{
                      color: "#0d6efd",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.textDecoration = "underline")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.textDecoration = "none")
                    }
                  >
                    Download [PDF]
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
          fontSize: "1rem",
          color: "#495057",
          textAlign: "center",
        }}
      >
        सभी Jharkhand Polytechnic छात्रों को सलाह दी जाती है कि वे इन question papers को अच्छे
        से पढ़ें ताकि आने वाली परीक्षा में उनका प्रदर्शन बेहतर हो सके।
      </p>
    </div>
  );
};

export default JHQPaper;

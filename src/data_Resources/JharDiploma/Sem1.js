// src/data_Resources/JharDiploma/Sem1.jsx
import React from "react";

const Sem1 = () => {
  const years = [2024, 2023, 2022, 2021];
  const subjects = [
    "Engineering Mathematics",
    "Engineering Chemistry",
    "Engineering Physics",
  ];

  return (
    <div className="sem1-container">
      {/* 🌟 HEADER / HERO SECTION */}
      <div
        className="hero-banner"
        style={{
          color: "#212529",
          marginBottom: "10px",
        }}
      >
        <div className="hero-content">
          <h2
            style={{
              color: "#0d6efd",
              marginBottom: "14px",
              fontWeight: 700,
              fontSize: "1.5rem",
            }}
          >
            Diploma 1st Semester Jharkhand (JUT Ranchi)
          </h2>
          <p
            className="intro"
            style={{
              marginBottom: "12px",
              fontSize: "0.95rem",
              padding: "0",
              textAlign: "left",
            }}
          >
            This 1st Semester material has been carefully prepared to help
            Jharkhand Polytechnic Diploma students prepare effectively for their
            examinations.
            <br />
            इसमें important questions, previous year question papers, तथा
            important topics शामिल हैं, जिससे students को semester examinations
            में आने वाले pattern और topics की clear understanding मिल सके।
          </p>
        </div>
      </div>

      {/* SUBJECT SECTION – styled like Sem2 subjects box */}
      <div
        className="subjects-box"
        style={{
          background: "linear-gradient(135deg, #e6ffed, #ffffff)",
          border: "2px solid #198754",
          borderRadius: "16px",
          padding: "25px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
          marginTop: "20px",
        }}
      >
        <h4
          style={{
            color: "#198754",
            marginBottom: "15px",
            fontWeight: 600,
            fontSize: "1.1rem",
          }}
        >
          📝 Subjects of 1st Semester Jharkhand (Total 4):
        </h4>
        <ul
          style={{
            margin: 0,
            paddingLeft: "20px",
            color: "#212529",
            fontSize: "0.80rem",
            lineHeight: 1.7,
          }}
        >
          <li>Engineering Physics</li>
          <li>Engineering Chemistry</li>
          <li>Engineering Mathematics</li>
          <li>
            🔹Mechanical Science & Engineering (Mechanical/ Metallurgy/
            Automobile Branch)
          </li>
          <li>🔹Basics of Electrical Power System (EE)</li>
          <li>🔹Fundamental of Computer (CSE)</li>
          <li>🔹Electronic Component & Device (ECE)</li>
          <li>🔹Basic Surveying (CIVIL)</li>
        </ul>
      </div>

      <p
        className="note"
        style={{
          marginTop: "16px",
          fontSize: "0.9rem",
        }}
      >
        सभी 1st Semester के छात्रों के लिए इन 4 विषयों की External Exam में उपस्थित
        होना अनिवार्य है। अंतिम परीक्षा का प्रश्नपत्र JUT Ranchi द्वारा तैयार किया
        जाता है।
      </p>

      {/* Small info line before PYQ */}
      <p className="pyq-intro">
        यहाँ आप Jharkhand Polytechnic Diploma 1st Semester के मुख्य विषयों के{" "}
        <b>2021–2024 Previous Year Question Papers (PDF)</b> डाउनलोड कर सकते हैं।
      </p>

      {/* PYQ SECTION */}
      <h3 className="section-title">📝 Previous Year Question Papers</h3>

      {years.map((year) => (
        <div key={year} className="year-box">
          <h3>{year} Question Paper – 1st Semester</h3>

          <div className="table-no-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">Subjects</th>
                  <th scope="col">Year</th>
                  <th scope="col">Download</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((sub, i) => (
                  <tr key={i}>
                    <td className="one-line">{sub}</td>
                    <td>{year}</td>
                    <td>
                      <a
                        href="/"
                        onClick={(e) => e.preventDefault()}
                        className="download-btn"
                      >
                        📥 Download PDF
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <style>{`
        .sem1-container {
  background: linear-gradient(180deg, #f7faff 0%, #ffffff 100%);
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  max-width: 1000px;
  margin: 20px auto 8px auto;   /* ✅ TOP margin added */
  font-family: 'Poppins', sans-serif;
  line-height: 1.7;
}


        .hero-banner {
          background: transparent;
          color: #212529;
          padding: 14px 4px;
          text-align: left;
          margin-top: 20px;
        }

        .hero-content h2 {
          font-size: 1.7rem;
          font-weight: 700;
          text-align: center;
        }

        .hero-content .intro {
          font-size: 0.95rem;
          text-align: left !important;
        }

        .subjects-box {
          background: linear-gradient(135deg, #d1f7e3, #f9fff9);
          border-left: 6px solid #198754;
          border-radius: 14px;
          padding: 20px;
          margin: 5px;
        }

        ul {
          padding-left: 20px;
          list-style-type: '✔️ ';
        }

        .note {
          margin: 16px;
          background: #fff7e6;
          border-left: 5px solid #ffc107;
          padding: 10px;
          border-radius: 10px;
          font-size: 0.9rem;
        }

        .pyq-intro {
          margin: 10px 10px 0;
          font-size: 0.85rem;
          color: #495057;
          text-align: center;
        }

        .section-title {
          text-align: center;
          color: #0d6efd;
          font-weight: 700;
          margin: 18px 0 16px;
        }

        .year-box {
          background: linear-gradient(135deg, #e6f0ff, #ffffff);
          border: 2px solid #0d6efd;
          border-radius: 14px;
          text-align: center;
          padding: 16px;
          margin: 0 5px 25px;
        }
        
        .year-box h3 {
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.9rem;
          font-weight: 800;
          margin-bottom: 14px;
        }

        .table-no-scroll {
          width: 100%;
          overflow: hidden;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          table-layout: auto;
          font-size: 0.95rem;
        }

        th, td {
          border: 1px solid #dee2e6;
          padding: 8px 4px;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Subject names left aligned */
        .year-box td:first-child {
          text-align: left;
          padding-left: 8px;
        }

        th {
          background: #0d6efd;
          color: white;
          font-size: 0.9rem;
        }

        td {
          background: #f9fbff;
          font-size: 0.95rem;
        }

        .one-line {
          letter-spacing: -0.3px;
        }

        .download-btn {
          background: linear-gradient(90deg, #0d6efd, #6610f2);
          color: white;
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 0.78rem;
          text-decoration: none;
          display: inline-block;
        }

        @media (max-width: 768px) {
          .sem1-container {
            margin: 6px auto;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.06);
          }

          .hero-banner {
            margin-top: 10px;
            padding: 10px 6px;
          }

          .hero-content h2 {
            font-size: 1.3rem;
          }

          .hero-content .intro {
            font-size: 0.88rem;
          }

          .subjects-box {
            padding: 14px;
            margin: 8px 4px;
          }

          .note {
            margin: 10px 6px;
            font-size: 0.82rem;
          }

          .section-title {
            font-size: 1.1rem;
            margin: 20px 0 12px;
          }

          .year-box {
            padding: 12px;
            margin: 0 4px 18px;
          }

          table {
            font-size: 0.78rem;
          }

          th {
            font-size: 0.8rem;
            padding: 6px 4px;
          }

          td {
            font-size: 0.78rem;
            padding: 6px 4px;
          }

          .download-btn {
            font-size: 0.78rem;
            padding: 6px 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default Sem1;

// src/data_Resources/JharDiploma/Sem1.jsx
import React from "react";
import { Container } from "react-bootstrap";

const Sem1 = () => {
  const years = [2024, 2023, 2022, 2021];
  const subjects = [
    "Engineering Mathematics",
    "Engineering Chemistry",
    "Engineering Physics",
  ];

  return (
    <Container fluid className="px-0">
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
              Jharkhand Polytechnic Diploma students prepare effectively for
              their examinations.
              <br />
              इसमें important questions, previous year question papers, तथा
              important topics शामिल हैं, जिससे students को semester
              examinations में आने वाले pattern और topics की clear
              understanding मिल सके।
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
          सभी 1st Semester के छात्रों के लिए इन 4 विषयों की External Exam में
          उपस्थित होना अनिवार्य है। अंतिम परीक्षा का प्रश्नपत्र JUT Ranchi
          द्वारा तैयार किया जाता है।
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
          margin: 100px auto 8px auto;   /* ✅ TOP margin added */
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
// src/data_Resources/JharDiploma/Sem1.jsx
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const Sem1 = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // mark client only after mount — safe for SSR
    setIsClient(true);
  }, []);

  const years = [2024, 2023, 2022, 2021];
  const subjects = [
    "Engineering Mathematics",
    "Engineering Chemistry",
    "Engineering Physics",
  ];

  // Provide both view and direct-download forms but always include a view link for SSR.
  const pdfLinks = {
    2024: {
      "Engineering Mathematics": {
        download:
          "https://drive.google.com/uc?export=download&id=1q37HmN_xbt_1GA0wQT0EUQpQfDtRuXPf",
        view:
          "https://drive.google.com/file/d/1q37HmN_xbt_1GA0wQT0EUQpQfDtRuXPf/view",
      },
      "Engineering Chemistry": {
        download:
          "https://drive.google.com/uc?export=download&id=1_IwKbn4BjXZq4A9ewSIJEuEbyfbZUv-i",
        view:
          "https://drive.google.com/file/d/1_IwKbn4BjXZq4A9ewSIJEuEbyfbZUv-i/view",
      },
      "Engineering Physics": {
        download:
          "https://drive.google.com/uc?export=download&id=11Anhppa96B03pasBNkeX35LxLz2NxHI1",
        view:
          "https://drive.google.com/file/d/11Anhppa96B03pasBNkeX35LxLz2NxHI1/view",
      },
    },
    2023: {},
    2022: {},
    2021: {},
  };

  const handleOpenPdf = (e, links) => {
    // do not call during SSR; only when isClient true and user clicked
    e.preventDefault();
    if (!isClient || !links) {
      // fallback: navigate to view link
      if (links && links.view) {
        window.location.href = links.view;
      }
      return;
    }

    try {
      const win = window.open(links.download || links.view, "_blank", "noopener,noreferrer");
      if (!win) {
        // popup blocked; open in same tab as fallback
        window.location.href = links.view || links.download;
      }
    } catch (err) {
      console.error("Error opening PDF link:", err);
      if (links && links.view) window.open(links.view, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Container fluid className="px-0">
      <div className="sem1-container">
        {/* header/intro unchanged */}
        <div className="hero-banner" style={{ color: "#212529", marginBottom: "10px" }}>
          <div className="hero-content">
            <h2 style={{ color: "#0d6efd", marginBottom: "14px", fontWeight: 700, fontSize: "1.5rem" }}>
              Diploma 1st Semester Jharkhand (JUT Ranchi)
            </h2>
            <p className="intro" style={{ marginBottom: "12px", fontSize: "0.95rem", padding: "0", textAlign: "left" }}>
              This 1st Semester material has been carefully prepared to help students...
            </p>
          </div>
        </div>

        {/* subjects box */}
        <div className="subjects-box" style={{ background: "linear-gradient(135deg, #e6ffed, #ffffff)", border: "2px solid #198754", borderRadius: "16px", padding: "25px", boxShadow: "0 6px 18px rgba(0,0,0,0.12)", marginTop: "20px" }}>
          <h4 style={{ color: "#198754", marginBottom: "15px", fontWeight: 600 }}>
            📝 Subjects of 1st Semester Jharkhand (Total 4):
          </h4>
          <ul style={{ margin: 0, paddingLeft: "20px", color: "#212529", fontSize: "0.80rem", lineHeight: 1.7 }}>
            <li>Engineering Physics</li>
            <li>Engineering Chemistry</li>
            <li>Engineering Mathematics</li>
            <li>🔹Mechanical Science & Engineering (Mechanical/ Metallurgy/ Automobile Branch)</li>
            <li>🔹Basics of Electrical Power System (EE)</li>
            <li>🔹Fundamental of Computer (CSE)</li>
            <li>🔹Electronic Component & Device (ECE)</li>
            <li>🔹Basic Surveying (CIVIL)</li>
          </ul>
        </div>

        <p className="note" style={{ marginTop: "16px", fontSize: "0.9rem" }}>
          सभी 1st Semester के छात्रों के लिए इन 4 विषयों की External Exam में उपस्थित होना अनिवार्य है।
        </p>

        <p className="pyq-intro" style={{ margin: "10px 10px 0", fontSize: "0.85rem", color: "#495057", textAlign: "center" }}>
          यहाँ आप Jharkhand Polytechnic Diploma 1st Semester के मुख्य विषयों के <b>2021–2024 Previous Year Question Papers (PDF)</b> डाउनलोड कर सकते हैं।
        </p>

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
                  {subjects.map((sub, i) => {
                    const yearObj = pdfLinks[year] || {};
                    const links = yearObj[sub] || null;

                    return (
                      <tr key={i}>
                        <td className="one-line" style={{ textAlign: "left", paddingLeft: "8px" }}>{sub}</td>
                        <td style={{ textAlign: "center" }}>{year}</td>
                        <td style={{ textAlign: "center" }}>
                          {links ? (
                            // SSR fallback: anchor href is always set to the view link so pre-rendered HTML has a valid URL.
                            <a
                              href={links.view || links.download}
                              className="download-btn"
                              onClick={(e) => handleOpenPdf(e, links)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              📥 Download PDF
                            </a>
                          ) : (
                            <span style={{ color: "#777", fontSize: "0.85rem" }}>Not Available</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* keep your existing style block & footer below (omit here for brevity) */}
      </div>
    </Container>
  );
};

export default Sem1;

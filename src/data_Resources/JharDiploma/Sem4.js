// src/data_Resources/JharDiploma/Sem1.jsx
import React from "react";

const Sem4 = () => {
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
            <h2
                style={{
                    color: "#0d6efd",
                    marginBottom: "14px",
                    fontWeight: 700,
                    textAlign: "center",
                }}
            >
                📘 Diploma 4th Semester Jharkhand (JUT Ranchi)
            </h2>
            <p style={{ marginBottom: "16px" }}>
                This 4th Semester material has been carefully prepared to help Jharkhand Polytechnic Diploma students prepare effectively for their examinations. <br />
                इसमें important questions, previous year question papers, तथा important topics शामिल हैं, जिससे students को semester examinations में आने वाले pattern और topics की clear understanding मिल सके।
            </p>

            <div
                style={{
                    background: "linear-gradient(135deg, #e6ffed, #ffffff)",
                    border: "2px solid #198754",
                    borderRadius: "16px",
                    padding: "25px",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                    marginTop: "20px",
                }}
            >
                <h4 style={{ color: "#198754", marginBottom: "15px", fontWeight: 600, fontSize: "1.2rem" }}>
                    📝 Subjects of 4th Semester Jharkhand (Total 4):
                </h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "#212529", fontSize: "1rem", lineHeight: 1.7 }}>
                    <li>Engineering Physics</li>
                    <li>Engineering Chemistry</li>
                    <li>Engineering Mathematics</li>
                    <li>🔹Mechanical Science & Engineering (Mechanical/ Metallurgy/ Automobile Branch)</li>
                    <li>🔹Basics of Electrical Power System (Electrical-EE Branch)</li>
                    <li>🔹Fundamental of Computer (Computer-CSE Branch)</li>
                    <li>🔹Electronic Component & Device (Electronic-ECE Branch)</li>
                    <li>🔹Basic Surveying (Civil Branch)</li>
                </ul>
            </div>
             <p style={{ marginTop: "16px" }}>
                सभी 4th Semester के छात्रों के लिए इन 4 विषयों की External Exam में उपस्थित होना अनिवार्य है। अंतिम परीक्षा का प्रश्नपत्र JUT Ranchi द्वारा तैयार किया जाता है।
             </p>


            <div style={{ marginTop: "40px" }}>
                <h3 style={{ textAlign: "center", color: "#0d6efd", fontWeight: 700, marginBottom: "20px", fontSize: "1.6rem" }}>
                    📝 Previous Year Question Papers
                </h3>
                {[2024, 2023, 2022, 2021].map((year) => (
                    <div
                        key={year}
                        style={{
                            background: "linear-gradient(135deg, #e6f0ff, #ffffff)",
                            border: "2px solid #0d6efd",
                            borderRadius: "16px",
                            padding: "25px",
                            boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                            overflowX: "auto",
                            marginBottom: "30px",
                        }}
                    >
                        <h2 style={{ textAlign: "center", color: "#0d6efd", fontWeight: 600, marginBottom: 20, fontSize: "1.5rem" }}>
                            {year} Question Paper 4th Semester
                        </h2>
                        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center", fontSize: 16 }}>
                            <thead style={{ background: "#f1f3f5" }}>
                                <tr>
                                    <th style={{ border: "1px solid #dee2e6", padding: "10px" }}>Subjects</th>
                                    <th style={{ border: "1px solid #dee2e6", padding: "10px" }}>Year</th>
                                    <th style={{ border: "1px solid #dee2e6", padding: "10px" }}>Download [PDF]</th>
                                </tr>
                            </thead>
                            <tbody>
                                {["Engineering Mathematics", "Engineering Chemistry", "Engineering Physics"].map((sub, i) => (
                                    <tr key={i} style={{ background: i % 2 !== 0 ? "#f8f9fa" : "transparent" }}>
                                        <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>{sub}</td>
                                        <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>{year}</td>
                                        <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>
                                            <a href="/" onClick={(e)=>e.preventDefault()} style={{ color: "#0d6efd", textDecoration: "underline", fontWeight: 500 }}>Download [PDF]-Soon</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sem4;

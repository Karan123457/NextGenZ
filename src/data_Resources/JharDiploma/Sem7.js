import React, { useState } from "react";
import { Accordion, Card, Collapse } from "react-bootstrap";
import { ChevronDown, ChevronRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const Carrer_Advisor = () => {
    const [activeKey, setActiveKey] = useState(null);
    const [openSub, setOpenSub] = useState({});

    const toggleAccordion = (key) => {
        setActiveKey(activeKey === key ? null : key);
    };

    const toggleSub = (key) => {
        setOpenSub((prev) => ({ ...prev, [key]: !prev[key] }));
        
    };

    // ----------- Data ------------
    const data = [
        {
            key: "0",
            title: "📘 Jharkhand Diploma Semester PYQ",
            color: "linear-gradient(135deg, #0d6efd, #6ea8fe)",
            subs: [
                {
                    id: "sub1",
                    title: "1st Semester",
                    type: "fullContent", // indicates rich content
                },
                {
                    id: "sub2",
                    title: "2nd Semester",
                  type: "fullContent2", // indicates rich content
                    
                },
            ],
        },
        {
            key: "1",
            title: "📚 Subjects Included",
            color: "linear-gradient(135deg, #198754, #5be49b)",
            subs: [
                {
                    id: "sub3",
                    title: "Engineering Physics",
                    desc: "Covers motion, optics, and modern physics.",
                    inner: [
                        { name: "Module 1", info: "Kinematics and laws of motion" },
                        { name: "Module 2", info: "Optics and Wave theory" },
                    ],
                },
                {
                    id: "sub4",
                    title: "Engineering Chemistry",
                    desc: "Focuses on electrochemistry, polymers, and fuels.",
                    inner: [
                        { name: "Organic Chemistry", info: "Study of polymers and compounds" },
                        { name: "Physical Chemistry", info: "Thermodynamics and energy laws" },
                    ],
                },
            ],
        },
        {
            key: "2",
            title: "📝 Exam Guidelines",
            color: "linear-gradient(135deg, #0d6efd, #ffb366)",
            subs: [
                {
                    id: "sub5",
                    title: "Question Format",
                    desc: "MCQs, Short Answers, and Descriptive type.",
                    inner: [
                        { name: "MCQ", info: "Each carries 1 mark" },
                        { name: "Long Answer", info: "5-10 marks each" },
                    ],
                },
                {
                    id: "sub6",
                    title: "Exam Rules",
                    desc: "All exams are conducted by JUT Ranchi.",
                    inner: [
                        { name: "Admit Card", info: "Mandatory for entry" },
                        { name: "ID Proof", info: "College ID required" },
                    ],
                },
            ],
        },
    ];

    // ---------- JSX ----------
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(120deg, #dee2ff, #e2efff)",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                padding: "50px 20px",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "950px",
                    background: "rgba(255, 255, 255, 0.85)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                    padding: "40px",
                }}
            >
                <h2
                    className="text-center mb-5"
                    style={{
                        fontWeight: "700",
                        color: "#0d6efd",
                    }}
                >
                    🎓 1st Semester Interactive Dashboard
                </h2>

                <Accordion activeKey={activeKey}>
                    {data.map((main) => (
                        <Card
                            key={main.key}
                            style={{
                                border: "none",
                                marginBottom: "22px",
                                borderRadius: "16px",
                                overflow: "hidden",
                                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                            }}
                        >
                            <Card.Header
                                onClick={() => toggleAccordion(main.key)}
                                style={{
                                    background: main.color,
                                    color: "white",
                                    fontWeight: "600",
                                    fontSize: "1.15rem",
                                    padding: "18px 20px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    cursor: "pointer",
                                }}
                            >
                                {main.title}
                                <ChevronDown
                                    size={22}
                                    style={{
                                        transition: "transform 0.3s ease",
                                        transform:
                                            activeKey === main.key ? "rotate(180deg)" : "rotate(0deg)",
                                    }}
                                />
                            </Card.Header>

                            <Accordion.Collapse eventKey={main.key}>
                                <Card.Body style={{ background: "#f9fafb", padding: "20px" }}>
                                    {main.subs.map((sub) => (
                                        <div
                                            key={sub.id}
                                            style={{
                                                background: "rgba(255,255,255,0.9)",
                                                borderRadius: "14px",
                                                padding: "16px 18px",
                                                marginBottom: "16px",
                                                boxShadow: "0 3px 12px rgba(0,0,0,0.05)",
                                                border: "1px solid #e9ecef",
                                                transition: "0.3s ease",
                                            }}
                                        >
                                            <div
                                                onClick={() => toggleSub(sub.id)}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <div>
                                                    <h5
                                                        style={{
                                                            color: "#0d6efd",
                                                            fontWeight: "600",
                                                            marginBottom: "4px",
                                                        }}
                                                    >
                                                        {sub.title}
                                                    </h5>
                                                    {sub.desc && (
                                                        <p style={{ margin: 0, color: "#333", fontSize: "0.95rem" }}>
                                                            {sub.desc}
                                                        </p>
                                                    )}
                                                </div>
                                                <ChevronRight
                                                    size={20}
                                                    style={{
                                                        transform: openSub[sub.id] ? "rotate(90deg)" : "rotate(0deg)",
                                                        transition: "transform 0.3s ease",
                                                    }}
                                                />
                                            </div>

                                            <Collapse in={openSub[sub.id]}>
                                                <div style={{ marginTop: "12px" }}>
                                                    {sub.type === "fullContent" ? (
                                                        // ---------- Rich Content for 1st Semester ----------
                                                        <div
                                                            style={{
                                                                background: "#f8f9fa",
                                                                borderRadius: "16px",
                                                                padding: "30px",
                                                                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                                                                color: "#212529",
                                                                fontFamily: "'Segoe UI', sans-serif",
                                                                lineHeight: 1.6,
                                                            }}
                                                        >
                                                            <h2 style={{ color: "#0d6efd", marginBottom: "12px" }}>
                                                                📘 Diploma 1st Semester Jharkhand (JUT Ranchi)
                                                            </h2>
                                                            <p style={{ marginBottom: "16px" }}>
                                                                This 1st Semester material has been carefully prepared to help Jharkhand Polytechnic Diploma students prepare effectively for their examinations. <br />
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
                                                                    📝 Subjects of 1st Semester Jharkhand (Total 4):
                                                                </h4>
                                                                <ul style={{ margin: 0, paddingLeft: "20px", color: "#212529", fontSize: "1rem", lineHeight: 1.7 }}>
                                                                    <li>Engineering Physics</li>
                                                                    <li>Engineering Chemistry</li>
                                                                    <li>Engineering Mathematics</li>
                                                                    <li>🔹Mechanical Science & Engineering (Only for Mechanical/ Metallurgy/ Automobile Branch)</li>
                                                                    <li>🔹Basics of Electrical Power System (Only for Electrical-EE Branch)</li>
                                                                    <li>🔹Fundamental of Computer (Only for Computer-CSE Branch)</li>
                                                                    <li>🔹Electronic Component & Device (Only for Electronic-ECE Branch)</li>
                                                                    <li>🔹Basic Surveying (Only for Civil Branch)</li>
                                                                    <li>🔹Fundamental of Computer (Only for Computer Branch)</li>
                                                                </ul>
                                                            </div>


                                                            {/* ---------- Previous Year Question Papers Section ---------- */}
                                                            <div style={{ marginTop: "40px" }}>
                                                                <h3 style={{
                                                                    textAlign: "center",
                                                                    color: "#0d6efd",
                                                                    fontWeight: 700,
                                                                    marginBottom: "20px",
                                                                    fontSize: "1.6rem",
                                                                }}>
                                                                    📝 Previous Year Question Papers
                                                                </h3>

                                                                {/* 2024 Question Paper */}
                                                                <div
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
                                                                    <h2 style={{
                                                                        textAlign: "center",
                                                                        color: "#0d6efd",
                                                                        fontWeight: 600,
                                                                        marginBottom: 20,
                                                                        fontSize: "1.5rem"
                                                                    }}>
                                                                        2024 Question Paper
                                                                    </h2>

                                                                    <table style={{
                                                                        width: "100%",
                                                                        borderCollapse: "collapse",
                                                                        textAlign: "center",
                                                                        fontSize: 16,
                                                                    }}>
                                                                        <thead style={{ background: "#f1f3f5" }}>
                                                                            <tr>
                                                                                <th style={{ border: "1px solid #dee2e6", padding: "10px" }}>Subjects</th>
                                                                                <th style={{ border: "1px solid #dee2e6", padding: "10px" }}>Year</th>
                                                                                <th style={{ border: "1px solid #dee2e6", padding: "10px" }}>Download [PDF]</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>Engineering Mathematics</td>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>2024</td>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>
                                                                                    <a href="#" style={{ color: "#0d6efd", textDecoration: "underline", fontWeight: 500 }}>Download [PDF]</a>
                                                                                </td>
                                                                            </tr>
                                                                            <tr style={{ background: "#f8f9fa" }}>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>Engineering Chemistry</td>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>2024</td>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>
                                                                                    <a href="#" style={{ color: "#0d6efd", textDecoration: "underline", fontWeight: 500 }}>Download [PDF]</a>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>Engineering Physics</td>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>2024</td>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>
                                                                                    <a href="#" style={{ color: "#0d6efd", textDecoration: "underline", fontWeight: 500 }}>Download [PDF]</a>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>

                                                                {/* 2023 Question Paper */}
                                                                <div
                                                                    style={{
                                                                        background: "linear-gradient(135deg, #e6f0ff, #ffffff)",
                                                                        border: "2px solid #0d6efd",
                                                                        borderRadius: "16px",
                                                                        padding: "25px",
                                                                        boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                                                                        overflowX: "auto",
                                                                    }}
                                                                >
                                                                    <h2 style={{
                                                                        textAlign: "center",
                                                                        color: "#0d6efd",
                                                                        fontWeight: 600,
                                                                        marginBottom: 20,
                                                                        fontSize: "1.5rem"
                                                                    }}>
                                                                        2023 Question Paper
                                                                    </h2>

                                                                    <table style={{
                                                                        width: "100%",
                                                                        borderCollapse: "collapse",
                                                                        textAlign: "center",
                                                                        fontSize: 16,
                                                                    }}>
                                                                        <thead style={{ background: "#f1f3f5" }}>
                                                                            <tr>
                                                                                <th style={{ border: "1px solid #dee2e6", padding: "10px" }}>Subjects</th>
                                                                                <th style={{ border: "1px solid #dee2e6", padding: "10px" }}>Year</th>
                                                                                <th style={{ border: "1px solid #dee2e6", padding: "10px" }}>Download [PDF]</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>Engineering Mathematics</td>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>2023</td>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>
                                                                                    <a href="#" style={{ color: "#0d6efd", textDecoration: "underline", fontWeight: 500 }}>Download [PDF]</a>
                                                                                </td>
                                                                            </tr>
                                                                            <tr style={{ background: "#f8f9fa" }}>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>Engineering Chemistry</td>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>2023</td>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>
                                                                                    <a href="#" style={{ color: "#0d6efd", textDecoration: "underline", fontWeight: 500 }}>Download [PDF]</a>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>Engineering Physics</td>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>2023</td>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>
                                                                                    <a href="#" style={{ color: "#0d6efd", textDecoration: "underline", fontWeight: 500 }}>Download [PDF]</a>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                {/* 2022 Question Paper */}
                                                                <div
                                                                    style={{
                                                                        background: "linear-gradient(135deg, #e6f0ff, #ffffff)",
                                                                        border: "2px solid #0d6efd",
                                                                        borderRadius: "16px",
                                                                        padding: "25px",
                                                                        boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                                                                        overflowX: "auto",
                                                                        marginTop: "30px",
                                                                    }}
                                                                >
                                                                    <h2 style={{
                                                                        textAlign: "center",
                                                                        color: "#0d6efd",
                                                                        fontWeight: 600,
                                                                        marginBottom: 20,
                                                                        fontSize: "1.5rem"
                                                                    }}>
                                                                        2022 Question Paper
                                                                    </h2>

                                                                    <table style={{
                                                                        width: "100%",
                                                                        borderCollapse: "collapse",
                                                                        textAlign: "center",
                                                                        fontSize: 16,
                                                                    }}>
                                                                        <thead style={{ background: "#f1f3f5" }}>
                                                                            <tr>
                                                                                <th style={{ border: "1px solid #dee2e6", padding: "10px" }}>Subjects</th>
                                                                                <th style={{ border: "1px solid #dee2e6", padding: "10px" }}>Year</th>
                                                                                <th style={{ border: "1px solid #dee2e6", padding: "10px" }}>Download [PDF]</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>Engineering Mathematics</td>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>2022</td>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>
                                                                                    <a href="#" style={{ color: "#0d6efd", textDecoration: "underline", fontWeight: 500 }}>Download [PDF]</a>
                                                                                </td>
                                                                            </tr>
                                                                            <tr style={{ background: "#f8f9fa" }}>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>Engineering Chemistry</td>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>2022</td>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>
                                                                                    <a href="#" style={{ color: "#0d6efd", textDecoration: "underline", fontWeight: 500 }}>Download [PDF]</a>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>Engineering Physics</td>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>2022</td>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>
                                                                                    <a href="#" style={{ color: "#0d6efd", textDecoration: "underline", fontWeight: 500 }}>Download [PDF]</a>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                {/* 2022 Question Paper */}
                                                                <div
                                                                    style={{
                                                                        background: "linear-gradient(135deg, #e6f0ff, #ffffff)",
                                                                        border: "2px solid #0d6efd",
                                                                        borderRadius: "16px",
                                                                        padding: "25px",
                                                                        boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                                                                        overflowX: "auto",
                                                                        marginTop: "30px",
                                                                    }}
                                                                >
                                                                    <h2 style={{
                                                                        textAlign: "center",
                                                                        color: "#0d6efd",
                                                                        fontWeight: 600,
                                                                        marginBottom: 20,
                                                                        fontSize: "1.5rem"
                                                                    }}>
                                                                        2021 Question Paper
                                                                    </h2>

                                                                    <table style={{
                                                                        width: "100%",
                                                                        borderCollapse: "collapse",
                                                                        textAlign: "center",
                                                                        fontSize: 16,
                                                                    }}>
                                                                        <thead style={{ background: "#f1f3f5" }}>
                                                                            <tr>
                                                                                <th style={{ border: "1px solid #dee2e6", padding: "10px" }}>Subjects</th>
                                                                                <th style={{ border: "1px solid #dee2e6", padding: "10px" }}>Year</th>
                                                                                <th style={{ border: "1px solid #dee2e6", padding: "10px" }}>Download [PDF]</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>Engineering Mathematics</td>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>2021</td>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>
                                                                                    <a href="#" style={{ color: "#0d6efd", textDecoration: "underline", fontWeight: 500 }}>Download [PDF]</a>
                                                                                </td>
                                                                            </tr>
                                                                            <tr style={{ background: "#f8f9fa" }}>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>Engineering Chemistry</td>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>2021</td>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>
                                                                                    <a href="#" style={{ color: "#0d6efd", textDecoration: "underline", fontWeight: 500 }}>Download [PDF]</a>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>Engineering Physics</td>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>2021</td>
                                                                                <td style={{ border: "1px solid #dee2e6", padding: "10px" }}>
                                                                                    <a href="#" style={{ color: "#0d6efd", textDecoration: "underline", fontWeight: 500 }}>Download [PDF]</a>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>

                                                            </div>


                                                        </div>
                                                    ) : (
                                                        // ---------- Default inner cards ----------
                                                        sub.inner?.map((inner, i) => (
                                                            <div
                                                                key={i}
                                                                style={{
                                                                    background: "linear-gradient(135deg, #f1f3ff, #e6eeff)",
                                                                    borderRadius: "10px",
                                                                    padding: "10px 14px",
                                                                    marginBottom: "10px",
                                                                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                                                                    border: "1px solid #dee2e6",
                                                                }}
                                                            >
                                                                <strong style={{ color: "#0d6efd" }}>{inner.name}:</strong>{" "}
                                                                <span style={{ color: "#444" }}>{inner.info}</span>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </Collapse>
                                        </div>
                                    ))}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default Carrer_Advisor;

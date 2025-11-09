import React, { useState } from "react";
import { Accordion, Card, Collapse } from "react-bootstrap";
import { ChevronDown, ChevronRight } from "react-bootstrap-icons";
import Sem1 from "../data_Resources/JharDiploma/Sem1"; // ✅ Correct import path
import Sem2 from "../data_Resources/JharDiploma/Sem2"; // ✅ Correct import path
import Sem3 from "../data_Resources/JharDiploma/Sem3"; // ✅ Correct import path
import Sem4 from "../data_Resources/JharDiploma/Sem4"; // ✅ Correct import path
import Sem5 from "../data_Resources/JharDiploma/Sem5"; // ✅ Correct import path
import Sem6 from "../data_Resources/JharDiploma/Sem6"; // ✅ Correct import path
import JHPolytechnic from "../data_Resources/JharPolytechnic/JHPolytechnic";
import JHQPaper from "../data_Resources/JharPolytechnic/JHQPaper";
import D2DInfo from "../data_Resources/JharD2D/D2DInfo";  
import JHD2DQPaper from "../data_Resources/JharD2D/JHD2DQPaper";
import "bootstrap/dist/css/bootstrap.min.css";

const Resources = () => {
    const [activeKey, setActiveKey] = useState(null);
    const [openSub, setOpenSub] = useState({});

    const toggleAccordion = (key) => setActiveKey(activeKey === key ? null : key);
    const toggleSub = (key) => setOpenSub(prev => ({ ...prev, [key]: !prev[key] }));

    const data = [
        {
            key: "0",
            title: "📘 Jharkhand Diploma Semester PYQ",
            color: "linear-gradient(135deg, #0d6efd, #6ea8fe)",
            subs: [
                { id: "sub1", title: "1st Semester", type: "fullContent" },
                { id: "sub2", title: "2nd Semester", type: "fullContent2" },
                { id: "sub3", title: "3rd Semester", type: "fullContent3" },
                { id: "sub4", title: "4th Semester", type: "fullContent4" },
                { id: "sub5", title: "5th Semester", type: "fullContent5" },
                { id: "sub6", title: "6th Semester", type: "fullContent6" },

            ],
        },
        {
            key: "1",
            title: "📚 Jharkhand Polytechnic PYQ",
            color: "linear-gradient(135deg, #198754, #5be49b)",
            subs: [
                { id: "jhpoly", title: "Exam Information for 2026 ", type: "fullJHPoly" }, // no sub-card, entire content will render
                { id: "jhpoly2", title: "Download All Paper (2021 - 2025)", type: "fullJHPoly2" },
            ],
        },


        {
            key: "2",
            title: "📚 Jharkhand D2D PYQ",
            color: "linear-gradient(135deg, #fd7e14, #ebc285ff)",
            subs: [
                { id: "sub_d2d", title: "Exam Information for 2026", type: "D2dExam" },
                { id: "sub2_d2d", title: "Download All Paper (2021 - 2025)", type: "D2dExam2" },
            ],
        },
        {
            key: "3",
            title: "📚 Comming Soon...",
            color: "linear-gradient(135deg, #fd3546, #eb8c85ff)",
            subs: [
                { id: "sub3", title: "Engineering Physics", desc: "Motion, optics, modern physics.", inner: [{ name: "Module 1", info: "Kinematics" }, { name: "Module 2", info: "Optics" }] },
                { id: "sub4", title: "Engineering Chemistry", desc: "Electrochemistry, polymers, fuels.", inner: [{ name: "Organic", info: "Polymers" }, { name: "Physical", info: "Thermodynamics" }] },
            ],
        },
    ];

    return (
        <div style={{ marginTop:"20px", minHeight: "100vh", background: "linear-gradient(120deg, #dee2ff, #e2efff)", padding: "50px 20px", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
            <div style={{ width: "100%", maxWidth: "950px", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)", borderRadius: "20px", boxShadow: "0 8px 25px rgba(0,0,0,0.15)", padding: "40px" }}>
                <h2 className="text-center mb-5" style={{ fontWeight: 700, color: "#0d6efd" }}>🎓 Interactive Dashboard</h2>

                <Accordion activeKey={activeKey}>
                    {data.map(main => (
                        <Card key={main.key} style={{ border: "none", marginBottom: "22px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 15px rgba(0,0,0,0.08)" }}>
                            <Card.Header onClick={() => toggleAccordion(main.key)} style={{ background: main.color, color: "white", fontWeight: 600, fontSize: "1.15rem", padding: "18px 20px", display: "flex", justifyContent: "space-between", cursor: "pointer" }}>
                                {main.title}
                                <ChevronDown size={22} style={{ transition: "transform 0.3s", transform: activeKey === main.key ? "rotate(180deg)" : "rotate(0deg)" }} />
                            </Card.Header>

                            <Accordion.Collapse eventKey={main.key}>
                                <Card.Body style={{ background: "#f9fafb", padding: "20px" }}>
                                    {main.subs.map(sub => (
                                        <div key={sub.id} style={{ background: "rgba(255,255,255,0.9)", borderRadius: "14px", padding: "16px 18px", marginBottom: "16px", boxShadow: "0 3px 12px rgba(0,0,0,0.05)", border: "1px solid #e9ecef" }}>
                                            <div onClick={() => toggleSub(sub.id)} style={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }}>
                                                <h5 style={{ color: "#0d6efd", fontWeight: 600 }}>{sub.title}</h5>
                                                <ChevronRight size={20} style={{ transform: openSub[sub.id] ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.3s" }} />
                                            </div>

                                            <Collapse in={openSub[sub.id]}>
                                                <div style={{ marginTop: "12px" }}>
                                                    {sub.type === "fullContent" ? (
                                                        <Sem1 /> // ✅ 1st Semester component

                                                    ) : sub.type === "fullContent2" ? (
                                                        <Sem2 /> // ✅ 2nd Semester component
                                                    ) : sub.type === "fullContent3" ? (
                                                        <Sem3 /> // ✅ 3rd Semester component
                                                    ) : sub.type === "fullContent4" ? (
                                                        <Sem4 /> // ✅ 2nd Semester component
                                                    ) : sub.type === "fullContent5" ? (
                                                        <Sem5 /> // ✅ 2nd Semester component
                                                    ) : sub.type === "fullContent6" ? (
                                                        <Sem6 /> // ✅ 2nd Semester component
                                                    ) : sub.type === "fullJHPoly" ? (
                                                        <JHPolytechnic /> // ✅ New card here
                                                    ) : sub.type === "fullJHPoly2" ? (
                                                        <JHQPaper /> // ✅ New card here
                                                    ) : sub.type === "D2dExam" ? (
                                                        <D2DInfo /> // ✅ New card here
                                                    ) : sub.type === "D2dExam2" ? (
                                                        <JHD2DQPaper/> // ✅ New card here
                                                    ) : (
                                                        sub.inner?.map((inner, i) => (
                                                            <div key={i} style={{ background: "linear-gradient(135deg,#f1f3ff,#e6eeff)", borderRadius: "10px", padding: "10px 14px", marginBottom: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.05)", border: "1px solid #dee2e6" }}>
                                                                <strong style={{ color: "#0d6efd" }}>{inner.name}:</strong> <span>{inner.info}</span>
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

export default Resources;

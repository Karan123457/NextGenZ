import React, { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { ChevronDown, ChevronRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Resources = () => {
  const [activeKey, setActiveKey] = useState(null);
  const navigate = useNavigate();

  const toggleAccordion = (key) =>
    setActiveKey(activeKey === key ? null : key);

  const data = [
    {
      key: "jharkhand-diploma",
      title: "Jharkhand Diploma Semester PYQ",
      emoji: "📘",
      color: "linear-gradient(135deg, #2563eb, #60a5fa)",
      subs: [
        { id: "semester-1", title: "1st Semester", type: "fullContent" },
        { id: "semester-2", title: "2nd Semester", type: "fullContent2" },
        { id: "semester-3", title: "3rd Semester", type: "fullContent3" },
        { id: "semester-4", title: "4th Semester", type: "fullContent4" },
        { id: "semester-5", title: "5th Semester", type: "fullContent5" },
        { id: "semester-6", title: "6th Semester", type: "fullContent6" },
      ],
    },
    {
      key: "jharkhand-polytechnic",
      title: "Jharkhand Polytechnic PYQ",
      emoji: "📚",
      color: "linear-gradient(135deg, #16a34a, #4ade80)",
      subs: [
        { id: "exam-information", title: "Exam Information (2026)", type: "fullJHPoly" },
        { id: "download-paper", title: "Download Papers (2021–2025)", type: "fullJHPoly2" },
      ],
    },
    {
      key: "jharkhand-d2d",
      title: "Jharkhand D2D PYQ",
      emoji: "📖",
      color: "linear-gradient(135deg, #f97316, #fdba74)",
      subs: [
        { id: "exam-information", title: "Exam Information (2026)", type: "D2dExam" },
        { id: "download-paper", title: "Download Papers (2021–2025)", type: "D2dExam2" },
      ],
    },
    {
      key: "coming-soon",
      title: "More Resources Coming Soon",
      emoji: "🚀",
      color: "linear-gradient(135deg, #ef4444, #fca5a5)",
      subs: [
        { id: "soon-1", title: "Engineering Physics" },
        { id: "soon-2", title: "Engineering Chemistry" },
      ],
    },
  ];

  return (
    <div className="resources-page">
      <div className="resources-wrapper">

        {/* HEADER */}
        <div className="resources-header">
          <h1>Study Resources</h1>
          <p>All your exam materials, organized in one place</p>
        </div>

        {/* ACCORDION */}
        <Accordion activeKey={activeKey}>
          {data.map((main) => (
            <Card className="resource-card" key={main.key}>
              <Card.Header
                onClick={() => toggleAccordion(main.key)}
                style={{ background: main.color }}
                className="resource-header"
              >
                <div className="d-flex align-items-center gap-2">
                  <span className="fs-4">{main.emoji}</span>
                  <span>{main.title}</span>
                </div>
                <ChevronDown
                  size={22}
                  className={`chevron ${
                    activeKey === main.key ? "rotate" : ""
                  }`}
                />
              </Card.Header>

              <Accordion.Collapse eventKey={main.key}>
                <Card.Body className="resource-body">
                  {main.subs.map((sub) => (
                    <div
                      key={sub.id}
                      className="resource-item"
                      onClick={() =>
                        sub.type &&
                        navigate(`/resources/${main.key}/${sub.id}`, {
                          state: { title: sub.title, type: sub.type },
                        })
                      }
                    >
                      <span>{sub.title}</span>
                      <ChevronRight />
                    </div>
                  ))}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>

        {/* WHAT YOU GET */}
        <div className="benefits-box">
          <h3>What you’ll get on Futurely</h3>
          <ul>
            <li>100% Free & High-Quality Study Materials</li>
            <li>Well-Organized & Exam-Focused Content</li>
            <li>Fast PDF Access (Mobile Friendly)</li>
            <li>Updated Regularly with Latest Papers</li>
          </ul>
        </div>

     
      </div>

      {/* STYLES */}
      <style>{`
        .resources-page {
          min-height: 100vh;
          background: linear-gradient(to bottom, #f8fafc, #eef2ff);
          padding: 20px 10px;
          display: flex;
          justify-content: center;
        }

        .resources-wrapper {
          width: 100%;
          max-width: 560px;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(12px);
          border-radius: 22px;
          padding: 22px;
          box-shadow: 0 12px 35px rgba(0,0,0,0.12);
        }

        .resources-header {
          text-align: center;
          margin-bottom: 28px;
        }

        .resources-header h1 {
          font-size: 1.8rem;
          font-weight: 800;
          color: #1d4ed8;
          margin-bottom: 6px;
        }

        .resources-header p {
          font-size: 0.95rem;
          color: #475569;
        }

        .resource-card {
          border: none;
          margin-bottom: 20px;
          border-radius: 16px;
          overflow: hidden;
        }

        .resource-header {
          color: #fff;
          font-weight: 600;
          font-size: 1.05rem;
          padding: 18px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        .chevron {
          transition: transform 0.3s ease;
        }

        .chevron.rotate {
          transform: rotate(180deg);
        }

        .resource-body {
          background: #f9fafb;
          padding: 18px;
        }

        .resource-item {
          background: #ffffff;
          border-radius: 14px;
          padding: 14px 16px;
          margin-bottom: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid #e5e7eb;
        }

        .resource-item:hover {
          transform: translateX(4px);
          background: #f0f9ff;
          border-color: #93c5fd;
        }

        .benefits-box {
          margin-top: 24px;
          background: #ffffff;
          border-radius: 16px;
          padding: 18px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.06);
        }

        .benefits-box h3 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 10px;
          color: #1f2937;
        }

        .benefits-box ul {
          padding-left: 18px;
          margin: 0;
          font-size: 0.9rem;
          color: #374151;
          line-height: 1.8;
        }

        .resources-footer {
          margin-top: 26px;
          text-align: center;
          font-size: 0.8rem;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default Resources;

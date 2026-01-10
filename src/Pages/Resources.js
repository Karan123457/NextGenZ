import React, { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { ChevronDown, ChevronRight, BookHalf } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Resources = () => {
  const [activeKey, setActiveKey] = useState(null);
  const navigate = useNavigate();

  const toggleAccordion = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  const data = [
    {
      key: "jharkhand-diploma",
      title: "Jharkhand Diploma Semester PYQ",
      emoji: "📘",
      color: "linear-gradient(135deg,#2563eb,#60a5fa)",
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
      color: "linear-gradient(135deg,#16a34a,#4ade80)",
      subs: [
        {
          id: "exam-information",
          title: "Exam Information (2026)",
          type: "fullJHPoly",
        },
        {
          id: "download-paper",
          title: "Download Papers (2021–2025)",
          type: "fullJHPoly2",
        },
      ],
    },
    {
      key: "jharkhand-d2d",
      title: "Jharkhand D2D PYQ",
      emoji: "📖",
      color: "linear-gradient(135deg,#f97316,#fdba74)",
      subs: [
        {
          id: "exam-information",
          title: "Exam Information (2026)",
          type: "D2dExam",
        },
        {
          id: "download-paper",
          title: "Download Papers (2021–2025)",
          type: "D2dExam2",
        },
      ],
    },
    {
      key: "coming-soon",
      title: "More Resources Coming Soon",
      emoji: "🚀",
      color: "linear-gradient(135deg,#ef4444,#fca5a5)",
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
          <BookHalf size={34} className="header-icon" />
          <h1>Study Resources</h1>
          <p>Exam info, all-semester PYQs & branch-wise PDFs — clean and free</p>
        </div>

        {/* ACCORDION */}
        <Accordion activeKey={activeKey} alwaysOpen={false}>
          {data.map((main) => (
            <Card className="resource-card" key={main.key}>
              <Card.Header
                className="resource-header"
                style={{ background: main.color }}
                onClick={() => toggleAccordion(main.key)}
                role="button"
                aria-expanded={activeKey === main.key}
              >
                <div className="header-left">
                  <span className="emoji">{main.emoji}</span>
                  <span className="title">{main.title}</span>
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
                      className={`resource-item ${
                        !sub.type ? "disabled" : ""
                      }`}
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

        {/* BENEFITS */}
        <div className="benefits-box">
          <h3>What you’ll get on Futurely</h3>
          <ul>
            <li>100% Free & Exam-Focused Content</li>
            <li>Clean PDFs (Mobile Friendly)</li>
            <li>Semester-Wise & Year-Wise PYQs</li>
            <li>Regular Updates</li>
          </ul>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .resources-page {
          min-height: 100vh;
          background: radial-gradient(circle at top, #eef2ff, #f8fafc);
          display: flex;
          justify-content: center;
          padding: 24px 12px;
        }

        .resources-wrapper {
          width: 100%;
          max-width: 560px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(14px);
          border-radius: 26px;
          padding: 24px;
          box-shadow: 0 18px 40px rgba(0,0,0,0.12);
        }

        .resources-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .header-icon {
          color: #2563eb;
          margin-bottom: 6px;
        }

        .resources-header h1 {
          font-size: 1.9rem;
          font-weight: 800;
          color: #1e3a8a;
        }

        .resources-header p {
          font-size: 0.95rem;
          color: #475569;
        }

        .resource-card {
          border: none;
          border-radius: 18px;
          margin-bottom: 20px;
          overflow: hidden;
          transition: transform 0.2s ease;
        }

        .resource-card:hover {
          transform: translateY(-2px);
        }

        .resource-header {
          color: #fff;
          padding: 18px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          font-size: 1.05rem;
        }

        .emoji {
          font-size: 1.3rem;
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
          animation: fadeUp 0.3s ease;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
          border: 1px solid #e5e7eb;
          transition: all 0.2s ease;
        }

        .resource-item:hover {
          background: #eff6ff;
          border-color: #93c5fd;
          transform: translateX(4px);
        }

        .resource-item.disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .benefits-box {
          margin-top: 26px;
          background: #ffffff;
          border-radius: 18px;
          padding: 18px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.06);
        }

        .benefits-box h3 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .benefits-box ul {
          margin: 0;
          padding-left: 18px;
          font-size: 0.9rem;
          line-height: 1.8;
          color: #374151;
        }
      `}</style>
    </div>
  );
};

export default Resources;

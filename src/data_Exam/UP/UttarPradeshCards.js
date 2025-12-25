import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";


export default function UttarPradeshCards() {
  const navigate = useNavigate();

  const uttarPradeshCards = [
    {
      id: 1,
      extra: "All Previous Year Questions (PYQ)",
      title: "UP B.Tech LE (Lateral Entry) PYQ (2021–2025) - For 2026 Exam",
      desc: "For B.Tech (Lateral Entry) Admission to 2nd Year",
      badge: "Just Launched",
     
      link: "#",
      gradient: "linear-gradient(135deg, #2b1d1bff, #dd2476)",
      textColor: "#fff",
    },
    {
      id: 2,
      extra: "All Previous Year Questions (PYQ)",
      title: "UP Polytechnic PYQ (2018–2025) - For 2026 Exam",
      desc: "For Diploma (Regular Entry) Admission to 1st Year",
      badge: "Just Launched",
      
      link: "#",
      gradient: "linear-gradient(135deg, #2b1d1bff, #dd2476)",
      textColor: "#fff",
    },
    {
      id: 3,
      extra: "All Previous Year Questions (PYQ)",
      title: "UP Polytechnic LE PYQ (2018–2025) - For 2026 Exam",
      desc: "For Diploma (Lateral Entry) Admission to 2nd Year",
      badge: "Just Launched",
      
      link: "#",
      gradient: "linear-gradient(135deg, #2b1d1bff, #dd2476)",
      textColor: "#fff",
    },
  ];

  const handleCardClick = (card) => {
    navigate(`/details/${card.id}`, { state: card });
  };

  return (
    <>
      <style>{`
        .custom-card {
          position: relative;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.12);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
          cursor: pointer;
        }
        .custom-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.18);
        }
        .custom-card:hover .card-logo {
          transform: scale(1.15);
        }
        .badge-gradient {
          background: rgba(255,255,255,0.3);
          color: #fff;
          font-weight: 600;
          backdrop-filter: blur(5px);
        }
        .extra-text {
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 6px;
        }
        .join-link {
          display: inline-block;
          margin-top: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
        .join-link:hover {
          transform: translateX(6px);
          opacity: 0.85;
        }
      `}</style>

      <h1 className="text-center my-5 fw-bold">Uttar Pradesh</h1>
      <Row className="justify-content-center gx-4 gy-4 px-4">
        {uttarPradeshCards.map((card) => (
          <Col key={card.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              className="custom-card p-4"
              onClick={() => handleCardClick(card)}
              style={{ background: card.gradient, color: card.textColor }}
            >
              <Badge
                className="badge-gradient"
                style={{ position: "absolute", top: "15px", right: "15px" }}
              >
                {card.badge}
              </Badge>
              <Card.Img
                variant="top"
                src={card.logo}
                className="card-logo mb-3 rounded"
              />
              <Card.Body>
                {card.extra && (
                  <div
                    className="extra-text"
                    style={{ color: card.textColor + "cc" }}
                  >
                    {card.extra}
                  </div>
                )}
                <Card.Title>{card.title}</Card.Title>
                <Card.Text style={{ whiteSpace: "pre-line" }}>
                  {card.desc}
                </Card.Text>
                <Button
                  variant="light"
                  className="solve-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    // same behavior as Card click for available items
                    if (card.id === 1) {
                      alert("Coming Soon!");
                    } else if (card.id === 2) {
                     alert("Coming Soon!");
                    } else {
                      alert("Coming Soon!");
                    }
                  }}
                >
                  🚀 Start Solving
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

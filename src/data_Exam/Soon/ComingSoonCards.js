import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

export default function ComingSoonCards() {
  const comingSoonStates = [
    {
      id: 1,
      name: "Madhya Pradesh",
      status: "Coming Soon",
      gradient: "linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)",
    },
    {
      id: 2,
      name: "West Bengal",
      status: "Coming Soon",
      gradient: "linear-gradient(135deg, #42275a, #734b6d)",
    },
    {
      id: 3,
      name: "Odisha",
      status: "Coming Soon",
      gradient: "linear-gradient(135deg, #2b5876, #4e4376)",
    },
    {
      id: 4,
      name: "Delhi",
      status: "Coming Soon",
      gradient: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    },
    {
      id: 5,
      name: "Rajasthan",
      status: "Coming Soon",
      gradient: "linear-gradient(135deg, #ff9966, #ff5e62)",
    },
  ];

  return (
    <>
      <style>{`
        .coming-card {
          position: relative;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.12);
          overflow: hidden;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          cursor: pointer;
          color: #fff;
          background-size: 200% 200%;
          animation: gradientShift 6s ease infinite;
        }

        .coming-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 16px 40px rgba(0,0,0,0.25);
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .coming-card h3 {
          font-weight: 700;
          font-size: 1.5rem;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 6px rgba(0,0,0,0.25);
        }

        .coming-card small {
          font-weight: 600;
          letter-spacing: 1px;
          opacity: 0.9;
        }

        .neon-border {
          border: 2px solid rgba(255,255,255,0.3);
          backdrop-filter: blur(6px);
          box-shadow: 0 0 10px rgba(255,255,255,0.2);
        }

        .badge-futuristic {
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.8rem;
          padding: 6px 14px;
          color: #fff;
        }
      `}</style>

      <h1 className="text-center fw-bold my-5" style={{ color: "#9909a1f1" }}>
        🔮 Coming Soon States
      </h1>

      <Row className="justify-content-center gx-4 gy-4 px-4">
        {comingSoonStates.map((state) => (
          <Col key={state.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              className="coming-card neon-border p-4 text-center"
              style={{ background: state.gradient }}
            >
              <Badge className="badge-futuristic mb-3">{state.status}</Badge>
              <h3>{state.name}</h3>
              <small>Preparation Material Loading...</small>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

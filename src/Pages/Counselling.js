import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function StackedTextAnimation({
  words = ["EDUCATOR", "COACH", "MENTOR", "CONSULTANT"],
  subtitle = "Design mentorship\nby Won J. You",
  accentColor = "#ff4c4c",
}) {
  useEffect(() => {
    const lines = document.querySelectorAll(".line");
    const wrapper = document.getElementById("wrapper");

    // Animate lines sequentially
    lines.forEach((line, i) => {
      setTimeout(() => {
        line.classList.add("animate");
      }, i * 600);
    });

    // Shift the text block left after animations
    setTimeout(() => {
      wrapper.classList.add("shift-left");
    }, lines.length * 600 + 800);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&display=swap');

        body {
          font-family: 'Montserrat', sans-serif;
        }

        .bg-black {
          background: #000;
        }

        .wrapper {
          position: relative;
          overflow: hidden;
          transition: transform 0.5s ease-in-out;
        }

        .shift-left {
          transform: translateX(-150px);
        }

        .info {
          position: absolute;
          left: 0;
          top: -60px;
          color: #fff;
          font-size: 0.9rem;
          line-height: 1.4;
          letter-spacing: 0.5px;
          white-space: pre-line;
        }

        .container-custom {
          position: relative;
          text-transform: uppercase;
        }

        .mask {
          overflow: hidden;
        }

        .line {
          font-size: 6rem;
          font-weight: 800;
          color: ${accentColor};
          margin: 0.15em 0;
          transform: translateY(150%);
          opacity: 0;
        }

        @keyframes slideUp {
          0% {
            transform: translateY(150%);
            opacity: 0;
          }
          60% {
            transform: translateY(-8%);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate {
          animation: slideUp 0.5s ease-out forwards;
        }

        @media (max-width: 768px) {
          .line {
            font-size: 2.5rem;
          }
          .info {
            font-size: 0.8rem;
            top: -40px;
          }
          .shift-left {
            transform: translateX(-60px);
          }
        }
      `}</style>

      <div className="d-flex justify-content-center align-items-center vh-100 bg-black overflow-hidden">
        <div className="wrapper position-relative" id="wrapper">
          <div className="info">{subtitle}</div>

          <Container className="container-custom text-uppercase" id="container">
            <Row>
              <Col>
                {words.map((word, index) => (
                  <div className="mask" key={index}>
                    <div className="line">{word}</div>
                  </div>
                ))}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

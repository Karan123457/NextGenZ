import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Envelope } from "react-bootstrap-icons";

const Contact = () => {
  return (
    <main style={{ background: "#f8fbff", minHeight: "100vh" }}>
      <Container style={{ maxWidth: 900, padding: "60px 16px" }}>
        {/* Header */}
        <Row className="mb-4 text-center">
          <Col>
            <h1 style={{ fontWeight: 800, color: "#212529" }}>
              Contact Us
            </h1>
            <p
              style={{
                marginTop: 10,
                fontSize: "1.05rem",
                color: "#495057",
                maxWidth: 650,
                marginInline: "auto",
                lineHeight: 1.6,
              }}
            >
              Have a question about exams, colleges, resources, or Futurely?
              Feel free to reach out — we’re here to help.
            </p>
          </Col>
        </Row>

        {/* Single Card */}
        <Row className="justify-content-center">
          <Col md={8}>
            <Card
              style={{
                border: "none",
                borderRadius: 14,
                background: "#ffffff",
                boxShadow: "0 12px 32px rgba(0,0,0,0.06)",
              }}
            >
              <Card.Body style={{ padding: 32 }}>
                <h5 style={{ fontWeight: 700, marginBottom: 14 }}>
                  Why contact Futurely?
                </h5>

                <ul
                  style={{
                    paddingLeft: 18,
                    color: "#495057",
                    lineHeight: 1.8,
                    marginBottom: 20,
                  }}
                >
                  <li>Exam preparation queries</li>
                  <li>College & admission guidance</li>
                  <li>Issues with resources or PDFs</li>
                  <li>Suggestions & feedback</li>
                  <li>Partnership or collaboration</li>
                </ul>

                <div
                  style={{
                    padding: 16,
                    background: "#f1f5ff",
                    borderRadius: 10,
                    fontSize: "0.95rem",
                    color: "#333",
                    marginBottom: 22,
                  }}
                >
                  ⏱️ <strong>Response time:</strong>
                  <br />
                  We usually reply within <strong>24–48 hours</strong> on working days.
                </div>

                {/* Email Section */}
                <div style={{ textAlign: "center" }}>
                  <Envelope size={34} color="#0d6efd" style={{ marginBottom: 10 }} />

                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "#495057",
                      marginBottom: 6,
                    }}
                  >
                    You can directly email us at:
                  </p>

                  <a
                    href="mailto:karan.kumar.dl92@gmail.com"
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: "#0d6efd",
                      textDecoration: "none",
                    }}
                  >
                    karan.kumar.dl92@gmail.com
                  </a>

                  <p
                    style={{
                      marginTop: 12,
                      fontSize: "0.85rem",
                      color: "#6c757d",
                    }}
                  >
                    Please include all relevant details so we can assist you faster.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Contact;

import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const About = () => {
  return (
    <main style={{ background: "#f8fbff", minHeight: "100vh" }}>
      <Container style={{ maxWidth: 1000, padding: "60px 16px" }}>
        {/* Header */}
        <Row className="mb-5 text-center">
          <Col>
            <h1 style={{ fontWeight: 800, color: "#212529" }}>
              About Futurely
            </h1>
            <p
              style={{
                marginTop: 12,
                fontSize: "1.05rem",
                color: "#495057",
                maxWidth: 720,
                marginInline: "auto",
                lineHeight: 1.7,
              }}
            >
              Futurely is a modern education platform built to help students
              prepare for exams, discover the right colleges, and make informed
              academic decisions with confidence.
            </p>
          </Col>
        </Row>

        {/* Main Card */}
        <Row className="justify-content-center">
          <Col md={10}>
            <Card
              style={{
                border: "none",
                borderRadius: 16,
                background: "#ffffff",
                boxShadow: "0 12px 32px rgba(0,0,0,0.06)",
              }}
            >
              <Card.Body style={{ padding: 36 }}>
                {/* Mission */}
                <section style={{ marginBottom: 28 }}>
                  <h4 style={{ fontWeight: 700, marginBottom: 10 }}>
                    Our Mission
                  </h4>
                  <p
                    style={{
                      color: "#495057",
                      fontSize: "0.98rem",
                      lineHeight: 1.7,
                    }}
                  >
                    Our mission is to simplify exam preparation and college
                    discovery for students across India by providing reliable
                    resources, accurate information, and practical guidance —
                    all in one place.
                  </p>
                </section>

                {/* What We Do */}
                <section style={{ marginBottom: 28 }}>
                  <h4 style={{ fontWeight: 700, marginBottom: 10 }}>
                    What We Do
                  </h4>
                  <ul
                    style={{
                      paddingLeft: 18,
                      color: "#495057",
                      lineHeight: 1.8,
                      fontSize: "0.98rem",
                    }}
                  >
                    <li>Provide exam preparation resources and practice material</li>
                    <li>Help students explore colleges and admission options</li>
                    <li>Offer past year question papers and exam insights</li>
                    <li>Guide students in making better academic choices</li>
                  </ul>
                </section>

                {/* Why Futurely */}
                <section style={{ marginBottom: 28 }}>
                  <h4 style={{ fontWeight: 700, marginBottom: 10 }}>
                    Why Futurely?
                  </h4>
                  <p
                    style={{
                      color: "#495057",
                      fontSize: "0.98rem",
                      lineHeight: 1.7,
                    }}
                  >
                    Many students struggle with scattered information, outdated
                    resources, and confusing admission processes. Futurely is
                    designed to be clear, focused, and student-first — helping
                    learners move from uncertainty to clarity.
                  </p>
                </section>

                {/* Values */}
                <section>
                  <h4 style={{ fontWeight: 700, marginBottom: 10 }}>
                    Our Values
                  </h4>
                  <ul
                    style={{
                      paddingLeft: 18,
                      color: "#495057",
                      lineHeight: 1.8,
                      fontSize: "0.98rem",
                    }}
                  >
                    <li>Accuracy and trust in information</li>
                    <li>Student-centric design and experience</li>
                    <li>Simplicity over complexity</li>
                    <li>Continuous improvement and learning</li>
                  </ul>
                </section>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default About;

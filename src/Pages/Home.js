import React from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import {
  BookHalf,
  Building,
  Mortarboard,
  GraphUp,
  People,
  GlobeCentralSouthAsia,
  ArrowRight,
} from "react-bootstrap-icons";

export default function Home() {
  return (
    <main style={{ background: "#f4f8ff", minHeight: "100vh" }}>
      {/* ================= HERO ================= */}
      <section
        style={{
          padding: "88px 0 64px",
          background:
            "linear-gradient(135deg, #0d6efd 0%, #4f9cff 100%)",
          color: "#ffffff",
        }}
      >
        <Container style={{ maxWidth: 1100 }}>
          <Row className="align-items-center">
            <Col md={7}>
              <Badge
                bg="light"
                text="primary"
                style={{ marginBottom: 14 }}
              >
                India’s Engineering Education Platform
              </Badge>

              <h1 style={{ fontWeight: 900, lineHeight: 1.15 }}>
                One platform for every
                <br />
                <span style={{ color: "#ffeb3b" }}>
                  Engineering Student
                </span>
              </h1>

              <p
                style={{
                  fontSize: "1.1rem",
                  marginTop: 18,
                  opacity: 0.95,
                  maxWidth: 520,
                }}
              >
                Diploma & B.Tech exam preparation, PYQs, semester resources,
                college discovery, and career mentorship — trusted by students
                across all states of India.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 14,
                  marginTop: 26,
                  flexWrap: "wrap",
                }}
              >
                <Button size="lg" variant="light" href="/college-finder">
                  Explore Colleges <ArrowRight size={18} />
                </Button>
                <Button
                  size="lg"
                  variant="outline-light"
                  href="/exams"
                >
                  Prepare for Exams
                </Button>
              </div>
            </Col>

            <Col md={5} className="d-none d-md-block">
              <div
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(12px)",
                  borderRadius: 18,
                  padding: 28,
                  boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
                }}
              >
                <h6 style={{ fontWeight: 700, marginBottom: 16 }}>
                  Why students choose Futurely
                </h6>
                <ul
                  style={{
                    paddingLeft: 18,
                    lineHeight: 1.9,
                    opacity: 0.95,
                  }}
                >
                  <li>All engineering exams in one place</li>
                  <li>PYQs & semester resources</li>
                  <li>Diploma & B.Tech colleges nationwide</li>
                  <li>Career advice & mentorship</li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= TRUST METRICS ================= */}
      <section style={{ padding: "56px 0" }}>
        <Container style={{ maxWidth: 1100 }}>
          <Row className="text-center g-4">
            {[
              { label: "Engineering Exams", value: "20+" },
              { label: "Colleges Listed", value: "1000+" },
              { label: "States Covered", value: "All India" },
              { label: "Resources Updated", value: "Weekly" },
            ].map((item) => (
              <Col key={item.label} md={3} sm={6}>
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: 16,
                    padding: 26,
                    boxShadow: "0 15px 40px rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 800,
                      color: "#0d6efd",
                    }}
                  >
                    {item.value}
                  </div>
                  <div style={{ color: "#6c757d" }}>
                    {item.label}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ================= CORE FEATURES ================= */}
      <section style={{ padding: "72px 0" }}>
        <Container style={{ maxWidth: 1100 }}>
          <Row className="text-center mb-5">
            <Col>
              <h2 style={{ fontWeight: 800 }}>
                What You Get on Futurely
              </h2>
              <p className="text-muted mt-2">
                Designed for ITI, Diploma & B.Tech students
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            {[
              {
                icon: <BookHalf size={34} />,
                title: "Exam Preparation",
                desc: "PYQs, exam updates, and structured preparation for all engineering exams.",
              },
              {
                icon: <Building size={34} />,
                title: "College Finder",
                desc: "Explore diploma & B.Tech colleges across every Indian state.",
              },
              {
                icon: <Mortarboard size={34} />,
                title: "Semester Resources",
                desc: "Branch-wise notes, syllabus, and semester learning material.",
              },
              {
                icon: <People size={34} />,
                title: "Mentorship & Counselling",
                desc: "Personal mentorship and counselling directly from Futurely for academic and college guidance.",
              },
              {
                icon: <GraphUp size={34} />,
                title: "Career Roadmaps",
                desc: "Clear, realistic career paths for ITI, Diploma, Degree and beyond.",
              },
              {
                icon: <GlobeCentralSouthAsia size={34} />,
                title: "Jobs & Career Opportunities",
                desc: "Internships, job guidance, and career opportunities tailored for engineering students.",
              },
            ].map((f) => (
              <Col md={4} sm={6} key={f.title}>
                <Card
                  style={{
                    border: "none",
                    borderRadius: 18,
                    height: "100%",
                    boxShadow: "0 18px 50px rgba(0,0,0,0.07)",
                  }}
                >
                  <Card.Body style={{ padding: 30 }}>
                    <div
                      style={{
                        marginBottom: 16,
                        color: "#0d6efd",
                      }}
                    >
                      {f.icon}
                    </div>
                    <h5 style={{ fontWeight: 700 }}>
                      {f.title}
                    </h5>
                    <p
                      style={{
                        color: "#495057",
                        marginBottom: 0,
                      }}
                    >
                      {f.desc}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ================= CTA ================= */}
      <section
        style={{
          padding: "72px 0",
          background: "#ffffff",
        }}
      >
        <Container style={{ maxWidth: 1000 }}>
          <Row className="text-center">
            <Col>
              <h3 style={{ fontWeight: 800 }}>
                Shaping the future of engineering education
              </h3>
              <p
                style={{
                  color: "#6c757d",
                  maxWidth: 700,
                  margin: "14px auto",
                }}
              >
                Futurely is evolving into a complete ecosystem for students —
                learning, discovery, mentorship, and career growth.
              </p>
              <Button size="lg" href="/about">
                Learn more about Futurely
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}

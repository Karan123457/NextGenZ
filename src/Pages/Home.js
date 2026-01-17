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
    <main style={{ backgroundColor: "#F8FAFC", minHeight: "100vh" }}>

      {/* ================= HERO ================= */}
      <section
        style={{
          padding: "90px 0 70px",
          background:
            "linear-gradient(135deg, #0F172A 0%, #1E293B 45%, #2563EB 100%)",
          color: "#ffffff",
        }}
      >
        <Container style={{ maxWidth: 1100 }}>
          <Row className="align-items-center g-5">
            <Col md={7}>
              <Badge
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  padding: "8px 14px",
                  fontSize: "0.85rem",
                }}
              >
                India’s Engineering Education Platform
              </Badge>

              <h1
                style={{
                  fontWeight: 900,
                  lineHeight: 1.15,
                  marginTop: 18,
                }}
              >
                One Platform for Every <br />
                <span style={{ color: "#38BDF8" }}>
                  Engineering Student
                </span>
              </h1>

              <p
                style={{
                  fontSize: "1.05rem",
                  marginTop: 18,
                  color: "#E5E7EB",
                  maxWidth: 520,
                }}
              >
                Diploma & B.Tech exam preparation, PYQs, semester resources,
                college discovery, and career mentorship — trusted by students
                across India.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 14,
                  marginTop: 28,
                  flexWrap: "wrap",
                }}
              >
                <Button size="lg" variant="light" href="/college-finder">
                  Explore Colleges <ArrowRight size={18} />
                </Button>

                <Button size="lg" variant="outline-light" href="/exams">
                  Prepare for Exams
                </Button>
              </div>
            </Col>

            <Col md={5} className="d-none d-md-block">
              <div
                style={{
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(14px)",
                  borderRadius: 20,
                  padding: 30,
                }}
              >
                <h6 style={{ fontWeight: 700, marginBottom: 16 }}>
                  Why Students Choose Futurely
                </h6>
                <ul
                  style={{
                    paddingLeft: 18,
                    lineHeight: 1.9,
                    color: "#E5E7EB",
                  }}
                >
                  <li>All engineering exams in one place</li>
                  <li>PYQs & semester resources</li>
                  <li>Diploma & B.Tech colleges nationwide</li>
                  <li>Career guidance & mentorship</li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= TRUST METRICS ================= */}
      <section style={{ padding: "60px 0" }}>
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
                    background: "#FFFFFF",
                    borderRadius: 18,
                    padding: 28,
                    boxShadow: "0 15px 35px rgba(15,23,42,0.08)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 800,
                      color: "#2563EB",
                    }}
                  >
                    {item.value}
                  </div>
                  <div style={{ color: "#64748B" }}>
                    {item.label}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ================= CORE FEATURES ================= */}
      <section style={{ padding: "75px 0" }}>
        <Container style={{ maxWidth: 1100 }}>
          <Row className="text-center mb-5">
            <Col>
              <h2 style={{ fontWeight: 800, color: "#0F172A" }}>
                What You Get on Futurely
              </h2>
              <p style={{ color: "#64748B", marginTop: 8 }}>
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
                desc: "Personal academic and college guidance from Futurely.",
              },
              {
                icon: <GraphUp size={34} />,
                title: "Career Roadmaps",
                desc: "Clear, realistic career paths for engineering students.",
              },
              {
                icon: <GlobeCentralSouthAsia size={34} />,
                title: "Jobs & Opportunities",
                desc: "Internships and job guidance tailored for students.",
              },
            ].map((f) => (
              <Col md={4} sm={6} key={f.title}>
                <Card
                  style={{
                    border: "none",
                    borderRadius: 20,
                    height: "100%",
                    boxShadow: "0 18px 45px rgba(15,23,42,0.08)",
                  }}
                >
                  <Card.Body style={{ padding: 32 }}>
                    <div style={{ color: "#2563EB", marginBottom: 16 }}>
                      {f.icon}
                    </div>
                    <h5 style={{ fontWeight: 700, color: "#0F172A" }}>
                      {f.title}
                    </h5>
                    <p style={{ color: "#475569", marginBottom: 0 }}>
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
      <section style={{ padding: "75px 0", background: "#FFFFFF" }}>
        <Container style={{ maxWidth: 900 }}>
          <Row className="text-center">
            <Col>
              <h3 style={{ fontWeight: 800, color: "#0F172A" }}>
                Shaping the Future of Engineering Education
              </h3>
              <p
                style={{
                  color: "#64748B",
                  maxWidth: 650,
                  margin: "14px auto 24px",
                }}
              >
                Futurely is building a complete ecosystem for learning,
                discovery, mentorship, and career growth.
              </p>
              <Button size="lg" href="/about">
                Learn More About Futurely
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

    </main>
  );
}

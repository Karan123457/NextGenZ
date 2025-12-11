import React from "react";
import { Container, Row, Col, Nav, Button } from "react-bootstrap";
import { Facebook, Instagram, Linkedin, Youtube, Envelope, Telephone } from "react-bootstrap-icons";

// Universal, production-ready Footer for Futurely
// - Mobile-first, accessible, and ready to extend
// - Replace social URLs and phone/email if neededP
// - Keeps copy intentionally universal to fit future content

const Footer = ({ yearOverride }) => {
  const year = yearOverride || new Date().getFullYear();

  return (
    <footer aria-label="Site footer" style={{ background: "#f8fbff" }}>
      <Container style={{ maxWidth: 1100, padding: "28px 16px" }}>
        <Row className="gy-4">
          {/* Brand */}
          <Col xs={12} md={4}>
            <a href="/" style={{ color: "#0d6efd", textDecoration: "none", fontWeight: 800, fontSize: "1.1rem" }}>
              Futurely
            </a>
           <p style={{ marginTop: 8, color: "#495057", fontSize: "0.95rem", lineHeight: 1.5 }}>
  Your trusted learning and college-discovery platform offering modern resources, exam preparation, and tools to help students succeed across exams and find the right colleges nationwide.
</p>


            {/* Socials - touch friendly */}
            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube (opens in new tab)"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  padding: 8,
                  borderRadius: 8,
                  background: "#FF0000",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                }}
              >
                <Youtube size={20} color="#fff" />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram (opens in new tab)"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  padding: 8,
                  borderRadius: 8,
                  background: "#E1306C",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                }}
              >
                <Instagram size={20} color="#fff" />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (opens in new tab)"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  padding: 8,
                  borderRadius: 8,
                  background: "#0077B5",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                }}
              >
                <Linkedin size={20} color="#fff" />
              </a>
            </div>
          </Col>

          {/* Links */}
          <Col xs={12} md={5}>
            <Row>
              <Col xs={6} sm={4}>
                <h6 style={{ color: "#0d6efd", marginBottom: 8 }}>Resources</h6>
                <Nav className="flex-column" style={{ fontSize: "0.95rem" }}>
                  <Nav.Link href="/jh-polytechnic">Jharkhand Polytechnic</Nav.Link>
                  <Nav.Link href="/jharkhand-d2d">D2D (B.Tech Lateral)</Nav.Link>
                  <Nav.Link href="/jh-question-paper">Past Year Papers</Nav.Link>
                </Nav>
              </Col>

              <Col xs={6} sm={4}>
                <h6 style={{ color: "#0d6efd", marginBottom: 8 }}>Company</h6>
                <Nav className="flex-column" style={{ fontSize: "0.95rem" }}>
                  <Nav.Link href="/privacy-policy">Privacy Policy</Nav.Link>
                  <Nav.Link href="/terms-and-conditions">Terms &amp; Conditions</Nav.Link>
                  <Nav.Link href="/refund-policy">Refund Policy</Nav.Link>
                </Nav>
              </Col>

              <Col xs={12} sm={4} style={{ marginTop: 8 }}>
                <h6 style={{ color: "#0d6efd", marginBottom: 8 }}>More</h6>
                <Nav className="flex-column" style={{ fontSize: "0.95rem" }}>
                  <Nav.Link href="/sitemap.xml">Sitemap</Nav.Link>
                  <Nav.Link href="/contact">Contact Us</Nav.Link>
                  <Nav.Link href="/pricing">Pricing</Nav.Link>
                </Nav>
              </Col>
            </Row>
          </Col>

          {/* Contact & CTA */}
          <Col xs={12} md={3}>
            <h6 style={{ color: "#0d6efd", marginBottom: 8 }}>Contact</h6>
            <div style={{ color: "#333", fontSize: "0.95rem", lineHeight: 1.5 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Envelope size={16} />
                <a href="mailto:karan.kumar.dl92@gmail.com" style={{ color: "#0d6efd", textDecoration: "none" }}>karan.kumar.dl92@gmail.com</a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Telephone size={16} />
                <a href="tel:+918287426663" style={{ color: "#0d6efd", textDecoration: "none" }}>+91 82874 26663</a>
              </div>

              <div style={{ marginTop: 12 }}>
                <a href="/pricing" style={{ textDecoration: "none" }}>
                  <Button style={{ background: "linear-gradient(90deg,#0d6efd,#6610f2)", border: "none", padding: "8px 14px", fontWeight: 700 }}>
                    Explore Courses
                  </Button>
                </a>
              </div>
            </div>
          </Col>

        </Row>

        {/* Divider + bottom */}
        <div style={{ borderTop: "1px solid #eef2f7", marginTop: 20, paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{ color: "#666", fontSize: "0.9rem" }}>
            © {year} Futurely. All rights reserved.
            <span style={{ marginLeft: 12 }}>
              <a href="/privacy-policy" style={{ color: "#999", textDecoration: "none", marginRight: 8 }}>Privacy</a>
              <a href="/terms-and-conditions" style={{ color: "#999", textDecoration: "none" }}>Terms</a>
            </span>
          </div>

          <div style={{ color: "#999", fontSize: "0.85rem", textAlign: "right" }}>
            <div>All content & PDFs are provided for educational purposes only.</div>
            <div>Website by Futurely.</div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

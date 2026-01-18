import React from "react";
import { Container, Row, Col, Nav, Button } from "react-bootstrap";
import { Instagram, Linkedin, Youtube } from "react-bootstrap-icons";

const Footer = ({ yearOverride }) => {
  const year = yearOverride || new Date().getFullYear();

  const linkStyle = {
    color: "#495057",
    textDecoration: "none",
    padding: "4px 0",
  };

  return (
    <footer aria-label="Site footer" style={{ background: "#f8fbff" }}>
      <Container style={{ maxWidth: 1100, padding: "32px 16px" }}>
        <Row className="gy-4">
          {/* Brand */}
          <Col xs={12} md={4}>
            <a
              href="/"
              style={{
                color: "#0d6efd",
                textDecoration: "none",
                fontWeight: 800,
                fontSize: "1.15rem",
              }}
            >
              Futurely
            </a>

            <p
              style={{
                marginTop: 10,
                color: "#495057",
                fontSize: "0.95rem",
                lineHeight: 1.6,
              }}
            >
              A modern learning and college-discovery platform providing exam
              preparation, trusted resources, and guidance to help students
              choose the right academic path.
            </p>

            {/* Socials */}
            <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  background: "#ffeded",
                }}
              >
                <Youtube size={18} color="#FF0000" />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  background: "#fff0f6",
                }}
              >
                <Instagram size={18} color="#E1306C" />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  background: "#eef5ff",
                }}
              >
                <Linkedin size={18} color="#0077B5" />
              </a>
            </div>
          </Col>

          {/* Links */}
          <Col xs={12} md={5}>
            <Row>
              <Col xs={6} sm={4}>
                <h6 style={{ color: "#212529", marginBottom: 10 }}>
                  Resources
                </h6>
                <Nav className="flex-column" style={{ fontSize: "0.95rem" }}>
                  <Nav.Link href="/jh-polytechnic" style={linkStyle}>
                    Jharkhand Polytechnic
                  </Nav.Link>
                  <Nav.Link href="/jharkhand-d2d" style={linkStyle}>
                    D2D (B.Tech Lateral)
                  </Nav.Link>
                  <Nav.Link href="/jh-question-paper" style={linkStyle}>
                    Past Year Papers
                  </Nav.Link>
                </Nav>
              </Col>

              <Col xs={6} sm={4}>
                <h6 style={{ color: "#212529", marginBottom: 10 }}>
                  Company
                </h6>
                <Nav className="flex-column" style={{ fontSize: "0.95rem" }}>
                  <Nav.Link href="/privacy-policy" style={linkStyle}>
                    Privacy Policy
                  </Nav.Link>
                  <Nav.Link href="/terms-and-conditions" style={linkStyle}>
                    Terms & Conditions
                  </Nav.Link>
                  <Nav.Link href="/refund-policy" style={linkStyle}>
                    Refund Policy
                  </Nav.Link>
                  <Nav.Link href="/about" style={linkStyle}>
                    About Us
                  </Nav.Link>
                </Nav>
              </Col>
            </Row>
          </Col>

          {/* Contact CTA */}
          <Col xs={12} md={3}>
            <h6 style={{ color: "#212529", marginBottom: 10 }}>
              Need Help?
            </h6>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#495057",
                lineHeight: 1.6,
                marginBottom: 14,
              }}
            >
              Have questions or need guidance? Reach out to us anytime.
            </p>

            <Button
              href="/contact"
              variant="primary"
              style={{
                width: "100%",
                borderRadius: 8,
                fontWeight: 500,
              }}
            >
              Contact Us
            </Button>
          </Col>
        </Row>

        {/* Bottom */}
        <div
          style={{
            borderTop: "1px solid #eef2f7",
            marginTop: 28,
            paddingTop: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div style={{ color: "#6c757d", fontSize: "0.9rem" }}>
            © {year} Futurely. All rights reserved.
          </div>

          <div style={{ color: "#9aa0a6", fontSize: "0.85rem" }}>
            Educational content only · Built by Futurely
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

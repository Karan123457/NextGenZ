import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Button, Modal, Form } from "react-bootstrap";
import { FaGoogle, FaFacebook } from "react-icons/fa";

export default function Header() {
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); // Track current URL

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handle scroll background fade
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Career Advisor", path: "/Counselling" },
    { name: "Exam Preparation", path: "/Exam_Preparation" },
    { name: "Resources", path: "/resources" },
    { name: "Jobs", path: "/jobs" },
  ];

  return (
    <>
      {/* Navbar */}
      <Navbar
        expand="lg"
        fixed="top"//sticky="top"
        className={`py-2 ${scrolled ? "navbar-fade" : "navbar-clear"}`}
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            className="fw-bold text-primary fs-4 brand-name"
          >
            Futurely
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0 align-items-center" navbarScroll>
              {navLinks.map((item, idx) => (
                <Nav.Link
                  key={idx}
                  as={Link}
                  to={item.path}
                  className={`fw-semibold nav-animated-link mx-2 ${location.pathname === item.path ? "active-link" : ""
                    }`}
                >
                  {item.name}
                </Nav.Link>
              ))}

              {/* Explore Dropdown */}
              <Nav.Item className="dropdown mx-2">
                <button
                  className="nav-link dropdown-toggle fw-semibold nav-animated-link"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Explore
                </button>
                <ul className="dropdown-menu shadow-sm border-0 rounded-3">
                  <li><button className="dropdown-item" onClick={() => { }}>Colleges</button></li>
                  <li><button className="dropdown-item" onClick={() => { }}>Schools</button></li>
                  <li><button className="dropdown-item" onClick={() => { }}>Courses</button></li>
                </ul>
              </Nav.Item>
            </Nav>

            <Button
              variant="primary"
              className="px-4 rounded-pill fw-semibold"
              onClick={handleShow}
            >
              Login / Register
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ✅ Login Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold text-primary ms-auto">
            Welcome Back!
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4">
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your full name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="your@email.com" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </div>
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <Form.Check type="checkbox" label="Remember me" />
              <button className="btn btn-link text-decoration-none small text-primary p-0" onClick={() => { }}>
                Forgot password?
              </button>
            </div>

            <Button variant="primary" type="submit" className="w-100 rounded-pill mb-3">
              Sign In
            </Button>

            <div className="text-center text-muted mb-3">or continue with</div>

            <div className="d-flex gap-2">
              <Button variant="outline-danger" className="w-50 rounded-pill">
                <FaGoogle className="me-2" /> Google
              </Button>
              <Button variant="outline-primary" className="w-50 rounded-pill">
                <FaFacebook className="me-2" /> Facebook
              </Button>
            </div>

            <div className="text-center mt-4">
              <small>
                Don’t have an account?{" "}
                <button className="btn btn-link text-decoration-none fw-semibold text-primary p-0" onClick={() => { }}>
                  Sign up
                </button>
              </small>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* ✨ Styles Section */}
      <style>{`
        /* Scroll Fade Navbar */
        .navbar-clear {
          background-color: rgba(255, 255, 255, 0.98);
          transition: all 0.2s ease-in-out;
        }
        .navbar-fade {
          background-color: #e9f3ff !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.4s ease-in-out;
        }

        /* Hover animation for nav links */
        .nav-animated-link {
          position: relative;
          color: #212529 !important;
          text-decoration: none;
          transition: color 0.2s ease-in-out;
        }

        .nav-animated-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 0;
          height: 2px;
          background-color: #0d6efd;
          transition: width 0.3s ease;
        }

        .nav-animated-link:hover {
          color: #0d6efd !important;
        }

        .nav-animated-link:hover::after {
          width: 100%;
        }

        /* Active link style */
        .active-link {
          color: #0d6efd !important;
          font-weight: 600;
        }
        .active-link::after {
          width: 100%;
        }

        /* Dropdown hover look */
        .dropdown-menu a:hover {
          background-color: #f0f4ff;
          color: #0d6efd;
        }

        .brand-name {
          letter-spacing: 0.5px;
        }

        .navbar {
          transition: all 0.4s ease-in-out;
        }
      `}</style>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Button, Modal, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); // Track current URL
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // 🔐 Auth state
  const { user, isLoggedIn, login, logout } = useAuth();




  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // Handle scroll background fade

  useEffect(() => {
    window.openLoginModal = () => setShow(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Colleges", path: "/colleges" },
    { name: "Exam Preparation", path: "/Exam_Preparation" },
    { name: "Resources", path: "/resources" },
    { name: "Jobs", path: "/jobs" },
  ];
  const API_BASE = "https://futurely-backend.onrender.com/api";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const url = isRegister
      ? `${API_BASE}/auth/register`
      : `${API_BASE}/auth/login`;

    const payload = isRegister
      ? { name, email, password }
      : { email, password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (data.token) {
        login(data.token, data.user);

        setEmail("");
        setPassword("");
        setName("");

        handleClose();
      }


    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }

  };

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
            className="d-flex align-items-center gap-2 brand-name"
          >
            <img
              src="/logo.png"
              alt="Futurely Logo"
              className="brand-logo"
            />
            <span className="fw-bold fs-4 text-primary">
              Futurely
            </span>
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

            {isLoggedIn ? (
              <div className="d-flex align-items-center gap-3">

                {/* Dashboard link */}
                 {/*<Link
                  to="/dashboard"
                  className="fw-semibold text-primary text-decoration-none"
                >
                  Dashboard
                </Link>
                */}
                 
             <Link to="/leaderboard">Leaderboard</Link>

                {/* Profile link */}
                <Link
                  to="/profile"
                  className="fw-semibold text-primary text-decoration-none"
                >
                  Hi, {user?.name}
                </Link>

                {/* Logout */}
                <Button
                  variant="outline-danger"
                  className="px-4 rounded-pill fw-semibold"
                  onClick={logout}
                >
                  Logout
                </Button>

              </div>
            ) : (
              <Button
                variant="primary"
                className="px-4 rounded-pill fw-semibold"
                onClick={handleShow}
              >
                Login / Register
              </Button>
            )}




          </Navbar.Collapse>
        </Container>
      </Navbar>


      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={false}
        size="lg"
        dialogClassName="auth-bottom-sheet"
      >

        <Modal.Body className="p-0 overflow-hidden rounded-4 position-relative">

          {/* ❌ Close Button */}
          <button
            onClick={handleClose}
            aria-label="Close"
            style={{
              position: "absolute",
              top: "14px",
              right: "16px",
              background: "transparent",
              border: "none",
              fontSize: "1.8rem",
              lineHeight: "1",
              color: "#6c757d",
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            &times;
          </button>

          <div className="d-flex flex-column flex-md-row">

            {/* LEFT – BRANDING */}
            <div
              className="d-none d-md-flex flex-column justify-content-center align-items-center text-white p-4"
              style={{
                width: "40%",
                background: "linear-gradient(135deg, #0d6efd, #6610f2)",
              }}
            >
              <img
                src="/logo.png"
                alt="Futurely"
                style={{ width: "72px", marginBottom: "1.2rem" }}
              />

              <h3 className="fw-bold mb-3" style={{ fontSize: "1.6rem" }}>
                Welcome to Futurely
              </h3>

              <p
                className="text-center opacity-75"
                style={{ fontSize: "1rem", lineHeight: "1.6" }}
              >
                Prepare smarter. Track progress.
                Crack exams with confidence.
              </p>
            </div>

            {/* RIGHT – FORM */}
            <div className="flex-grow-1 p-4 p-md-5">

              {/* Header */}
              <div className="text-center mb-4">
                <h3
                  className="fw-bold text-primary mb-2"
                  style={{ fontSize: "1.7rem" }}
                >
                  {isRegister ? "Create your account" : "Sign in to your account"}
                </h3>

                <p
                  className="text-muted"
                  style={{ fontSize: "0.95rem", lineHeight: "1.5" }}
                >
                  {isRegister
                    ? "Join Futurely and start your exam journey"
                    : "Welcome back! Please continue"}
                </p>
              </div>

              <Form onSubmit={handleSubmit}>

                {/* Name */}
                {isRegister && (
                  <Form.Group className="mb-3">
                    <Form.Label
                      className="fw-semibold"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Full name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>
                )}

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label
                    className="fw-semibold"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Email address
                  </Form.Label>
                  <Form.Control
                    autoFocus
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-2">
                  <Form.Label
                    className="fw-semibold"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Password
                  </Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </div>
                </Form.Group>

                {/* Forgot Password */}
                {!isRegister && (
                  <div className="text-end mb-3">
                    <Link
                      to="/forgot-password"
                      className="text-primary text-decoration-none"
                      style={{ fontSize: "0.85rem" }}
                      onClick={handleClose}
                    >
                      Forgot password?
                    </Link>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div
                    className="alert alert-danger py-2 text-center"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {error}
                  </div>
                )}

                {/* CTA */}
                <Button
                  type="submit"
                  className="w-100 rounded-pill fw-semibold py-2 mt-2"
                  disabled={loading}
                  style={{ fontSize: "1rem" }}
                >
                  {loading
                    ? isRegister
                      ? "Creating account..."
                      : "Signing in..."
                    : isRegister
                      ? "Create account"
                      : "Continue"}
                </Button>

                {/* Terms */}
                <p
                  className="text-center text-muted mt-3"
                  style={{ fontSize: "0.75rem", lineHeight: "1.4" }}
                >
                  By continuing, you agree to Futurely’s{" "}
                  <Link to="/terms-and-conditions">Terms</Link> and{" "}
                  <Link to="/privacy-policy">Privacy Policy</Link>.
                </p>

                {/* Toggle */}
                <div className="text-center mt-3">
                  <small style={{ fontSize: "0.85rem" }}>
                    {isRegister
                      ? "Already have an account?"
                      : "New to Futurely?"}{" "}
                    <button
                      type="button"
                      className="btn btn-link p-0 fw-semibold text-primary"
                      style={{ fontSize: "0.85rem" }}
                      onClick={() => setIsRegister(!isRegister)}
                    >
                      {isRegister ? "Sign in" : "Create an account"}
                    </button>
                  </small>
                </div>

              </Form>
            </div>
          </div>
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
          .brand-logo {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.brand-name {
  letter-spacing: 0.6px;
}

      `}</style>
    </>
  );
}


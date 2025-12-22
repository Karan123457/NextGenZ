import { useState } from "react";
import { Modal, Card, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = "https://futurely-backend.onrender.com/api";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1=email, 2=otp
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ================= SEND OTP ================= */
  const sendOTP = async () => {
    if (loading) return;

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setMessage("If the email is registered, an OTP has been sent");
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= RESET PASSWORD ================= */
  const resetPassword = async () => {
    if (loading) return;

    setError("");
    setMessage("");
    setLoading(true);

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setMessage("Password reset successful. You can login now.");
      setOtp("");
      setNewPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show
      centered
      backdrop="static"
      onHide={() => navigate("/")}
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold text-primary ms-auto">
          Forgot Password
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-0">
        <Card className="p-4 border-0">
          <p className="text-center text-muted small mb-4">
            {step === 1
              ? "We’ll send an OTP to your registered email"
              : "Enter OTP and create a new password"}
          </p>

          {/* STEP 1 – EMAIL */}
          {step === 1 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Button
                className="w-100 rounded-pill"
                onClick={sendOTP}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </>
          )}

          {/* STEP 2 – OTP + PASSWORD */}
          {step === 2 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>OTP</Form.Label>
                <Form.Control
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="success"
                className="w-100 rounded-pill"
                onClick={resetPassword}
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </>
          )}

          {/* MESSAGES */}
          {error && <div className="text-danger mt-3">{error}</div>}
          {message && <div className="text-success mt-3">{message}</div>}

          <div className="text-center mt-3">
            <Link
              to="/"
              className="text-decoration-none fw-semibold text-primary"
            >
              Back to Login
            </Link>
          </div>
        </Card>
      </Modal.Body>
    </Modal>
  );
}


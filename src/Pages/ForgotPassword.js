import { useState } from "react";
import { Container, Card, Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const API_BASE = "https://futurely-backend.onrender.com/api";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1=email, 2=otp
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      if (!res.ok) throw new Error(data.message);

      setMessage("If the email exists, OTP has been sent.");
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
      setError("Password must be at least 6 characters.");
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
      if (!res.ok) throw new Error(data.message);

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
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Card className="p-4 shadow-sm rounded-4" style={{ maxWidth: "420px", width: "100%" }}>
        <h4 className="text-center fw-bold text-primary mb-1">
          Forgot Password
        </h4>
        <p className="text-center text-muted small mb-4">
          {step === 1 ? "We’ll send an OTP to your email" : "Verify OTP & set a new password"}
        </p>

        {/* STEP 1 – EMAIL */}
        {step === 1 && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Button
              className="w-100 rounded-pill"
              onClick={sendOTP}
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </>
        )}

        {/* STEP 2 – OTP + PASSWORD */}
        {step === 2 && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>OTP</Form.Label>
              <Form.Control
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Minimum 6 characters"
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

        {/* FEEDBACK */}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {message && <Alert variant="success" className="mt-3">{message}</Alert>}

        <div className="text-center mt-4">
          <Link to="/" className="text-decoration-none fw-semibold text-primary">
            Back to Login
          </Link>
        </div>
      </Card>
    </Container>
  );
}

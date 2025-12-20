import { useState } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
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
  if (loading) return; // ✅ prevent multiple clicks

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

    setMessage("OTP sent to your email");
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
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="p-4 shadow-sm" style={{ width: "400px" }}>
        <h4 className="mb-3 text-center">Forgot Password</h4>

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
              className="w-100"
              onClick={sendOTP}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </>
        )}

        {/* STEP 2 – OTP + NEW PASSWORD */}
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
              className="w-100"
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
          <Link to="/">Back to Login</Link>
        </div>
      </Card>
    </Container>
  );
}

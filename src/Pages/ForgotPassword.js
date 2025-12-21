import { useState } from "react";
import { Modal, Card, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = "https://futurely-backend.onrender.com/api";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* sendOTP and resetPassword SAME AS YOUR CODE */

  return (
    <Modal
      show
      centered
      backdrop="static"
      onHide={() => navigate("/")}
    >
      <Modal.Body>
        <Card className="p-4 shadow-sm border-0">
          <h4 className="mb-3 text-center">Forgot Password</h4>

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

              <Button className="w-100" onClick={sendOTP} disabled={loading}>
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </>
          )}

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

          {error && <div className="text-danger mt-3">{error}</div>}
          {message && <div className="text-success mt-3">{message}</div>}

          <div className="text-center mt-3">
            <Link to="/" className="text-decoration-none">
              Back to Login
            </Link>
          </div>
        </Card>
      </Modal.Body>
    </Modal>
  );
}

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();

  // ⏳ Wait until auth is loaded
  if (loading) return null;

  // 🔐 Not logged in → redirect
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

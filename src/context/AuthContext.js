import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Load auth from localStorage on app start
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("userName");

    if (savedToken) {
      setToken(savedToken);
      setUser({ name: savedUser });
    }

    setLoading(false);
  }, []);

  // ✅ Login
  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", user.name);

    setToken(token);
    setUser(user);
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!token,
        login,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 🔥 Custom hook
export const useAuth = () => useContext(AuthContext);

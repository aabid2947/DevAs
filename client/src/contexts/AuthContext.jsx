import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if user and token exist in localStorage on load
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = (userData, token) => {
    try {
      setUser(userData);
      setToken(token);
      // Store in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
    } catch (error) {
      console.log(error);
      throw new Error("Error logging in");
    }
  };

  const logout = () => {
    try {
      setUser(null);

      setToken(null);
      // Remove from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    user,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

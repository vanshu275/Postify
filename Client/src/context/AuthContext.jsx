import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  getMe,
} from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check logged in user on app start
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getMe();
        setUser(data.data);
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Login
  const login = async (username, password) => {
    const data = await loginUser(username, password);

    const { user, token } = data.data;

    localStorage.setItem("token", token);
    setUser(user);

    return data;
  };

  // Register
  const register = async (username, password) => {
    const data = await registerUser(username, password);

    const { user, token } = data.data;

    localStorage.setItem("token", token);
    setUser(user);

    return data;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
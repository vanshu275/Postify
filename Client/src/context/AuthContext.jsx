import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // getMe function calling in the starting of the website
    useEffect(() => {
        const getMe = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await api.get("/auth/me");
                setUser(response.data.data);
            } catch (error) {
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        getMe();
    }, []);

    // Login logic
    const login = async (username, password) => {
        const response = await api.post("/auth/login", {
            username,
            password,
        });

        const { user, token } = response.data.data;

        localStorage.setItem("token", token);
        setUser(user);

        return response.data;
    };

    // Register logic
    const register = async (username, password) => {
        const response = await api.post("/auth/register", {
            username,
            password,
        });

        const { user, token } = response.data.data;

        localStorage.setItem("token", token);
        setUser(user);

        return response.data;
    };

    // Logout logic
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
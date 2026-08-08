import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [welcomeName, setWelcomeName] = useState(null);

  const refreshMe = useCallback(async () => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch {
      localStorage.removeItem("jwt");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshMe();
  }, [refreshMe]);

  const saveSession = (data) => {
    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }

    setUser(data);
  };

  // Signup (no login yet until OTP verification)
  const signup = async ({ username, email, password }) => {
    const { data } = await api.post("/auth/signup", {
      username,
      email,
      password,
    });

    return data;
  };

  // Verify OTP -> user is now logged in
  const verifyOtp = async ({ userId, otp }) => {
    const { data } = await api.post("/auth/verify-otp", {
      userId,
      otp,
    });

    saveSession(data);

    if (data.justVerified) {
      setWelcomeName(data.username);
    }

    return data;
  };

  const resendOtp = async ({ userId }) => {
    const { data } = await api.post("/auth/resend-otp", {
      userId,
    });

    return data;
  };

  // Login
  const login = async ({ email, password }) => {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    });

    if (data.needsVerification) {
      return data;
    }

    saveSession(data);

    return data;
  };

  const logout = async () => {
    await api.post("/auth/logout");

    localStorage.removeItem("jwt");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        signup,
        verifyOtp,
        resendOtp,
        login,
        logout,
        refreshMe,
        welcomeName,
        clearWelcome: () => setWelcomeName(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
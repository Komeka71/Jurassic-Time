import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true while we check for an existing session
  const [welcomeName, setWelcomeName] = useState(null); // set right after first verification

  const refreshMe = useCallback(async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshMe();
  }, [refreshMe]);

  // Does NOT log the user in — account is unverified until the OTP is confirmed.
  // Returns { userId, email } so the caller can route to the OTP screen.
  const signup = async ({ username, email, password }) => {
    const { data } = await api.post("/auth/signup", { username, email, password });
    return data;
  };

  const verifyOtp = async ({ userId, otp }) => {
    const { data } = await api.post("/auth/verify-otp", { userId, otp });
    setUser(data);
    if (data.justVerified) setWelcomeName(data.username);
    return data;
  };

  const resendOtp = async ({ userId }) => {
    const { data } = await api.post("/auth/resend-otp", { userId });
    return data;
  };

  const login = async ({ email, password }) => {
    const { data } = await api.post("/auth/login", { email, password });
    if (data.needsVerification) return data; // not logged in — caller routes to OTP screen
    setUser(data);
    return data;
  };

  // credential = the ID token string from Google's <GoogleLogin> button
  // const loginWithGoogle = async (credential) => {
  //   const { data } = await api.post("/auth/google", { credential });
  //   setUser(data);
  //   if (data.justVerified) setWelcomeName(data.username);
  //   return data;
  // };

  const logout = async () => {
    await api.post("/auth/logout");
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
        //loginWithGoogle,
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
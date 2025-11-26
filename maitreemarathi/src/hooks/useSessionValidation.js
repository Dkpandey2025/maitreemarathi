import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

export const useSessionValidation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const validateSession = async () => {
      const phone = localStorage.getItem("userPhone");
      const sessionToken = localStorage.getItem("sessionToken");
      const userType = localStorage.getItem("userType");

      // Skip validation for admin users
      if (userType === "admin") {
        return;
      }

      // If no session token, user needs to login
      if (!phone || !sessionToken) {
        console.log("No session found, redirecting to login");
        handleLogout();
        return;
      }

      try {
        const res = await axios.post(API_ENDPOINTS.VALIDATE_SESSION, {
          phone,
          sessionToken,
        });

        if (res.data.status === "error" || !res.data.valid) {
          console.log("Session invalid:", res.data.message);
          alert("Your session has expired. You have been logged in from another device.");
          handleLogout();
        }
      } catch (error) {
        console.error("Session validation error:", error);
        handleLogout();
      }
    };

    const handleLogout = () => {
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("userPhone");
      localStorage.removeItem("sessionToken");
      localStorage.removeItem("userType");
      navigate("/login", { replace: true });
    };

    // Validate session on mount
    validateSession();

    // Set up interval to check session every 30 seconds
    const interval = setInterval(validateSession, 30000);

    return () => clearInterval(interval);
  }, [navigate]);
};

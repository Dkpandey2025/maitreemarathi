import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);   // Logged in user
  const [fromPlan, setFromPlan] = useState(false);  // NEW: track navigation

  return (
    <AuthContext.Provider value={{ user, setUser, fromPlan, setFromPlan }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

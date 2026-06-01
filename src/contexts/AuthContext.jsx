// Authentication context — provides auth state throughout the app
import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/config";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  /**
   * Login with Option A:
   * - Validates username === "MOON" (env VITE_LOGIN_USERNAME)
   * - Signs in with the fixed internal email + provided password
   */
  const login = async (username, password) => {
    const expectedUsername = import.meta.env.VITE_LOGIN_USERNAME || "MOON";
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || "admin@birthdaylove.app";
    
    let email;
    const cleanUsername = username.trim().toLowerCase();
    
    if (cleanUsername === "admin" || cleanUsername === adminEmail.toLowerCase()) {
      email = adminEmail;
    } else if (username.trim().toUpperCase() === expectedUsername.toUpperCase()) {
      email = import.meta.env.VITE_AUTH_EMAIL || "moon@birthdaylove.app";
    } else {
      throw new Error("Invalid username.");
    }
    
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => signOut(auth);

  // Check if the signed-in user is the admin
  const isAdmin =
    user?.email === (import.meta.env.VITE_ADMIN_EMAIL || "admin@birthdaylove.app");

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

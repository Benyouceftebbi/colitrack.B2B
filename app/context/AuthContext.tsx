"use client"
import { auth } from "@/firebase/firebase";
import { User as FirebaseUser,User,signOut as firebaseSignOut, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ExtendedFirebaseUser extends FirebaseUser {
  user: {}| any,
}
// Define the shape of the context
interface AuthContextType {
  isAuthenticated: boolean;
  login: (email:string,password:string) => Promise<boolean>;
  logout: () => void;
  user:ExtendedFirebaseUser | null | false | User;
  
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<ExtendedFirebaseUser | null| User>(null);
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setIsAuthenticated(true);
      return true
    } catch (error) {
      console.error("Login Error:", error);
      setIsAuthenticated(false);
      setUser(null);
      return false
    }
  };


  const logout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  useEffect(() => {
    return onAuthStateChanged(auth, async (user:User | null) => {
      if (user) {
        setUser({...user});
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
  }, []);



  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user}}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 
"use client"
import { auth, functions } from "@/firebase/firebase";
import { User as FirebaseUser,User,signOut as firebaseSignOut, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { httpsCallable } from "firebase/functions";

interface ExtendedFirebaseUser extends FirebaseUser {
  user: {}| any,
}
// Define the shape of the context
interface AuthContextType {
  isAuthenticated: boolean;
  login: (email:string,password:string,isRemembered:boolean) => Promise<boolean>;
  logout: () => void;
  signup:(usr:any)=>Promise<FirebaseUser | null>
  user:ExtendedFirebaseUser | null | false | User;
  
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [user, setUser] = useState<ExtendedFirebaseUser | null| User>(null);
  const login = async (email: string, password: string, isRemembered: boolean) => {
    return setPersistence(auth, isRemembered?browserLocalPersistence:browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      })
      .then((userCredential) => {
        setUser(userCredential.user);
        setIsAuthenticated(true);
        return true;
      })
      .catch((error) => {
        console.error("Login Error:", error);
        setIsAuthenticated(false);
        setUser(null);
        return false;
      });
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
  const signup = async (usr: any): Promise<User | null> => {
    try {
      const { password, confirmPassword, ...safeUsr } = usr;
  
      // 1) Call backend signup (creates Auth user + Clients doc)
      const signupClient = httpsCallable(functions, "signupClient");
      const res: any = await signupClient({
        ...safeUsr,
        password, // we need password on backend, but NOT confirmPassword
      });
  
      if (!res?.data?.success) {
        console.error("Signup error:", res?.data?.reason, res?.data?.message);
        setIsAuthenticated(false);
        setUser(null);
        return null;
      }
  
      // 2) Sign in with the created credentials
      const userCredential = await signInWithEmailAndPassword(
        auth,
        usr.email,
        password
      );
  
      const user = userCredential.user;
  
      // 3) Update auth state
      setUser(user);
      setIsAuthenticated(true);
  
      console.log("Client created with UID:", res.data.uid);
  
      return user;
    } catch (error) {
      console.error("Signup Error:", error);
      setIsAuthenticated(false);
      setUser(null);
      return null;
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
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signup, user}}>
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
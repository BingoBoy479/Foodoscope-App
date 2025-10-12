import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AuthData {
  isAuthenticated: boolean;
  user: {
    email: string;
    name: string;
    avatar?: string;
  } | null;
}

interface AuthContextType {
  auth: AuthData;
  setAuth: (auth: AuthData) => void;
  currentAuthStep: 'loading' | 'signup' | 'login' | 'verification' | 'onboarding' | 'authenticated';
  setCurrentAuthStep: (step: 'loading' | 'signup' | 'login' | 'verification' | 'onboarding' | 'authenticated') => void;
  pendingEmail: string;
  setPendingEmail: (email: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentAuthStep, setCurrentAuthStep] = useState<'loading' | 'signup' | 'login' | 'verification' | 'onboarding' | 'authenticated'>('loading');
  const [pendingEmail, setPendingEmail] = useState('');
  const [auth, setAuth] = useState<AuthData>({
    isAuthenticated: false,
    user: null,
  });

  return (
    <AuthContext.Provider value={{
      auth,
      setAuth,
      currentAuthStep,
      setCurrentAuthStep,
      pendingEmail,
      setPendingEmail,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
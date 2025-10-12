import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface OnboardingData {
  name: string;
  goals: string[];
  gender: 'male' | 'female' | null;
  age: string;
  location: string;
  height: string;
  heightUnit: 'cm' | 'ft';
  weight: string;
  weightUnit: 'kg' | 'lbs';
  goalWeight: string;
  healthIssues: string[];
  dietaryPreferences: string[];
  timeframe: '3' | '6' | '9' | '12' | null;
  termsAccepted: boolean;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isCompleted: boolean;
  setIsCompleted: (completed: boolean) => void;
}

export const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    name: '',
    goals: [],
    gender: null,
    age: '',
    location: '',
    height: '',
    heightUnit: 'cm',
    weight: '',
    weightUnit: 'kg',
    goalWeight: '',
    healthIssues: [],
    dietaryPreferences: [],
    timeframe: null,
    termsAccepted: false,
  });

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  return (
    <OnboardingContext.Provider value={{
      data,
      updateData,
      currentStep,
      setCurrentStep,
      isCompleted,
      setIsCompleted,
    }}>
      {children}
    </OnboardingContext.Provider>
  );
}
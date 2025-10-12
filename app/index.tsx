import React from 'react';
import { View } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useOnboarding } from '../hooks/useOnboarding';
import OnboardingFlow from '../components/onboarding/OnboardingFlow';
import { Redirect } from 'expo-router';
import LoadingScreen from './loading';
import SignUpScreen from './signup';
import LoginScreen from './login';
import VerificationScreen from './verification';

export default function IndexScreen() {
  const authContext = useAuth();
  const onboardingContext = useOnboarding();

  // Add safety checks for context
  if (!authContext || !onboardingContext) {
    return null;
  }

  const { currentAuthStep } = authContext;
  const { isCompleted } = onboardingContext;

  // Handle authentication flow first
  switch (currentAuthStep) {
    case 'loading':
      return <LoadingScreen />;
    case 'signup':
      return <SignUpScreen />;
    case 'login':
      return <LoginScreen />;
    case 'verification':
      return <VerificationScreen />;
    case 'onboarding':
      if (isCompleted) {
        return <Redirect href="/(tabs)" />;
      }
      return (
        <View style={{ flex: 1 }}>
          <OnboardingFlow />
        </View>
      );
    case 'authenticated':
      return <Redirect href="/(tabs)" />;
    default:
      return <LoadingScreen />;
  }
}
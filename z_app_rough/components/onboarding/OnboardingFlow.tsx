import React from 'react';
import { View } from 'react-native';
import { useOnboarding } from '../../hooks/useOnboarding';
import { useAuth } from '../../hooks/useAuth';
import WelcomeScreen from './WelcomeScreen';
import GoalsScreen from './GoalsScreen';
import PersonalInfoScreen from './PersonalInfoScreen';
import PhysicalDataScreen from './PhysicalDataScreen';
import HealthIssuesScreen from './HealthIssuesScreen';
import DietaryPreferencesScreen from './DietaryPreferencesScreen';
import TimeframeScreen from './TimeframeScreen';
import TermsScreen from './TermsScreen';
import ConfirmScreen from './ConfirmScreen';

export default function OnboardingFlow() {
  const { currentStep } = useOnboarding();
  const { setCurrentAuthStep } = useAuth();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeScreen />;
      case 1:
        return <GoalsScreen />;
      case 2:
        return <PersonalInfoScreen />;
      case 3:
        return <PhysicalDataScreen />;
      case 4:
        return <HealthIssuesScreen />;
      case 5:
        return <DietaryPreferencesScreen />;
      case 6:
        return <TimeframeScreen />;
      case 7:
        return <TermsScreen />;
      case 8:
        return <ConfirmScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return <View style={{ flex: 1 }}>{renderCurrentStep()}</View>;
}
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOnboarding } from '../../hooks/useOnboarding';

export default function TermsScreen() {
  const insets = useSafeAreaInsets();
  const { data, updateData, setCurrentStep } = useOnboarding();

  const handleNext = () => {
    if (data.termsAccepted) {
      setCurrentStep(8);
    }
  };

  const handleBack = () => {
    setCurrentStep(6);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: '88%' }]} />
        </View>

        <Text style={styles.title}>Terms & Conditions</Text>

        <View style={styles.termsContainer}>
          <View style={styles.termItem}>
            <Text style={styles.termNumber}>1.</Text>
            <Text style={styles.termText}>
              <Text style={styles.termTitle}>Health Disclaimer</Text> - The app provides general 
              guidance and is not a substitute for professional medical or nutritional advice.
            </Text>
          </View>

          <View style={styles.termItem}>
            <Text style={styles.termNumber}>2.</Text>
            <Text style={styles.termText}>
              <Text style={styles.termTitle}>Data Accuracy</Text> - Food and fitness data are sourced 
              via third-party APIs and may not always be 100% accurate.
            </Text>
          </View>

          <View style={styles.termItem}>
            <Text style={styles.termNumber}>3.</Text>
            <Text style={styles.termText}>
              <Text style={styles.termTitle}>User Responsibility</Text> - You are responsible for 
              logging accurate data and keeping your account secure.
            </Text>
          </View>

          <View style={styles.termItem}>
            <Text style={styles.termNumber}>4.</Text>
            <Text style={styles.termText}>
              <Text style={styles.termTitle}>Privacy & Data Usage</Text> - Personal data is collected 
              and processed as per our Privacy Policy and may be shared with third-party APIs.
            </Text>
          </View>

          <View style={styles.termItem}>
            <Text style={styles.termNumber}>5.</Text>
            <Text style={styles.termText}>
              <Text style={styles.termTitle}>Subscriptions & Payments</Text> - Some features may 
              require payment; fees are non-refundable unless required by law.
            </Text>
          </View>

          <View style={styles.termItem}>
            <Text style={styles.termNumber}>6.</Text>
            <Text style={styles.termText}>
              <Text style={styles.termTitle}>Prohibited Activities</Text> - Misuse, false data entry, or 
              unauthorized API access may lead to account suspension.
            </Text>
          </View>

          <View style={styles.termItem}>
            <Text style={styles.termNumber}>7.</Text>
            <Text style={styles.termText}>
              <Text style={styles.termTitle}>Changes to Terms</Text> - We may update these terms, 
              and continued use of the app signifies your acceptance.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => updateData({ termsAccepted: !data.termsAccepted })}
        >
          <View style={[styles.checkbox, data.termsAccepted && styles.checkedBox]}>
            {data.termsAccepted && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxText}>I agree to terms and conditions</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextButton, !data.termsAccepted && styles.disabledButton]}
          onPress={handleNext}
          disabled={!data.termsAccepted}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginTop: 20,
    marginBottom: 40,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  termsContainer: {
    marginBottom: 30,
  },
  termItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  termNumber: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
    marginTop: 2,
  },
  termText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  termTitle: {
    fontWeight: '600',
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#CCC',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxText: {
    fontSize: 14,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#FF8A3C',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginLeft: 10,
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});
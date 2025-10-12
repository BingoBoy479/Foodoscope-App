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

const healthOptions = [
  'Diabetes',
  'Hypertension',
  'Arthritis',
  'Cholesterol',
  'Sleep issues',
  'Thyroid',
  'None',
];

export default function HealthIssuesScreen() {
  const insets = useSafeAreaInsets();
  const { data, updateData, setCurrentStep } = useOnboarding();

  const toggleHealthIssue = (issue: string) => {
    let currentIssues = [...data.healthIssues];
    
    if (issue === 'None') {
      currentIssues = currentIssues.includes('None') ? [] : ['None'];
    } else {
      const index = currentIssues.indexOf(issue);
      const noneIndex = currentIssues.indexOf('None');
      
      if (noneIndex > -1) {
        currentIssues.splice(noneIndex, 1);
      }
      
      if (index > -1) {
        currentIssues.splice(index, 1);
      } else {
        currentIssues.push(issue);
      }
    }
    
    updateData({ healthIssues: currentIssues });
  };

  const handleNext = () => {
    setCurrentStep(5);
  };

  const handleBack = () => {
    setCurrentStep(3);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: '55%' }]} />
        </View>

        <Text style={styles.title}>You</Text>
        <Text style={styles.subtitle}>Do you have any health issues?</Text>

        <View style={styles.optionsContainer}>
          {healthOptions.map((issue) => (
            <TouchableOpacity
              key={issue}
              style={[
                styles.option,
                data.healthIssues.includes(issue) && styles.selectedOption
              ]}
              onPress={() => toggleHealthIssue(issue)}
            >
              <Text style={[
                styles.optionText,
                data.healthIssues.includes(issue) && styles.selectedOptionText
              ]}>
                {issue}
              </Text>
              <View style={[
                styles.checkbox,
                data.healthIssues.includes(issue) && styles.selectedCheckbox
              ]}>
                {data.healthIssues.includes(issue) && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 30,
  },
  optionsContainer: {
    marginBottom: 30,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CCC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCheckbox: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
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
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});
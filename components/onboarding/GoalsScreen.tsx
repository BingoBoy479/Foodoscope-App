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

const goalOptions = [
  'Loose Weight',
  'Build Muscle',
  'Improve Digestion',
  'Improve Sleep Quality',
  'Maintain Healthy BMI',
  'Improve Skin & Hair',
  'Enhance Heart Health',
];

export default function GoalsScreen() {
  const insets = useSafeAreaInsets();
  const { data, updateData, setCurrentStep } = useOnboarding();

  const toggleGoal = (goal: string) => {
    const currentGoals = [...data.goals];
    const index = currentGoals.indexOf(goal);
    
    if (index > -1) {
      currentGoals.splice(index, 1);
    } else if (currentGoals.length < 3) {
      currentGoals.push(goal);
    }
    
    updateData({ goals: currentGoals });
  };

  const handleNext = () => {
    if (data.goals.length > 0) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(0);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: '22%' }]} />
        </View>

        <Text style={styles.title}>Goals</Text>
        <Text style={styles.subtitle}>Hi {data.name}, Tell us your goals</Text>
        <Text style={styles.instruction}>Select up to 3 most important goals</Text>

        <View style={styles.goalsContainer}>
          {goalOptions.map((goal) => (
            <TouchableOpacity
              key={goal}
              style={[
                styles.goalOption,
                data.goals.includes(goal) && styles.selectedGoal
              ]}
              onPress={() => toggleGoal(goal)}
            >
              <Text style={[
                styles.goalText,
                data.goals.includes(goal) && styles.selectedGoalText
              ]}>
                {goal}
              </Text>
              <View style={[
                styles.checkbox,
                data.goals.includes(goal) && styles.selectedCheckbox
              ]}>
                {data.goals.includes(goal) && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextButton, data.goals.length === 0 && styles.disabledButton]}
          onPress={handleNext}
          disabled={data.goals.length === 0}
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  instruction: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
  },
  goalsContainer: {
    marginBottom: 30,
  },
  goalOption: {
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
  selectedGoal: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
  },
  goalText: {
    fontSize: 16,
    color: '#333',
  },
  selectedGoalText: {
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
  disabledButton: {
    backgroundColor: '#CCC',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});
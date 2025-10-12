import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOnboarding } from '../../hooks/useOnboarding';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function PhysicalDataScreen() {
  const insets = useSafeAreaInsets();
  const { data, updateData, setCurrentStep } = useOnboarding();

  const handleNext = () => {
    if (data.height.trim() && data.weight.trim() && data.goalWeight.trim()) {
      setCurrentStep(4);
    }
  };

  const handleBack = () => {
    setCurrentStep(2);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: '44%' }]} />
        </View>

        <Text style={styles.title}>You</Text>
        <Text style={styles.subtitle}>Tell us about yourself</Text>

        {/* Height */}
        <View style={styles.section}>
          <Text style={styles.label}>Height</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your height"
              value={data.height}
              onChangeText={(text) => updateData({ height: text })}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              style={styles.unitSelector}
              onPress={() => updateData({ heightUnit: data.heightUnit === 'cm' ? 'ft' : 'cm' })}
            >
              <Text style={styles.unitText}>{data.heightUnit === 'cm' ? 'Cm' : 'Ft'}</Text>
              <FontAwesome name="chevron-down" size={12} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Weight */}
        <View style={styles.section}>
          <Text style={styles.label}>Weight</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your weight"
              value={data.weight}
              onChangeText={(text) => updateData({ weight: text })}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              style={styles.unitSelector}
              onPress={() => updateData({ weightUnit: data.weightUnit === 'kg' ? 'lbs' : 'kg' })}
            >
              <Text style={styles.unitText}>{data.weightUnit === 'kg' ? 'Kg' : 'Lbs'}</Text>
              <FontAwesome name="chevron-down" size={12} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Goal Weight */}
        <View style={styles.section}>
          <Text style={styles.label}>Goal Weight</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your goal weight"
              value={data.goalWeight}
              onChangeText={(text) => updateData({ goalWeight: text })}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.unitSelector}>
              <Text style={styles.unitText}>{data.weightUnit === 'kg' ? 'Kg' : 'Lbs'}</Text>
              <FontAwesome name="chevron-down" size={12} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.nextButton,
            (!data.height.trim() || !data.weight.trim() || !data.goalWeight.trim()) && styles.disabledButton
          ]}
          onPress={handleNext}
          disabled={!data.height.trim() || !data.weight.trim() || !data.goalWeight.trim()}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  section: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
  },
  unitSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginLeft: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  unitText: {
    fontSize: 16,
    color: '#333',
    marginRight: 8,
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
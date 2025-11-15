import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOnboarding } from '../../hooks/useOnboarding';

export default function PhysicalDataScreen() {
  const insets = useSafeAreaInsets();
  const { data, updateData, setCurrentStep } = useOnboarding();

  // Animated values for unit buttons
  const heightFtAnim = React.useRef(new Animated.Value(data.heightUnit === 'ft' ? 1 : 0.7)).current;
  const heightCmAnim = React.useRef(new Animated.Value(data.heightUnit === 'cm' ? 1 : 0.7)).current;
  const weightKgAnim = React.useRef(new Animated.Value(data.weightUnit === 'kg' ? 1 : 0.7)).current;
  const weightLbsAnim = React.useRef(new Animated.Value(data.weightUnit === 'lbs' ? 1 : 0.7)).current;

  const handleNext = () => {
    if (data.height.trim() && data.weight.trim() && data.goalWeight.trim()) {
      setCurrentStep(4);
    }
  };

  const handleBack = () => {
    setCurrentStep(2);
  };

  // Conversion functions
  const convertHeight = (value, fromUnit, toUnit) => {
    if (!value || value === '') return '';
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '';
    
    if (fromUnit === 'cm' && toUnit === 'ft') {
      return (numValue / 30.48).toFixed(2);
    } else if (fromUnit === 'ft' && toUnit === 'cm') {
      return (numValue * 30.48).toFixed(2);
    }
    return value;
  };

  const convertWeight = (value, fromUnit, toUnit) => {
    if (!value || value === '') return '';
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '';
    
    if (fromUnit === 'kg' && toUnit === 'lbs') {
      return (numValue * 2.20462).toFixed(2);
    } else if (fromUnit === 'lbs' && toUnit === 'kg') {
      return (numValue / 2.20462).toFixed(2);
    }
    return value;
  };

  // Number-only input handlers
  const handleHeightChange = (text) => {
    const numericText = text.replace(/[^0-9.]/g, '');
    if (numericText === '' || (parseFloat(numericText) > 0 && 
        ((data.heightUnit === 'cm' && parseFloat(numericText) <= 300) || 
         (data.heightUnit === 'ft' && parseFloat(numericText) <= 10)))) {
      updateData({ height: numericText });
    }
  };

  const handleWeightChange = (text) => {
    const numericText = text.replace(/[^0-9.]/g, '');
    if (numericText === '' || (parseFloat(numericText) > 0 && 
        ((data.weightUnit === 'kg' && parseFloat(numericText) <= 500) || 
         (data.weightUnit === 'lbs' && parseFloat(numericText) <= 1100)))) {
      updateData({ weight: numericText });
    }
  };

  const handleGoalWeightChange = (text) => {
    const numericText = text.replace(/[^0-9.]/g, '');
    if (numericText === '' || (parseFloat(numericText) > 0 && 
        ((data.weightUnit === 'kg' && parseFloat(numericText) <= 500) || 
         (data.weightUnit === 'lbs' && parseFloat(numericText) <= 1100)))) {
      updateData({ goalWeight: numericText });
    }
  };

  // Unit change handlers with conversion
  const handleHeightUnitChange = (newUnit) => {
    if (newUnit !== data.heightUnit) {
      // Convert height value
      const convertedHeight = convertHeight(data.height, data.heightUnit, newUnit);
      
      // Animate the transition
      Animated.parallel([
        Animated.spring(newUnit === 'ft' ? heightFtAnim : heightCmAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(newUnit === 'ft' ? heightCmAnim : heightFtAnim, {
          toValue: 0.7,
          useNativeDriver: true,
        }),
      ]).start();

      updateData({ 
        heightUnit: newUnit,
        height: convertedHeight
      });
    }
  };

  const handleWeightUnitChange = (newUnit) => {
    if (newUnit !== data.weightUnit) {
      // Convert weight and goal weight values
      const convertedWeight = convertWeight(data.weight, data.weightUnit, newUnit);
      const convertedGoalWeight = convertWeight(data.goalWeight, data.weightUnit, newUnit);
      
      // Animate the transition
      Animated.parallel([
        Animated.spring(newUnit === 'kg' ? weightKgAnim : weightLbsAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(newUnit === 'kg' ? weightLbsAnim : weightKgAnim, {
          toValue: 0.7,
          useNativeDriver: true,
        }),
      ]).start();

      updateData({ 
        weightUnit: newUnit,
        weight: convertedWeight,
        goalWeight: convertedGoalWeight
      });
    }
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
              onChangeText={handleHeightChange}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
            <View style={styles.unitContainer}>
              <TouchableOpacity onPress={() => handleHeightUnitChange('ft')}>
                <Animated.View style={[
                  styles.unitButton,
                  data.heightUnit === 'ft' && styles.selectedUnit,
                  { transform: [{ scale: heightFtAnim }] }
                ]}>
                  <Text style={[
                    styles.unitText,
                    data.heightUnit === 'ft' && styles.selectedUnitText
                  ]}>Ft</Text>
                </Animated.View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleHeightUnitChange('cm')}>
                <Animated.View style={[
                  styles.unitButton,
                  data.heightUnit === 'cm' && styles.selectedUnit,
                  { transform: [{ scale: heightCmAnim }] }
                ]}>
                  <Text style={[
                    styles.unitText,
                    data.heightUnit === 'cm' && styles.selectedUnitText
                  ]}>Cm</Text>
                </Animated.View>
              </TouchableOpacity>
            </View>
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
              onChangeText={handleWeightChange}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
            <View style={styles.unitContainer}>
              <TouchableOpacity onPress={() => handleWeightUnitChange('kg')}>
                <Animated.View style={[
                  styles.unitButton,
                  data.weightUnit === 'kg' && styles.selectedUnit,
                  { transform: [{ scale: weightKgAnim }] }
                ]}>
                  <Text style={[
                    styles.unitText,
                    data.weightUnit === 'kg' && styles.selectedUnitText
                  ]}>Kg</Text>
                </Animated.View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleWeightUnitChange('lbs')}>
                <Animated.View style={[
                  styles.unitButton,
                  data.weightUnit === 'lbs' && styles.selectedUnit,
                  { transform: [{ scale: weightLbsAnim }] }
                ]}>
                  <Text style={[
                    styles.unitText,
                    data.weightUnit === 'lbs' && styles.selectedUnitText
                  ]}>Lbs</Text>
                </Animated.View>
              </TouchableOpacity>
            </View>
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
              onChangeText={handleGoalWeightChange}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
            <View style={styles.unitContainer}>
              <TouchableOpacity onPress={() => handleWeightUnitChange('kg')}>
                <Animated.View style={[
                  styles.unitButton,
                  data.weightUnit === 'kg' && styles.selectedUnit,
                  { transform: [{ scale: weightKgAnim }] }
                ]}>
                  <Text style={[
                    styles.unitText,
                    data.weightUnit === 'kg' && styles.selectedUnitText
                  ]}>Kg</Text>
                </Animated.View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleWeightUnitChange('lbs')}>
                <Animated.View style={[
                  styles.unitButton,
                  data.weightUnit === 'lbs' && styles.selectedUnit,
                  { transform: [{ scale: weightLbsAnim }] }
                ]}>
                  <Text style={[
                    styles.unitText,
                    data.weightUnit === 'lbs' && styles.selectedUnitText
                  ]}>Lbs</Text>
                </Animated.View>
              </TouchableOpacity>
            </View>
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
  unitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  unitButton: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedUnit: {
    backgroundColor: '#E8F5E8',
  },
  unitText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  selectedUnitText: {
    color: '#4CAF50',
    fontWeight: '600',
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
import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOnboarding } from '../../hooks/useOnboarding';
import { useAuth } from '../../hooks/useAuth';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ConfirmScreen() {
  const insets = useSafeAreaInsets();
  const { setIsCompleted } = useOnboarding();
  const { setCurrentAuthStep } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCompleted(true);
      setCurrentAuthStep('authenticated');
    }, 3000);

    return () => clearTimeout(timer);
  }, [setIsCompleted, setCurrentAuthStep]);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.content}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: '100%' }]} />
        </View>

        <View style={styles.centerContent}>
          <View style={styles.checkmarkContainer}>
            <FontAwesome name="check" size={40} color="#FFF" />
          </View>
          
          <Text style={styles.title}>Preparing your plan</Text>
          <Text style={styles.subtitle}>
            We're analyzing your preferences and creating a personalized nutrition plan just for you.
          </Text>
        </View>
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
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
});
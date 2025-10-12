import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';
import { Image } from 'expo-image';

export default function LoadingScreen() {
  const insets = useSafeAreaInsets();
  const { setCurrentAuthStep } = useAuth();

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setCurrentAuthStep('signup');
    }, 2500);

    return () => clearTimeout(timer);
  }, [setCurrentAuthStep]);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          {/* A new View is added here to wrap the image and text horizontally */}
          <View style={styles.logoRow}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logoImage}
              contentFit="contain"
            />
            <Text style={styles.logoText}>
              <Text style={styles.logoGreen}>Foodo</Text>
              <Text style={styles.logoBlack}>scope</Text>
              <Text style={styles.logoDot}>.</Text>
            </Text>
          </View>
        </View>
        
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  // New style to arrange image and text side-by-side
  logoRow: {
    flexDirection: 'row', // Makes children arrange horizontally
    alignItems: 'center', // Vertically centers items in the row
    marginBottom: 20, // Keep some spacing if needed below the logo group
  },
  logoImage: {
    width: 60, // Adjusted width for better side-by-side fit
    height: 60, // Adjusted height
    marginRight: 10, // Adds space between the image and the text
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  logoGreen: {
    color: '#4CAF50',
  },
  logoBlack: {
    color: '#333',
  },
  logoDot: {
    color: '#4CAF50',
  },
  loadingContainer: {
    marginTop: 40,
  },
});

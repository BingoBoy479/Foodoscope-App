import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

export default function ScanScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={['#E8F5FF', '#F0F8FF']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Header */}
          <Text style={styles.title}>Scan Barcode</Text>
          <Text style={styles.subtitle}>
            Scan product barcodes to get nutrition information and add to your tracking
          </Text>

          {/* Scanner Area */}
          <View style={styles.scannerContainer}>
            <View style={styles.scannerFrame}>
              <FontAwesome name="qrcode" size={80} color="#4A90E2" />
            </View>
            
            <View style={styles.scannerCorners}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
          </View>

          {/* Instructions */}
          <Text style={styles.instructions}>
            Point your camera at a barcode to scan
          </Text>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.primaryButton}>
              <FontAwesome name="camera" size={20} color="#FFF" style={styles.buttonIcon} />
              <Text style={styles.primaryButtonText}>Start Scanning</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton}>
              <FontAwesome name="image" size={20} color="#4A90E2" style={styles.buttonIcon} />
              <Text style={styles.secondaryButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  scannerContainer: {
    position: 'relative',
    width: 250,
    height: 250,
    marginBottom: 40,
  },
  scannerFrame: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#4A90E2',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerCorners: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#4A90E2',
  },
  topLeft: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 8,
  },
  instructions: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 60,
  },
  actions: {
    width: '100%',
    paddingHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  secondaryButtonText: {
    color: '#4A90E2',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonIcon: {
    marginRight: 8,
  },
});
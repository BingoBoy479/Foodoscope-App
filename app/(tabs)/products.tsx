import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ProductsScreen() {
  const insets = useSafeAreaInsets();

  const products = [
    {
      id: 1,
      name: 'Recipe DB',
      description: '18,000+ recipes from across the globe.',
      icon: '🍳',
      color: '#FF6B6B',
    },
    {
      id: 2,
      name: 'Flavor DB',
      description: 'Flavor profiles of 1000 natural ingredients.',
      icon: '🌿',
      color: '#4ECDC4',
    },
    {
      id: 3,
      name: 'SustainableFood DB',
      description: 'Environmental impact for 500+ foods.',
      icon: '🌱',
      color: '#95E1D3',
    },
    {
      id: 4,
      name: 'DietRX',
      description: 'Food recommendation for 100+ diseases.',
      icon: '🍎',
      color: '#FF8B94',
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Our Products</Text>
          <Text style={styles.subtitle}>
            Extensive APIs for traditional recipes, nutrition profiles, flavor molecules of natural ingredients, health associations, and carbon footprints.
          </Text>
        </View>

        {/* Products List */}
        <View style={styles.productsList}>
          {products.map((product) => (
            <TouchableOpacity key={product.id} style={styles.productCard}>
              <View style={[styles.productIcon, { backgroundColor: product.color }]}>
                <Text style={styles.productIconText}>{product.icon}</Text>
              </View>
              
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
              </View>
              
              <FontAwesome name="chevron-right" size={16} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleSection: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  productsList: {
    paddingBottom: 100,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  productIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  productIconText: {
    fontSize: 28,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function RecipesScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const categories = [
    { name: 'Western', icon: '🍝' },
    { name: 'Bread', icon: '🍞' },
    { name: 'Salad', icon: '🥗' },
    { name: 'Coffee', icon: '☕' },
    { name: 'Fruit', icon: '🍎' },
    { name: 'Meat', icon: '🥩' },
    { name: 'Desert', icon: '🍰' },
    { name: 'Snack', icon: '🍿' },
    { name: 'Beverage', icon: '🧃' },
    { name: 'Soup', icon: '🍲' },
  ];

  const exploreRecipes = [
    {
      id: 1,
      name: 'Grilled Salmon Salad & Brown Rice',
      calories: 450,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop',
      liked: true,
    },
    {
      id: 2,
      name: 'Classic Masala Dosa & Sambar',
      calories: 350,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=200&fit=crop',
      liked: false,
    },
  ];

  const recommendedRecipes = [
    {
      id: 3,
      name: 'Grilled Chicken Sandwich',
      calories: 450,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=300&h=200&fit=crop',
    },
    {
      id: 4,
      name: 'Vegetable Fried Rice',
      calories: 350,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop',
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={['#FFFACD', '#FFE4B5']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Let's Cook Better</Text>
              <Image
                source="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                style={styles.profileImage}
              />
            </View>
          </View>

          {/* Search Section */}
          <Text style={styles.searchQuestion}>What do you want cook today?</Text>
          
          <View style={styles.searchContainer}>
            <FontAwesome name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Recipe"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Categories */}
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryItem}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Explore Recipes */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Explore recipes</Text>
              <TouchableOpacity>
                <Text style={styles.seeMore}>See More &gt;</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recipesScroll}>
              {exploreRecipes.map((recipe) => (
                <TouchableOpacity 
                  key={recipe.id} 
                  style={styles.recipeCard}
                  onPress={() => router.push(`/recipe/${recipe.id}`)}
                >
                  <View style={styles.recipeImageContainer}>
                    <Image source={recipe.image} style={styles.recipeImage} />
                    <TouchableOpacity style={styles.likeButton}>
                      <FontAwesome 
                        name={recipe.liked ? 'heart' : 'heart-o'} 
                        size={16} 
                        color={recipe.liked ? '#FF6B35' : '#FFF'} 
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.recipeInfo}>
                    <Text style={styles.recipeName} numberOfLines={2}>{recipe.name}</Text>
                    <View style={styles.recipeStats}>
                      <Text style={styles.recipeCalories}>{recipe.calories} kcal</Text>
                      <View style={styles.ratingContainer}>
                        <FontAwesome name="star" size={12} color="#FFD700" />
                        <Text style={styles.rating}>{recipe.rating}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Recommended */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recommended</Text>
              <TouchableOpacity>
                <Text style={styles.seeMore}>See More &gt;</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recipesScroll}>
              {recommendedRecipes.map((recipe) => (
                <TouchableOpacity 
                  key={recipe.id} 
                  style={styles.recipeCard}
                  onPress={() => router.push(`/recipe/${recipe.id}`)}
                >
                  <View style={styles.recipeImageContainer}>
                    <Image source={recipe.image} style={styles.recipeImage} />
                  </View>
                  <View style={styles.recipeInfo}>
                    <Text style={styles.recipeName} numberOfLines={2}>{recipe.name}</Text>
                    <View style={styles.recipeStats}>
                      <Text style={styles.recipeCalories}>{recipe.calories} kcal</Text>
                      <View style={styles.ratingContainer}>
                        <FontAwesome name="star" size={12} color="#FFD700" />
                        <Text style={styles.rating}>{recipe.rating}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  searchQuestion: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 30,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  categoryItem: {
    width: (width - 60) / 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeMore: {
    fontSize: 14,
    color: '#666',
  },
  recipesScroll: {
    paddingHorizontal: -20,
  },
  recipeCard: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    marginRight: 16,
    width: 180,
    overflow: 'hidden',
  },
  recipeImageContainer: {
    position: 'relative',
  },
  recipeImage: {
    width: 180,
    height: 120,
  },
  likeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 8,
  },
  recipeInfo: {
    padding: 12,
  },
  recipeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  recipeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recipeCalories: {
    fontSize: 12,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});
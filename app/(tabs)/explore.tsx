import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import recipeService from '../services/recipes/recipeService';
import { DisplayRecipe } from '../services/recipes/types';

const { width } = Dimensions.get('window');

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const [recipes, setRecipes] = useState<DisplayRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch all recipes from API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🔄 Starting to fetch all explore recipes...');
        
        const allRecipes = await recipeService.getExploreRecipes(1, 20);
        setRecipes(allRecipes);
        
        console.log(`✅ Successfully loaded ${allRecipes.length} recipes for explore screen`);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load recipes';
        setError(errorMessage);
        console.log('❌ Error fetching explore recipes:', errorMessage);
        
        // Fallback to empty array to prevent crashes
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const renderRecipes = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Loading delicious recipes...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <FontAwesome name="exclamation-circle" size={40} color="#FF6B35" />
          <Text style={styles.errorText}>Failed to load recipes</Text>
          <Text style={styles.errorSubtext}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => window.location.reload()}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (recipes.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <FontAwesome name="cutlery" size={40} color="#CCC" />
          <Text style={styles.emptyText}>No recipes found</Text>
        </View>
      );
    }

    return (
      <View style={styles.recipesGrid}>
        {recipes.map((recipe) => (
          <TouchableOpacity 
            key={recipe.id} 
            style={styles.recipeCard}
            onPress={() => router.push(`/recipe/${recipe.id}`)}
          >
            <View style={styles.recipeImageContainer}>
              <Image 
                source={recipe.image} 
                style={styles.recipeImage}
                contentFit="cover"
              />
              <TouchableOpacity style={styles.likeButton}>
                <FontAwesome 
                  name={recipe.liked ? 'heart' : 'heart-o'} 
                  size={16} 
                  color={recipe.liked ? '#FF6B35' : '#FFF'} 
                />
              </TouchableOpacity>
            </View>
            <View style={styles.recipeInfo}>
              <Text style={styles.recipeName} numberOfLines={2}>
                {recipe.name}
              </Text>
              <View style={styles.recipeStats}>
                <Text style={styles.recipeCalories}>{recipe.calories} kcal</Text>
                <View style={styles.ratingContainer}>
                  <FontAwesome name="star" size={12} color="#FFD700" />
                  <Text style={styles.rating}>{recipe.rating || 4.5}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={['#FFFACD', '#FFE4B5']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.push('/(tabs)/recipes')}
            >
              <FontAwesome name="arrow-left" size={20} color="#333" />
            </TouchableOpacity>
            <Text style={styles.title}>Explore Recipes</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Recipes Grid */}
          <View style={styles.section}>
            {renderRecipes()}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  placeholder: {
    width: 36,
  },
  section: {
    marginBottom: 30,
  },
  recipesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  recipeCard: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    marginBottom: 16,
    width: (width - 60) / 2, // Same width calculation
    overflow: 'hidden',
  },
  recipeImageContainer: {
    position: 'relative',
    width: '100%',
    height: 140, // Increased height to make it more squarish
  },
  recipeImage: {
    width: '100%',
    height: '100%', // Fill the container
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
    minHeight: 70, // Consistent height for text area
  },
  recipeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    lineHeight: 18,
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
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  errorContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 4,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  emptyContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
});
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { useRouter, useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

export default function RecipeDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions' | 'reviews'>('ingredients');
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  const recipe = {
    id,
    name: 'Classic Masala Dosa & Sambar',
    description: 'Crispy rice dosa filled with masala aloo, served with sambar and chutneys.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop',
    cookTime: '10 Min',
    difficulty: 'Medium',
    isVeg: true,
    nutrition: {
      calories: 350,
      carbs: 50,
      protein: 12,
      fat: 10,
    },
    ingredients: [
      {
        category: 'For Dosa Batter',
        items: [
          'Rice, water, salt',
          'Urad dal (split black gram)',
          'Oil or ghee (for cooking)',
        ],
      },
      {
        category: 'For Masala (Potato Filling)',
        items: [
          'Potatoes, boiled and cubed',
          'Onions, chopped',
          'Green chilies',
          'Mustard seeds',
          'Curry leaves',
          'Turmeric powder',
        ],
      },
      {
        category: 'For Sambar',
        items: [
          'Toor dal (pigeon peas)',
          'Vegetables (okra, tomato, onion)',
          'Sambar powder',
          'Tamarind paste',
        ],
      },
    ],
    instructions: [
      {
        title: 'Prepare Batter',
        details: [
          'Soak rice, urad dal & methi seeds.',
          'Grind and ferment overnight.',
        ],
      },
      {
        title: 'Make Masala',
        details: [
          'Sauté onions, chilies, mustard seeds.',
          'Add turmeric & mashed potatoes.',
        ],
      },
      {
        title: 'Cook Dosa',
        details: [
          'Spread batter on hot tawa.',
          'Drizzle oil. Cook till golden.',
        ],
      },
      {
        title: 'Add Filling',
        details: [
          'Place masala on dosa.',
          'Fold and serve hot.',
        ],
      },
      {
        title: 'Boil Sambar',
        details: [
          'Cook dal with vegetables.',
          'Add sambar powder and tamarind.',
        ],
      },
      {
        title: 'Serve & Finish',
        details: [
          'Garnish with curry leaves.',
          'Serve with coconut chutney.',
        ],
      },
    ],
    reviews: [
      {
        name: 'Ananya S.',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b672?w=50&h=50&fit=crop&crop=face',
        rating: 5,
        time: '3 days ago',
        comment: 'The dosa turned out golden and crisp, and the masala was perfectly spiced. Tastes just like a South Indian café!',
      },
      {
        name: 'Rahul M.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
        rating: 4,
        time: '7 days ago',
        comment: 'Loved the balance of the spicy sambar with the mild potato filling. Super satisfying and surprisingly easy to make!',
      },
      {
        name: 'Meera T.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
        rating: 5,
        time: '10 days ago',
        comment: 'The aroma while cooking brought back memories of weekend brunches. Tastes authentic, worth the prep!',
      },
    ],
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FontAwesome
        key={i}
        name={i < rating ? 'star' : 'star-o'}
        size={12}
        color="#FFD700"
      />
    ));
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header Image */}
      <View style={styles.headerContainer}>
        <Image source={recipe.image} style={styles.headerImage} />
        <View style={styles.headerOverlay}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <FontAwesome name="arrow-left" size={20} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookmarkButton}>
            <FontAwesome name="bookmark-o" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Recipe Info */}
        <View style={styles.recipeInfo}>
          <Text style={styles.recipeName}>{recipe.name}</Text>
          <Text style={styles.recipeDescription}>{recipe.description}</Text>
          
          {/* Meta Info */}
          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <FontAwesome name="clock-o" size={16} color="#666" />
              <Text style={styles.metaText}>{recipe.cookTime}</Text>
            </View>
            <View style={styles.metaItem}>
              <FontAwesome name="signal" size={16} color="#666" />
              <Text style={styles.metaText}>{recipe.difficulty}</Text>
            </View>
            {recipe.isVeg && (
              <View style={styles.vegBadge}>
                <View style={styles.vegDot} />
                <Text style={styles.vegText}>Veg</Text>
              </View>
            )}
          </View>

          {/* Nutrition */}
          <View style={styles.nutritionContainer}>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>Calories</Text>
              <Text style={styles.nutritionValue}>{recipe.nutrition.calories}</Text>
              <Text style={styles.nutritionUnit}>kcal</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>Carbs</Text>
              <Text style={styles.nutritionValue}>{recipe.nutrition.carbs}</Text>
              <Text style={styles.nutritionUnit}>g</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>Protein</Text>
              <Text style={styles.nutritionValue}>{recipe.nutrition.protein}</Text>
              <Text style={styles.nutritionUnit}>g</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>Fat</Text>
              <Text style={styles.nutritionValue}>{recipe.nutrition.fat}</Text>
              <Text style={styles.nutritionUnit}>g</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'ingredients' && styles.activeTab]}
            onPress={() => setActiveTab('ingredients')}
          >
            <MaterialIcons name="list" size={18} color={activeTab === 'ingredients' ? '#FFF' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'ingredients' && styles.activeTabText]}>
              Ingredients
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'instructions' && styles.activeTab]}
            onPress={() => setActiveTab('instructions')}
          >
            <MaterialIcons name="menu-book" size={18} color={activeTab === 'instructions' ? '#FFF' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'instructions' && styles.activeTabText]}>
              Instructions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
            onPress={() => setActiveTab('reviews')}
          >
            <FontAwesome name="star" size={16} color={activeTab === 'reviews' ? '#FFF' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>
              Reviews
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === 'ingredients' && (
            <View>
              {recipe.ingredients.map((section, index) => (
                <View key={index} style={styles.ingredientSection}>
                  <TouchableOpacity 
                    style={styles.ingredientHeader}
                    onPress={() => setExpandedStep(expandedStep === index ? null : index)}
                  >
                    <Text style={styles.ingredientSectionTitle}>{index + 1}. {section.category}</Text>
                    <FontAwesome 
                      name={expandedStep === index ? 'chevron-up' : 'chevron-down'} 
                      size={14} 
                      color="#666" 
                    />
                  </TouchableOpacity>
                  {expandedStep === index && (
                    <View style={styles.ingredientItems}>
                      {section.items.map((item, itemIndex) => (
                        <Text key={itemIndex} style={styles.ingredientItem}>• {item}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {activeTab === 'instructions' && (
            <View>
              {recipe.instructions.map((step, index) => (
                <View key={index} style={styles.instructionSection}>
                  <TouchableOpacity 
                    style={styles.instructionHeader}
                    onPress={() => setExpandedStep(expandedStep === index ? null : index)}
                  >
                    <Text style={styles.instructionTitle}>{index + 1}. {step.title}</Text>
                    <FontAwesome 
                      name={expandedStep === index ? 'chevron-up' : 'chevron-down'} 
                      size={14} 
                      color="#666" 
                    />
                  </TouchableOpacity>
                  {expandedStep === index && (
                    <View style={styles.instructionDetails}>
                      {step.details.map((detail, detailIndex) => (
                        <Text key={detailIndex} style={styles.instructionDetail}>• {detail}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {activeTab === 'reviews' && (
            <View>
              {recipe.reviews.map((review, index) => (
                <View key={index} style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    <Image source={review.avatar} style={styles.reviewAvatar} />
                    <View style={styles.reviewInfo}>
                      <Text style={styles.reviewerName}>{review.name}</Text>
                      <View style={styles.reviewRating}>
                        {renderStars(review.rating)}
                      </View>
                    </View>
                    <Text style={styles.reviewTime}>{review.time}</Text>
                  </View>
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                </View>
              ))}
            </View>
          )}
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
  headerContainer: {
    position: 'relative',
    height: 250,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  recipeInfo: {
    padding: 20,
  },
  recipeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  recipeDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 16,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666',
  },
  vegBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  vegDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  vegText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  nutritionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 16,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  nutritionValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  nutritionUnit: {
    fontSize: 12,
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#FF6B35',
  },
  tabText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFF',
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  ingredientSection: {
    marginBottom: 16,
  },
  ingredientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  ingredientSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  ingredientItems: {
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  ingredientItem: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 4,
  },
  instructionSection: {
    marginBottom: 16,
  },
  instructionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  instructionDetails: {
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  instructionDetail: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 4,
  },
  reviewItem: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewTime: {
    fontSize: 12,
    color: '#999',
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
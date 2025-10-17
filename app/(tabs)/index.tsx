import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const trackingData = [
    {
      title: 'Water',
      current: '2000 ml',
      goal: 'Daily goal 4L',
      icon: '💧',
      color: '#B3E5FC',
      progress: 0.5,
    },
    {
      title: 'Sleep',
      current: '8 hr',
      goal: 'Daily goal 9hr',
      icon: '🛏️',
      color: '#FFF3C4',
      progress: 0.89,
    },
    {
      title: 'Calories',
      current: '700 kcal',
      goal: 'Left 1500 kcal',
      icon: '🔥',
      color: '#FFCDD2',
      progress: 0.32,
    },
    {
      title: 'Steps',
      current: '4000 done',
      goal: 'Goal 10000',
      icon: '👣',
      color: '#E1BEE7',
      progress: 0.4,
    },
  ];

  const todaysMeals = [
    {
      name: 'Greek yogurt bowl',
      type: 'Breakfast',
      time: '7:00 AM - 9:00 AM',
      calories: 350,
      image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=80&h=80&fit=crop',
      backgroundColor: '#E3F2FD',
    },
    {
      name: 'Grilled Chicken',
      type: 'Lunch',
      time: '12:30 PM - 2:00 PM',
      calories: 500,
      image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=80&h=80&fit=crop',
      backgroundColor: '#FCE4EC',
    },
    {
      name: 'Grilled Salmon',
      type: 'Dinner',
      time: '7:00 PM - 8:30 PM',
      calories: 420,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=80&h=80&fit=crop',
      backgroundColor: '#FFF3E0',
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
       <LinearGradient
         colors={['#FFA44E', '#FFFFFF']} // light orange → white
         start={{ x: 0, y: 0 }}
         end={{ x: 0, y: 1 }}
         locations={[0, 0.25]} // white starts at 25% height
         style={styles.gradientBackground}
       >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.profileSection}>
              <Image
                source="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                style={styles.profileImage}
              />
              <View>
                <Text style={styles.greeting}>Good morning,</Text>
                <Text style={styles.userName}>Sarthak</Text>
              </View>
            </View>
            <TouchableOpacity>
              <FontAwesome name="bell-o" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Tracking Question */}
          <Text style={styles.trackingQuestion}>
            What would you like to track today?
          </Text>

          {/* Tracking Cards Container */}
          <View style={styles.trackingContainer}>
            <View style={styles.trackingGrid}>
              {trackingData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.trackingCard, { backgroundColor: item.color }]}
                  onPress={() => {
                    if (item.title === 'Calories') {
                      router.push('/calories');
                    }
                  }}
                >
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardIcon}>{item.icon}</Text>
                  <Text style={styles.cardCurrent}>{item.current}</Text>
                  <Text style={styles.cardGoal}>{item.goal}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Today's Meals */}

          <Text style={styles.sectionTitle}>Today's meals</Text>
          {/*<View style={styles.mealsSection}>*/}
          <View style={styles.mealContainer}>
            {/*<Text style={styles.sectionTitle}>Today's meals</Text>*/}

            {todaysMeals.map((meal, index) => (
              <TouchableOpacity key={index} style={[styles.mealCard, { backgroundColor: meal.backgroundColor }]}>
                <Image
                  source={meal.image}
                  style={styles.mealImage}
                />
                <View style={styles.mealInfo}>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <Text style={styles.mealType}>{meal.type}</Text>
                  <Text style={styles.mealTime}>{meal.time}</Text>
                </View>
                <View style={styles.caloriesBadge}>
                  <Text style={styles.caloriesIcon}>🔥</Text>
                  <Text style={styles.caloriesText}>{meal.calories}</Text>
                  <Text style={styles.caloriesUnit}>kcal</Text>
                </View>
              </TouchableOpacity>
            ))}
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  greeting: {
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  trackingQuestion: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  trackingContainer: {
    backgroundColor: 'rgba(255, 255, 255, 255)',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6, // Android shadow
  },
  trackingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  trackingCard: {
    width: (width - 90) / 2,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  cardCurrent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  cardGoal: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  mealContainer: {
    backgroundColor: 'rgba(255, 255, 255, 255)',
    borderRadius: 20,
    padding: 15,
    marginBottom: 30,

    // Optional: make spacing similar to the tracking container
    marginTop: 10,

    // Soft shadow (same as the tracking container)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,

    // Optional subtle border for glow effect
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },

  mealsSection: {
    marginBottom: 120,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  mealCard: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  mealType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  mealTime: {
    fontSize: 12,
    color: '#999',
  },
  caloriesBadge: {
    alignItems: 'center',
  },
  caloriesIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  caloriesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  caloriesUnit: {
    fontSize: 12,
    color: '#666',
  },
  gradientBackground: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
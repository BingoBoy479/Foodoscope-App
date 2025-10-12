import React, { useState } from 'react';
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
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function CaloriesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const caloriesData = {
    consumed: 800,
    burned: 120,
    left: 1500,
    goal: 2300,
  };

  const macros = {
    carbs: { current: 90, target: 150, color: '#FF6B6B' },
    protein: { current: 100, target: 130, color: '#4ECDC4' },
    fat: { current: 30, target: 80, color: '#FFE66D' },
  };

  const weekDays = [
    { day: 'Tue', date: '08' },
    { day: 'Wed', date: '09' },
    { day: 'Thu', date: '10' },
    { day: 'Fri', date: '11', isToday: true },
    { day: 'Sat', date: '12' },
    { day: 'Sun', date: '13' },
    { day: 'Mon', date: '14' },
  ];

  const meals = [
    {
      type: 'Breakfast',
      name: 'Greek yogurt bowl',
      time: '7:00 AM - 9:00 AM',
      calories: 350,
      image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=80&h=80&fit=crop',
      backgroundColor: '#E3F2FD',
    },
    {
      type: 'Lunch',
      name: 'Grilled chicken',
      time: '1:00 PM - 3:00 PM',
      calories: 400,
      image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=80&h=80&fit=crop',
      backgroundColor: '#FCE4EC',
    },
    {
      type: 'Dinner',
      name: 'Grilled salmon',
      time: '7:00 PM - 9:00 PM',
      calories: 500,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=80&h=80&fit=crop',
      backgroundColor: '#F3E5F5',
    },
  ];

  const progressPercentage = (caloriesData.consumed / caloriesData.goal) * 100;
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={['#98E4D6', '#A8E6CF']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <FontAwesome name="arrow-left" size={24} color="#333" />
            </TouchableOpacity>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Eat Smart, Track Easy</Text>
              <Image
                source="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                style={styles.profileImage}
              />
            </View>
          </View>

          {/* Calories Summary */}
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>
              You have consumed{' '}
              <Text style={styles.caloriesHighlight}>{caloriesData.consumed}</Text>
              <Text style={styles.caloriesUnit}> kcal</Text> today
            </Text>

            {/* Circular Progress */}
            <View style={styles.progressContainer}>
              <Svg width={200} height={200} style={styles.progressSvg}>
                <Circle
                  cx={100}
                  cy={100}
                  r={90}
                  stroke="#E0E0E0"
                  strokeWidth={8}
                  fill="transparent"
                />
                <Circle
                  cx={100}
                  cy={100}
                  r={90}
                  stroke="#4CAF50"
                  strokeWidth={8}
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                />
              </Svg>
              <View style={styles.progressCenter}>
                <Text style={styles.progressValue}>{caloriesData.consumed}</Text>
                <Text style={styles.progressUnit}>kcal</Text>
              </View>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Cal Burned</Text>
                <Text style={styles.statValue}>{caloriesData.burned}<Text style={styles.statUnit}>Cal</Text></Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Cal left</Text>
                <Text style={styles.statValue}>{caloriesData.left}<Text style={styles.statUnit}>Cal</Text></Text>
              </View>
            </View>

            {/* Macros */}
            <View style={styles.macrosContainer}>
              {Object.entries(macros).map(([key, macro]) => (
                <View key={key} style={styles.macroItem}>
                  <Text style={styles.macroLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                  <Text style={[styles.macroValue, { color: macro.color }]}>
                    {macro.current}/{macro.target}<Text style={styles.macroUnit}>g</Text>
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Calendar */}
          <View style={styles.calendarContainer}>
            <TouchableOpacity style={styles.calendarNav}>
              <FontAwesome name="chevron-left" size={16} color="#666" />
            </TouchableOpacity>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.calendar}>
              {weekDays.map((day, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.dayItem, day.isToday && styles.todayItem]}
                >
                  <Text style={[styles.dayText, day.isToday && styles.todayText]}>{day.day}</Text>
                  <Text style={[styles.dateText, day.isToday && styles.todayText]}>{day.date}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <TouchableOpacity style={styles.calendarNav}>
              <FontAwesome name="chevron-right" size={16} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Meals List */}
          <View style={styles.mealsContainer}>
            {meals.map((meal, index) => (
              <View key={index} style={[styles.mealCard, { backgroundColor: meal.backgroundColor }]}>
                <Image source={meal.image} style={styles.mealImage} />
                <View style={styles.mealInfo}>
                  <Text style={styles.mealType}>{meal.type}</Text>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <Text style={styles.mealTime}>{meal.time}</Text>
                </View>
                <View style={styles.mealCalories}>
                  <Text style={styles.caloriesIcon}>🔥</Text>
                  <Text style={styles.mealCaloriesText}>{meal.calories}</Text>
                  <Text style={styles.mealCaloriesUnit}>kcal</Text>
                </View>
                <TouchableOpacity style={styles.addButton}>
                  <FontAwesome name="plus" size={16} color="#FFF" />
                </TouchableOpacity>
              </View>
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
    marginTop: 20,
    marginBottom: 30,
  },
  backButton: {
    marginBottom: 16,
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
  summaryContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 30,
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  caloriesHighlight: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  caloriesUnit: {
    color: '#4CAF50',
  },
  progressContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  progressSvg: {
    transform: [{ rotate: '0deg' }],
  },
  progressCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  progressUnit: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statUnit: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  macroUnit: {
    fontSize: 12,
    fontWeight: 'normal',
  },
  calendarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  calendarNav: {
    padding: 8,
  },
  calendar: {
    flex: 1,
  },
  dayItem: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 12,
  },
  todayItem: {
    backgroundColor: '#FF6B35',
  },
  dayText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  todayText: {
    color: '#FFF',
  },
  mealsContainer: {
    marginBottom: 100,
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
  mealType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  mealName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  mealTime: {
    fontSize: 12,
    color: '#999',
  },
  mealCalories: {
    alignItems: 'center',
    marginRight: 12,
  },
  caloriesIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  mealCaloriesText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  mealCaloriesUnit: {
    fontSize: 12,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
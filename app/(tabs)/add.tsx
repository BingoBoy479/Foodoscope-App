
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

export default function AddScreen() {
  const insets = useSafeAreaInsets();
  const [selectedType, setSelectedType] = useState<'meal' | 'exercise' | 'water' | null>(null);
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');

  const quickActions = [
    {
      id: 'meal',
      title: 'Add Meal',
      icon: 'cutlery',
      color: '#FF6B35',
      description: 'Log your breakfast, lunch, or dinner',
    },
    {
      id: 'exercise',
      title: 'Log Exercise',
      icon: 'heartbeat',
      color: '#4ECDC4',
      description: 'Track your physical activities',
    },
    {
      id: 'water',
      title: 'Add Water',
      icon: 'tint',
      color: '#45B7D1',
      description: 'Record your water intake',
    },
    {
      id: 'weight',
      title: 'Log Weight',
      icon: 'balance-scale',
      color: '#96CEB4',
      description: 'Track your body weight',
    },
  ];

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleQuickAction = (type: string) => {
    if (type === 'meal') {
      setSelectedType('meal');
    } else {
      showAlert('Coming Soon', `${type} tracking will be available in the next update!`);
    }
  };

  const handleAddMeal = () => {
    if (!mealName.trim() || !calories.trim()) {
      showAlert('Missing Information', 'Please fill in both meal name and calories.');
      return;
    }

    showAlert('Meal Added!', `${mealName} (${calories} kcal) has been added to your diary.`);
    setMealName('');
    setCalories('');
    setSelectedType(null);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={['#F8F9FA', '#E9ECEF']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Add Entry</Text>
            <Text style={styles.subtitle}>Track your daily nutrition and activities</Text>
          </View>

          {!selectedType ? (
            /* Quick Actions */
            <View style={styles.quickActions}>
              {quickActions.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  style={[styles.actionCard, { borderLeftColor: action.color }]}
                  onPress={() => handleQuickAction(action.id)}
                >
                  <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                    <FontAwesome name={action.icon as any} size={24} color="#FFF" />
                  </View>
                  <View style={styles.actionContent}>
                    <Text style={styles.actionTitle}>{action.title}</Text>
                    <Text style={styles.actionDescription}>{action.description}</Text>
                  </View>
                  <FontAwesome name="chevron-right" size={16} color="#999" />
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            /* Add Meal Form */
            <View style={styles.formContainer}>
              <View style={styles.formHeader}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => setSelectedType(null)}
                >
                  <FontAwesome name="arrow-left" size={20} color="#333" />
                </TouchableOpacity>
                <Text style={styles.formTitle}>Add Meal</Text>
              </View>

              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Meal Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter meal name"
                    value={mealName}
                    onChangeText={setMealName}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Calories</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter calories"
                    value={calories}
                    onChangeText={setCalories}
                    keyboardType="numeric"
                  />
                </View>

                <TouchableOpacity style={styles.addButton} onPress={handleAddMeal}>
                  <FontAwesome name="plus" size={20} color="#FFF" style={styles.buttonIcon} />
                  <Text style={styles.addButtonText}>Add Meal</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Recent Entries */}
          <View style={styles.recentSection}>
            <Text style={styles.sectionTitle}>Recent Entries</Text>
            
            <View style={styles.recentItem}>
              <View style={[styles.recentIcon, { backgroundColor: '#FF6B35' }]}>
                <FontAwesome name="cutlery" size={16} color="#FFF" />
              </View>
              <View style={styles.recentContent}>
                <Text style={styles.recentName}>Greek Yogurt Bowl</Text>
                <Text style={styles.recentTime}>2 hours ago • 350 kcal</Text>
              </View>
            </View>

            <View style={styles.recentItem}>
              <View style={[styles.recentIcon, { backgroundColor: '#45B7D1' }]}>
                <FontAwesome name="tint" size={16} color="#FFF" />
              </View>
              <View style={styles.recentContent}>
                <Text style={styles.recentName}>Water Intake</Text>
                <Text style={styles.recentTime}>4 hours ago • 500ml</Text>
              </View>
            </View>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  quickActions: {
    marginBottom: 30,
  },
  actionCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: '#666',
  },
  formContainer: {
    marginBottom: 30,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E1E5E9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonIcon: {
    marginRight: 8,
  },
  recentSection: {
    marginBottom: 100,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  recentItem: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recentIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recentContent: {
    flex: 1,
  },
  recentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  recentTime: {
    fontSize: 14,
    color: '#666',
  },
});

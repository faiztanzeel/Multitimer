import React, { useState, useEffect, useCallback } from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategorySection from '../components/CategorySection';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [timers, setTimers] = useState([]);
  const navigation = useNavigation();

  const loadTimers = async () => {
    try {
      const savedTimers = await AsyncStorage.getItem('timers');
      if (savedTimers) {
        setTimers(JSON.parse(savedTimers));
      }
    } catch (error) {
      console.error('Error loading timers:', error);
    }
  };

  useEffect(() => {
    loadTimers();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTimers();
    }, [])
  );

  const handleStartTimer = (timerId) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === timerId ? { ...timer, status: 'running' } : timer
      )
    );
    saveTimers(timers.map((timer) => timer.id === timerId ? { ...timer, status: 'running' } : timer));
  };

  const handlePauseTimer = (timerId) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === timerId ? { ...timer, status: 'paused' } : timer
      )
    );
    saveTimers(timers.map((timer) => timer.id === timerId ? { ...timer, status: 'paused' } : timer));
  };

  const handleResetTimer = (timerId) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === timerId ? { ...timer, status: 'paused', remainingTime: timer.duration } : timer
      )
    );
    saveTimers(timers.map((timer) => timer.id === timerId ? { ...timer, status: 'paused', remainingTime: timer.duration } : timer));
  };

  const saveTimers = async (updatedTimers) => {
    try {
      await AsyncStorage.setItem('timers', JSON.stringify(updatedTimers));
    } catch (error) {
      console.error('Error saving timers:', error);
    }
  };

  // Group timers by category
  const groupedTimers = timers.reduce((acc, timer) => {
    if (!acc[timer.category]) {
      acc[timer.category] = [];
    }
    acc[timer.category].push(timer);
    return acc;
  }, {});

  return (
    <ScrollView style={styles.container}>
      <Button title="Add Timer" onPress={() => navigation.navigate('AddTimer')} />
      {Object.entries(groupedTimers).map(([category, timersInCategory]) => (
        <CategorySection
          key={category}
          category={category}
          timers={timersInCategory}
          onStartTimer={handleStartTimer}
          onPauseTimer={handlePauseTimer}
          onResetTimer={handleResetTimer}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default HomeScreen;
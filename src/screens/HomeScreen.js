import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimerItem from '../components/TimerItem';
import CategorySection from '../components/CategorySection';

const HomeScreen = ({ navigation }) => {
  const [timers, setTimers] = useState([]);

  useEffect(() => {
    loadTimers();
  }, []);

  const loadTimers = async () => {
    const savedTimers = await AsyncStorage.getItem('timers');
    if (savedTimers) setTimers(JSON.parse(savedTimers));
  };

  const saveTimers = async (updatedTimers) => {
    await AsyncStorage.setItem('timers', JSON.stringify(updatedTimers));
    setTimers(updatedTimers);
  };

  const addTimer = (newTimer) => {
    const updatedTimers = [...timers, newTimer];
    saveTimers(updatedTimers);
  };

  return (
    <ScrollView style={styles.container}>
      <Button title="Add Timer" onPress={() => navigation.navigate('AddTimer')} />
      {timers.map((category) => (
        <CategorySection key={category} category={category} timers={timers} />
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
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AddTimer = () => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const navigation = useNavigation();

  const saveTimer = async () => {
    if (!name || !duration || !category) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const newTimer = {
      id: Date.now().toString(),
      name,
      duration: parseInt(duration),
      category,
      status: 'paused',
      remainingTime: parseInt(duration),
    };

    try {
      const existingTimers = await AsyncStorage.getItem('timers');
      let timers = existingTimers ? JSON.parse(existingTimers) : [];

      timers = [...timers, newTimer];

      await AsyncStorage.setItem('timers', JSON.stringify(timers));

      navigation.goBack();
    } catch (error) {
      console.error('Error saving timer:', error);
      Alert.alert('Error', 'Failed to save timer.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Timer Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Duration (seconds)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <Button title="Save Timer" onPress={saveTimer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default AddTimer;
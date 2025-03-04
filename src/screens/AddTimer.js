import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddTimer = ({ navigation }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');

  const saveTimer = () => {
    const newTimer = { id: Date.now(), name, duration: parseInt(duration), category };
    // Save the timer (you'll need to pass a function from HomeScreen to handle this)
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Timer Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Duration (seconds)" value={duration} onChangeText={setDuration} keyboardType="numeric" />
      <TextInput placeholder="Category" value={category} onChangeText={setCategory} />
      <Button title="Save Timer" onPress={saveTimer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default AddTimer;
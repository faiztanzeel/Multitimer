import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TimerItem from './TimerItem';

const CategorySection = ({ category, timers, onStartTimer, onPauseTimer, onResetTimer }) => {
  const categoryTimers = timers.filter((timer) => timer.category === category);

  const startAll = () => {
    categoryTimers.forEach((timer) => {
      onStartTimer(timer.id);
    });
  };

  const pauseAll = () => {
    categoryTimers.forEach((timer) => {
      onPauseTimer(timer.id);
    });
  };

  const resetAll = () => {
    categoryTimers.forEach((timer) => {
      onResetTimer(timer.id);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <View style={styles.controls}>
        <Button title="Start All" onPress={startAll} />
        <Button title="Pause All" onPress={pauseAll} />
        <Button title="Reset All" onPress={resetAll} />
      </View>
      {categoryTimers.map((timer) => (
        <TimerItem
          key={timer.id}
          timer={timer}
          onStartTimer={onStartTimer}
          onPauseTimer={onPauseTimer}
          onResetTimer={onResetTimer}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CategorySection;
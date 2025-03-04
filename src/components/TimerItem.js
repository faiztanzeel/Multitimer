import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Modal, Alert } from 'react-native';
import * as Progress from 'react-native-progress';

const TimerItem = ({ timer }) => {
  const [remainingTime, setRemainingTime] = useState(timer.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Effect to handle the timer countdown
  useEffect(() => {
    let interval;
    if (isRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setIsRunning(false);
      setIsCompleted(true); // Show completion modal
      Alert.alert('Timer Completed', `${timer.name} has finished!`); // Show alert
    }
    return () => clearInterval(interval);
  }, [isRunning, remainingTime]);

  // Start the timer
  const startTimer = () => setIsRunning(true);

  // Pause the timer
  const pauseTimer = () => setIsRunning(false);

  // Reset the timer to its original duration
  const resetTimer = () => {
    setRemainingTime(timer.duration);
    setIsRunning(false);
    setIsCompleted(false); // Hide completion modal
  };

  // Calculate progress for the progress bar
  const progress = remainingTime / timer.duration;

  return (
    <View style={styles.container}>
      {/* Timer Name */}
      <Text style={styles.timerName}>{timer.name}</Text>

      {/* Remaining Time */}
      <Text style={styles.timerText}>{remainingTime} seconds</Text>

      {/* Progress Bar */}
      <Progress.Bar
        progress={progress}
        width={200}
        color={progress > 0.5 ? '#4CAF50' : progress > 0.25 ? '#FFC107' : '#F44336'}
      />

      {/* Timer Controls */}
      <View style={styles.controls}>
        <Button
          title={isRunning ? 'Pause' : 'Start'}
          onPress={isRunning ? pauseTimer : startTimer}
        />
        <Button title="Reset" onPress={resetTimer} />
      </View>

      {/* Completion Modal */}
      <Modal visible={isCompleted} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Timer Completed: {timer.name}</Text>
            <Button title="Close" onPress={() => setIsCompleted(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  timerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  timerText: {
    fontSize: 16,
    marginBottom: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
  },
});

export default TimerItem;
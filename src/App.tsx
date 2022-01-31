import React from 'react';
import {StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CircularSlider from './screens/CircularSlider';

export const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <CircularSlider />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

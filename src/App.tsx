import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Transitions from './screens/Transitions';

export const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Transitions />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

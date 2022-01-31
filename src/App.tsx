import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import PanGesture from './screens/PanGesture';

export const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGesture />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

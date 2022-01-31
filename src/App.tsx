import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Text>Gestures and Animations</Text>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

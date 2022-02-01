import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Graph from './screens/Graph';

export const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Graph />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

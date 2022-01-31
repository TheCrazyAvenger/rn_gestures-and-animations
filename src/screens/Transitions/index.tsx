import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useSharedValue,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import {Button, StyleGuide, cards} from '../../components';
import AnimatedCard from './AnimatedCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: 'flex-end',
  },
});

const useSpring = (state: any) => {
  const value = useSharedValue(0);

  value.value = typeof state === 'number' ? state : state ? 1 : 0;

  return useDerivedValue(() => withSpring(value.value));
};

const UseTransition = () => {
  const [toggled, setToggled] = useState(false);

  const transition = useSpring(toggled);

  return (
    <View style={styles.container}>
      {cards.slice(0, 3).map((card, index) => (
        <AnimatedCard key={card} {...{index, card}} transition={transition} />
      ))}
      <Button
        label={toggled ? 'Reset' : 'Start'}
        primary
        onPress={() => setToggled(prev => !prev)}
      />
    </View>
  );
};

export default UseTransition;

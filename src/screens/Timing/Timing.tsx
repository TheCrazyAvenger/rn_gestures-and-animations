import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import SimpleActivityIndicator from './SimpleActivityIndicator';
import {Button, StyleGuide} from '../../components';
import {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {withPause} from 'react-native-redash';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: StyleGuide.palette.background,
  },
});

const Timing = () => {
  const [play, setPlay] = useState(false);
  const paused = useSharedValue(!play);

  const progress = useSharedValue(0);

  return (
    <View style={styles.container}>
      <SimpleActivityIndicator progress={progress} />
      <Button
        label={play ? 'Pause' : 'Play'}
        primary
        onPress={() => {
          paused.value = !paused.value;
          setPlay(prev => !prev);

          if (play === false) {
            progress.value = withPause(
              withRepeat(
                withTiming(1, {
                  duration: 1000,
                  easing: Easing.inOut(Easing.ease),
                }),
                -1,
                true,
              ),
              paused,
            );
          }
        }}
      />
    </View>
  );
};

export default Timing;

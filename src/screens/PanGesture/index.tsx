import React from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';

import {Card, Cards, CARD_HEIGHT, CARD_WIDTH} from '../../components';
import {clamp} from '../../components/AnimatedHelpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Gesture = () => {
  const {width, height} = useWindowDimensions();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const boundX = width - CARD_WIDTH;
  const boundY = height - CARD_HEIGHT;

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx: any) => {
      translateX.value = clamp(ctx.startX + event.translationX, 0, boundX);
      translateY.value = clamp(ctx.startY + event.translationY, 0, boundY);
    },
    onEnd: event => {
      translateX.value = withDecay({
        velocity: event.velocityX,
        clamp: [0, boundX],
      });
      translateY.value = withDecay({
        velocity: event.velocityY,
        clamp: [0, boundY],
      });
    },
  });

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={style}>
          <Card card={Cards.Card1} />
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default Gesture;

import * as React from 'react';
import {StyleSheet} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {clamp} from 'react-native-redash';
import {StyleGuide} from '../../components';
import {canvas2Polar, polar2Canvas} from '../../components/AnimatedHelpers';

interface CursorProps {
  r: number;
  strokeWidth: number;
  theta: Animated.SharedValue<number>;
}

const Cursor = ({r, strokeWidth, theta}: CursorProps) => {
  const center = {x: r, y: r};

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.offset = polar2Canvas(
        {
          theta: theta.value,
          radius: r,
        },
        center,
      );
    },
    onActive: (event, ctx) => {
      const {translationX, translationY} = event;

      const x = ctx.offset.x + translationX;
      const y1 = ctx.offset.y + translationY;
      const y =
        x < r
          ? y1
          : theta.value < Math.PI
          ? clamp(y1, 0, r - 0.001)
          : clamp(y1, r, 2 * r);

      const value = canvas2Polar({x, y}, center).theta;

      theta.value = value > 0 ? value : 2 * Math.PI + value;
    },
  });

  const style = useAnimatedStyle(() => {
    const {x: translateX, y: translateY} = polar2Canvas(
      {
        theta: theta.value,
        radius: r,
      },
      center,
    );
    return {
      transform: [{translateX}, {translateY}],
    };
  });

  return (
    <GestureHandlerRootView>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              width: strokeWidth,
              height: strokeWidth,
              borderRadius: strokeWidth / 2,
              borderColor: 'white',
              borderWidth: 5,
              backgroundColor: StyleGuide.palette.primary,
            },
            style,
          ]}
        />
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default Cursor;

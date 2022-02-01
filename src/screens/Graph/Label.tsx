/* eslint-disable react-native/no-unused-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useDerivedValue} from 'react-native-reanimated';

import {StyleGuide} from '../../components';
import {ReText, round} from '../../components/AnimatedHelpers';

const styles = StyleSheet.create({
  date: {
    ...StyleGuide.typography.title3,
    textAlign: 'center',
  },
  price: {
    ...StyleGuide.typography.title2,
    textAlign: 'center',
  },
});

console.log({styles});

export interface DataPoint {
  coord: {
    x: number;
    y: number;
  };
  data: {
    x: number;
    y: number;
  };
}

interface LabelProps {
  point: any;
}

const Label = ({point}: LabelProps) => {
  const date = useDerivedValue(() => {
    return new Date(point.value.data.x).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  });

  const price = useDerivedValue(() => {
    return `$ ${round(point.value.data.y, 2).toLocaleString()}`;
  });

  return (
    <View>
      <ReText style={styles.date} text={date} />
      <ReText style={styles.price} text={price} />
    </View>
  );
};

export default Label;

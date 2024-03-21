import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function CustomText({
  style,
  children,
  ellipsizeMode,
  numberOfLines,
  onPress,
  selectable,

  ...props
}) {
  return (
    <Text
      suppressHighlighting={'red'}
      selectable={selectable}
      {...props}
      onPress={onPress}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      allowFontScaling={false}
      style={style}>
      {children}
    </Text>
  );
}

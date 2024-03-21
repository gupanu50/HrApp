import {View, Text} from 'react-native';
import React from 'react';
import {BarIndicator} from 'react-native-indicators';

export default function PageLoader({color}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <BarIndicator color={color} size={28} count={4} />
    </View>
  );
}

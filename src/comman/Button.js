import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import Font from './Font';
import {BarIndicator} from 'react-native-indicators';

// import {useSelector} from 'react-redux';

const Button = ({
  btnwidth,
  btnheight,
  bgcolor,
  btnborder,
  bordercolor,
  onPress,
  buttonName,
  style,
  loader,
  btncolor,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.btn_container,
        style,
        {
          width: btnwidth || '90%',
          height: btnheight || 55,
          backgroundColor: bgcolor || '#00ADEF',
          borderWidth: btnborder,
          borderColor: bordercolor,
        },
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {loader ? (
          <BarIndicator color="white" size={28} count={4} />
        ) : (
          <Text
            allowFontScaling={false}
            style={[styles.normal_text, {color: btncolor || '#fff'}]}>
            {buttonName}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn_container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: '5%',
    borderRadius: 10,
  },
  normal_text: {
    color: '#fff',
    fontSize: 22,
    fontFamily: Font.bold,
    fontWeight: '600',
  },
});
export default Button;

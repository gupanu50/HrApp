import React from 'react';
import {
  StyleSheet,
  password,
  TouchableOpacity,
  TextInput,
  View,
  Text,
} from 'react-native';
import Font from './Font';
import CustomText from './CustomText';

const Input = ({
  editable,
  placeholder,
  secureTextEntry,
  iconName,
  keyboardType,
  height,
  width,
  value,
  showpress,
  onChangeText,
  maxLength,
  autoCapitalize,
  lefticon,
  rightButton,
}) => {
  return (
    <>
      <View style={styles.contaner}>
        <TextInput
          editable={editable}
          allowFontScaling={false}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          placeholderTextColor={'#8391A1'}
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          style={[styles.textStyle, {width: rightButton ? '90%' : '100%'}]}
        />

        <TouchableOpacity
          style={[styles.eyeicon, {width: rightButton ? '10%' : null}]}
          onPress={showpress}>
          {rightButton}
          {/* <Text
            adjustsFontSizeToFit
            style={{
              padding: 5,
              textAlign: 'right',
            }}>
            {rightButton}
          </Text> */}
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contaner: {
    borderWidth: 1,
    borderColor: '#E8ECF4',
    backgroundColor: '#F2FBFE',
    height: 55,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  eyeicon: {
    // width: rightButton ? '20%' : null,
    // bottom: 35,
    left: '-15%',
    alignItems: 'center',
    // backgroundColor: 'red',
  },

  textStyle: {
    fontSize: 15,
    fontFamily: Font.medium,
    // width: rightButton ? '70%' : '80%',

    shadowColor: '#6B6B66',

    // backgroundColor: 'red',
    padding: 10,
    color: '#1E1E1E',
  },
  Viewitem: {
    borderRadius: 10,
    height: 55,
    width: '100%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
});

export default Input;

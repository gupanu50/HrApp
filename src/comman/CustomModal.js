import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Font from './Font';
import {Colors} from './Theme';

const CustomModal = ({OptionModalValue, pressNo, pressYes, messageText}) => {
  return (
    <View>
      <Modal
        isVisible={OptionModalValue}
        onBackButtonPress={pressNo}
        onBackdropPress={pressNo}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          margin: 0,
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            width: '70%',
            minHeight: '20%',
            maxHeight: 'auto',
            paddingVertical: '5%',
            paddingHorizontal: '10%',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            allowFontScaling={false}
            style={{
              color: '#000',
              fontSize: 18,
              // fontFamily: fontFamily.regular,
              textAlign: 'center',
            }}>
            {messageText}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: '5%',
              width: '100%',
            }}>
            <TouchableOpacity onPress={pressNo} style={styles.buttonStyle}>
              <Text allowFontScaling={false} style={styles.buttonText}>
                No
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pressYes} style={[styles.buttonStyle]}>
              <Text allowFontScaling={false} style={[styles.buttonText]}>
                Yes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: '45%',
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.default,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: Font.bold,
    fontSize: 16,
    color: '#fff',
  },
});

export default CustomModal;

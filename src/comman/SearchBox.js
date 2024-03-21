import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Search from '../../asset/image/svg/search.svg';

export default function SearchBox({placeholder, onPress, onChangeText, value}) {
  return (
    <View style={styles.contain}>
      <TextInput
        placeholder={placeholder}
        width={'90%'}
        height={'100%'}
        style={{color: '#1E1E1E'}}
        onChangeText={onChangeText}
        value={value}
      />
      <TouchableOpacity onPress={onPress} style={styles.seaccharea}>
        <Search />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  seaccharea: {
    width: 30,
    height: 35,
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  contain: {
    backgroundColor: '#FFF',
    width: '90%',
    alignSelf: 'center',
    height: 45,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(156, 156, 156, 1)',
  },
});

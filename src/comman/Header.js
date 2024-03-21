import {
  View,
  Text,
  ImageBackground,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Back from '../../asset/image/svg/back.svg';
import Menu from '../../asset/image/svg/menu.svg';
import Noti from '../../asset/image/svg/Menu/Noti.svg';
import CustomText from './CustomText';
import Font from './Font';
import {useSelector} from 'react-redux';
import {DefaultImages, Colors} from './Theme';
import Fire from '../../asset/image/svg/Fire.svg';

export default function Header({
  HeaderName,
  Lefttext,
  textcolor,
  lefticon,
  Righticon,
  onPress,
  NoIcon,
  strickOpen,
  StirckActive,
  fire,
}) {
  const navigation = useNavigation();
  const userinfo = useSelector(state => state?.userInfo?.userInfo?.data);

  return (
    <View
      style={{
        height: 50,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        // backgroundColor: 'red',
      }}>
      <TouchableOpacity
        // onPress={Righticon ? onPress : () => navigation.goBack()}
        onPress={onPress}>
        {Righticon ? (
          <Menu height={35} width={35} />
        ) : (
          <Back height={35} width={35} />
        )}
      </TouchableOpacity>
      {Lefttext ? (
        <View style={{paddingHorizontal: 15}}>
          <CustomText
            style={[
              styles.headertext,
              {color: textcolor || Colors.headerText},
            ]}>
            {HeaderName}
          </CustomText>
        </View>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            width: '78%',

            alignItems: 'center',
          }}>
          <View
            style={{
              justifyContent: 'center',
              width: '78%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CustomText
              style={[
                styles.headertext,
                {color: textcolor || Colors.headerText},
              ]}>
              {HeaderName}
            </CustomText>
            {fire ? (
              <>
                <Fire marginHorizontal={5} />
                <CustomText
                  style={[
                    styles.headertext,
                    {color: textcolor || Colors.headerText},
                  ]}>
                  {userinfo?.streak}
                </CustomText>
              </>
            ) : null}
          </View>
          {StirckActive ? (
            <TouchableOpacity
              onPress={strickOpen}
              style={{
                borderBottomWidth: 1,
                borderColor: 'rgba(0, 0, 0, 0.77)',
                marginTop: 5,
              }}>
              <CustomText>How to maintain Streak</CustomText>
            </TouchableOpacity>
          ) : null}
        </View>
      )}

      {lefticon ? (
        <TouchableOpacity
          style={styles.profile}
          onPress={() => navigation.navigate('Profile')}>
          <Image
            style={{height: '100%', width: '100%', borderRadius: 50}}
            source={{uri: userinfo?.profile_pic}}
          />
        </TouchableOpacity>
      ) : NoIcon ? null : (
        <TouchableOpacity onPress={() => navigation.navigate('Notificaton')}>
          <Noti height={35} width={35} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    height: '90%',
    width: 45,
    borderRadius: 30,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headertext: {
    fontFamily: Font.bold,
    fontSize: 18,
    color: '#FFF',
    fontWeight: '700',
  },
});

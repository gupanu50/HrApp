import {StatusBar} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import Font from './Font';

export const successToast = (title, subTitle) => {
  showMessage({
    message: title,
    description: subTitle,
    duration: 3000,
    // hideStatusBar: true,
    icon: 'auto',
    titleProps: {
      allowFontScaling: false,
    },
    textProps: {allowFontScaling: false},
    type: 'success',
    titleStyle: {
      fontFamily: Font.regular,
      lineHeight: 14 * 1.4,
      fontSize: 16,
    },
    textStyle: {
      fontFamily: Font.regular,
    },
  });
};

export const errorToast = (title, subTitle) => {
  showMessage({
    message: title,
    description: subTitle,
    duration: 3000,
    type: 'danger',
    icon: 'auto',
    titleProps: {
      allowFontScaling: false,
    },
    textProps: {allowFontScaling: false},
    titleStyle: {
      fontFamily: Font.regular,
      lineHeight: 14 * 1.4,
      fontSize: 16,
    },
    textStyle: {
      fontFamily: Font.regular,
    },
  });
};

export const infoToast = (title, subTitle) => {
  showMessage({
    message: title,
    description: subTitle,
    duration: 3000,
    type: 'info',
    icon: 'auto',
    titleProps: {
      allowFontScaling: false,
    },
    textProps: {allowFontScaling: false},
    titleStyle: {
      fontFamily: Font.regular,
      lineHeight: 14 * 1.4,
      fontSize: 16,
    },
    textStyle: {
      fontFamily: Font.regular,
    },
  });
};

export const warnToast = (title, subTitle) => {
  showMessage({
    message: title,
    description: subTitle,
    duration: 3000,
    type: 'warning',
    icon: 'auto',
    titleProps: {
      allowFontScaling: false,
    },
    textProps: {allowFontScaling: false},
    titleStyle: {
      fontFamily: Font.regular,
      lineHeight: 14 * 1.4,
      fontSize: 16,
    },
    textStyle: {
      fontFamily: Font.regular,
    },
  });
};

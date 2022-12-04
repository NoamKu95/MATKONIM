import React from 'react';
import {
  Image,
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {notInitialized} from 'react-redux/es/utils/useSyncExternalStore';
import {colors} from '../../constants/colors';
import {icons} from '../../constants/icons';
import RegularText from '../text/RegularText';

interface Props {
  textValue: string;
  textColor?: string;

  placeholderText: string;
  placeholderTextColor?: string;

  isShowWarning: boolean;
  warningText: string | null;
  warningTextColor?: string;
  warningTextSize?: number;

  backgroundColor?: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;

  isCensored?: boolean;
  iconOnPress?: (() => void) | null;
}

const CustomTextInput = ({
  textValue,
  textColor = colors.black,
  placeholderText,
  placeholderTextColor = colors.transparentBlack3,
  warningText,
  isShowWarning = false,
  warningTextColor = 'red',
  warningTextSize = 12,
  backgroundColor = colors.white,
  onChangeText,
  keyboardType = 'default',
  isCensored = false,
  iconOnPress = null,
}: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.textInput, {color: textColor, backgroundColor}]}
        onChangeText={onChangeText}
        value={textValue}
        placeholder={placeholderText}
        placeholderTextColor={placeholderTextColor}
        textAlign="right"
        maxLength={25}
        keyboardType={keyboardType}
        secureTextEntry={isCensored}
      />
      {iconOnPress !== null && (
        <Pressable
          style={[styles.iconWrapper, {opacity: isCensored ? 0.25 : 1}]}
          onPress={iconOnPress}>
          <Image source={icons.openEye} resizeMethod="resize" />
        </Pressable>
      )}
      <View style={styles.warningContainer}>
        <RegularText
          children={warningText}
          size={warningTextSize}
          color={isShowWarning ? warningTextColor : colors.transparent}
          textAlign="left"
          lineHeight={16}
        />
      </View>
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
  },
  textInput: {
    borderRadius: 12,
    paddingHorizontal: 24,
  },
  iconWrapper: {
    position: 'absolute',
    right: 24,
    top: 20,
  },
  warningContainer: {
    paddingVertical: 4,
  },
});

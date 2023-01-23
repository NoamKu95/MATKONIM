import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { colors } from "../../constants/colors";
import { icons } from "../../constants/icons";
import RegularText from "../text/RegularText";
import i18n from "../../translations/i18n";
import { HE } from "../../models/translations";

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
  onChangeText: (newTxt: string) => void;
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
  warningTextColor = "red",
  warningTextSize = 12,
  backgroundColor = colors.white,
  onChangeText,
  keyboardType = "default",
  isCensored = false,
  iconOnPress = null,
}: Props) => {
  const [text, setText] = useState(textValue);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (text != null) {
        onChangeText(text);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.textInput, { color: textColor, backgroundColor }]}
        onChangeText={(newTxt) => {
          setText(newTxt);
        }}
        defaultValue={textValue}
        placeholder={placeholderText}
        placeholderTextColor={placeholderTextColor}
        maxLength={25}
        keyboardType={keyboardType}
        secureTextEntry={isCensored}
        textAlign={i18n.locale === HE ? "right" : "left"}
      />
      {iconOnPress !== null && (
        <Pressable
          style={[styles.iconWrapper, { opacity: isCensored ? 0.25 : 1 }]}
          onPress={iconOnPress}
        >
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
    textAlign: "right",
  },
  iconWrapper: {
    position: "absolute",
    right: i18n.locale === HE ? 24 : 0,
    left: i18n.locale === HE ? 0 : 24,
    top: 20,
  },
  warningContainer: {
    paddingVertical: 4,
  },
});

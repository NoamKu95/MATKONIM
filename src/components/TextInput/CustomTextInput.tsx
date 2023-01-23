// Outer imports:
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import i18n from "../../translations/i18n";
import { HE } from "../../models/translations";

// Inner imports:
import { colors } from "../../constants/colors";
import { icons } from "../../constants/icons";

// Components:
import RegularText from "../text/RegularText";

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

  // useEffect(() => {
  //   console.log("text2 " + text); // does print

  //   const delayDebounceFn = setTimeout(() => {
  //     console.log("text3 " + text); // not print
  //     if (text != null) {
  //       onChangeText(text);
  //     }
  //   }, 7);

  //   return () => clearTimeout(delayDebounceFn);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [text]);

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.textInput, { color: textColor, backgroundColor }]}
        onChangeText={(newTxt) => onChangeText(newTxt)} // setText(newTxt)}
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
    right: 24,
    top: 20,
  },
  warningContainer: {
    paddingVertical: 4,
  },
});

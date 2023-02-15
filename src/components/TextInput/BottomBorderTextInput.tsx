// Outer imports:
import React from "react";
import { KeyboardTypeOptions, StyleSheet, TextInput, View } from "react-native";
import i18n from "../../translations/i18n";

// Inner imports:
import { colors } from "../../constants/colors";
import { HE } from "../../models/translations";

// Components:
import BoldText from "../text/BoldText";
import RegularText from "../text/RegularText";
import { paddings } from "../../constants/paddings";

interface Props {
  textValue: string;
  textColor?: string;
  textSize?: number;

  placeholderText: string;
  placeholderTextColor?: string;

  labelText: string;
  labelTextColor?: string;
  labelTextSize?: number;

  warningText?: string | null;
  warningTextColor?: string;
  warningTextSize?: number;

  backgroundColor?: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;

  maxTextLength?: number;
}

const BottomBorderTextInput = ({
  textValue,
  textColor = colors.black,
  textSize = 14,

  placeholderText,
  placeholderTextColor = colors.transparentBlack3,

  labelText,
  labelTextColor = colors.black,
  labelTextSize = 14,

  warningText,
  warningTextColor = "red",
  warningTextSize = 12,

  backgroundColor = colors.white,
  onChangeText,
  keyboardType = "default",

  maxTextLength = 25,
}: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.textInput,
          { color: textColor, backgroundColor, fontSize: textSize },
        ]}
        onChangeText={onChangeText}
        value={textValue}
        placeholder={placeholderText}
        placeholderTextColor={placeholderTextColor}
        textAlign={i18n.locale === HE ? "right" : "left"}
        maxLength={maxTextLength}
        keyboardType={keyboardType}
      />

      <View style={styles.labelWarningContainer}>
        <BoldText
          children={labelText}
          size={labelTextSize}
          color={labelTextColor}
          textAlign="left"
          lineHeight={16}
        />

        {warningText !== null && (
          <RegularText
            children={warningText}
            color={warningTextColor}
            size={warningTextSize}
            textAlign="right"
          />
        )}
      </View>
    </View>
  );
};

export default BottomBorderTextInput;

const styles = StyleSheet.create({
  container: {
    paddingVertical: paddings._8px,
    paddingHorizontal: paddings._8px,
  },
  textInput: {
    borderRadius: 12,
    paddingHorizontal: paddings._12px,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkLime,
  },
  labelWarningContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: paddings._12px,
    paddingVertical: paddings._8px,
  },
});

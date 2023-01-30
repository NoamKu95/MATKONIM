import { StyleSheet, Text, TextStyle } from "react-native";
import React from "react";
import { Fonts } from "../../constants/fonts";
import { colors } from "../../constants/colors";
import i18n from "../../translations/i18n";

interface RegularTextProps {
  color?: string;
  children: string | null; // ask Chen
  size: number;
  lineHeight?: number;
  textAlign?: "right" | "left" | "center" | "justify";
  letterSpacing?: number;
  numberOfLines?: number;
}

const RegularText = ({
  children,
  color,
  size,
  textAlign = "center",
  lineHeight = 16,
  letterSpacing = 0,
  numberOfLines,
}: RegularTextProps) => {
  const isHebrew =
    i18n.locale === "he" || i18n.locale === "he-IL" ? true : false;
  const dynamicStyleObject: TextStyle = {
    color: color ? color : colors.white,
    fontSize: size,
    lineHeight: lineHeight,
    textAlign: textAlign,
    letterSpacing: letterSpacing,
  };
  return (
    <Text
      style={[styles(isHebrew).text, dynamicStyleObject]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

export default RegularText;

const styles = (isHebrew: boolean) => {
  return StyleSheet.create({
    text: {
      fontFamily: isHebrew ? Fonts.RUBIK : Fonts.MONTSERRAT,
      textAlign: "center",
    },
  });
};

// Outer imports:
import React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";
import i18n from "../../translations/i18n";

// Inner imports:
import { Fonts } from "../../constants/fonts";
import { colors } from "../../constants/colors";
import { HE } from "../../models/translations";

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
  color = colors.white,
  size,
  textAlign = "center",
  lineHeight = 16,
  letterSpacing = 0,
  numberOfLines,
}: RegularTextProps) => {
  const isHebrew = i18n.locale === HE;
  const dynamicStyleObject: TextStyle = {
    color: color,
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

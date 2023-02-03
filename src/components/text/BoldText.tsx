// Outer imports:
import React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";
import i18n from "../../translations/i18n";

// Inner imports:
import { colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { HE } from "../../models/translations";

interface BoldTextProps {
  color?: string;
  children: string;
  size: number;
  lineHeight?: number;
  textAlign?: "right" | "left" | "center";
  letterSpacing?: number;
}

const BoldText = ({
  children,
  color,
  size,
  textAlign = "center",
  lineHeight = 16,
  letterSpacing = 0,
}: BoldTextProps) => {
  const dynamicStyleObject: TextStyle = {
    color: color ? color : colors.black,
    fontSize: size,
    lineHeight: lineHeight,
    textAlign: textAlign,
    letterSpacing: letterSpacing,
    fontWeight: "bold",
  };
  return <Text style={[styles.text, dynamicStyleObject]}>{children}</Text>;
};

export default BoldText;

const styles = StyleSheet.create({
  text: {
    fontFamily: i18n.locale === HE ? Fonts.RUBIK_BOLD : Fonts.MONTSERRAT_BOLD,
    textAlign: "center",
  },
});

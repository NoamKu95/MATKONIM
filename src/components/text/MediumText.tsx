// Outer imports:
import React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";
import i18n from "../../translations/i18n";

// Inner imports:
import { Fonts } from "../../constants/fonts";
import { colors } from "../../constants/colors";
import { HE } from "../../models/translations";

interface MediumTextProps {
  color?: string;
  children: string;
  size: number;
  lineHeight?: number;
  textAlign?: "right" | "left" | "center";
  letterSpacing?: number;
}

const MediumText = ({
  children,
  color,
  size,
  textAlign = "center",
  lineHeight = 16,
  letterSpacing = 0,
}: MediumTextProps) => {
  const isHebrew = i18n.locale == HE;
  const dynamicStyleObject: TextStyle = {
    color: color ? color : colors.white,
    fontSize: size,
    lineHeight: lineHeight,
    textAlign: textAlign,
    letterSpacing: letterSpacing,
  };
  return (
    <Text style={[styles(isHebrew).text, dynamicStyleObject]}>{children}</Text>
  );
};

export default MediumText;

const styles = (isHebrew: boolean) => {
  return StyleSheet.create({
    text: {
      fontFamily: isHebrew ? Fonts.RUBIK_MEDIUM : Fonts.MONTSERRAT_MEDIUM,
      textAlign: "center",
    },
  });
};

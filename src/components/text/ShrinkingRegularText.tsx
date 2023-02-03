// Outer imports:
import React, { useState } from "react";
import { StyleSheet, Text, TextStyle } from "react-native";
import i18n from "../../translations/i18n";

// Inner imports:
import { colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { HE } from "../../models/translations";

interface RegularTextProps {
  color?: string;
  children: string;
  size: number;
  lineHeight?: number;
  textAlign?: "right" | "left" | "center" | "justify";
  letterSpacing?: number;
  numberOfLines?: number;
}

const ShrinkingRegularText = ({
  children,
  color,
  size,
  textAlign = "center",
  lineHeight = 16,
  letterSpacing = 0,
  numberOfLines = 1,
}: RegularTextProps) => {
  const [currentFont, setCurrentFont] = useState(size);
  const [currentLineHeight, setCurrentLineHeight] = useState(lineHeight);
  const dynamicStyleObject: TextStyle = {
    color: color ? color : colors.black,
    textAlign: textAlign,
    letterSpacing: letterSpacing,
    fontWeight: "bold",
  };
  return (
    <Text
      style={[styles.text, dynamicStyleObject]}
      numberOfLines={numberOfLines}
      onTextLayout={(e) => {
        const { lines } = e.nativeEvent;
        if (lines.length > numberOfLines) {
          setCurrentFont(currentFont - 1);
          setCurrentLineHeight(currentLineHeight - 1);
        }
      }}
    >
      {children}
    </Text>
  );
};

export default ShrinkingRegularText;

const styles = StyleSheet.create({
  text: {
    fontFamily: i18n.locale === HE ? Fonts.RUBIK_BOLD : Fonts.MONTSERRAT_BOLD,
    textAlign: "center",
  },
});

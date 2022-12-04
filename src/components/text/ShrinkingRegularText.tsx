import {StyleSheet, Text, TextStyle} from 'react-native';
import React, {useState} from 'react';
import {Fonts} from '../../constants/fonts';
import {colors} from '../../constants/colors';
import i18n from '../../translations/i18n';

interface RegularTextProps {
  color?: string;
  children: string;
  size: number;
  lineHeight?: number;
  textAlign?: 'right' | 'left' | 'center' | 'justify';
  letterSpacing?: number;
  numberOfLines?: number;
}

const ShrinkingRegularText = ({
  children,
  color,
  size,
  textAlign = 'center',
  lineHeight = 16,
  letterSpacing = 0,
  numberOfLines = 1,
}: RegularTextProps) => {
  const isHebrew =
    i18n.locale === 'he' || i18n.locale === 'he-IL' ? true : false;
  const [currentFont, setCurrentFont] = useState(size);
  const [currentLineHeight, setCurrentLineHeight] = useState(lineHeight);
  const dynamicStyleObject: TextStyle = {
    color: color ? color : colors.black,
    textAlign: textAlign,
    letterSpacing: letterSpacing,
    fontWeight: 'bold',
  };
  return (
    <Text
      style={[styles(isHebrew).text, dynamicStyleObject]}
      numberOfLines={numberOfLines}
      onTextLayout={e => {
        const {lines} = e.nativeEvent;
        if (lines.length > numberOfLines) {
          setCurrentFont(currentFont - 1);
          setCurrentLineHeight(currentLineHeight - 1);
        }
      }}>
      {children}
    </Text>
  );
};

export default ShrinkingRegularText;

const styles = (isHebrew: boolean) => {
  return StyleSheet.create({
    text: {
      fontFamily: isHebrew ? Fonts.RUBIK : Fonts.MONTSERRAT,
      textAlign: 'center',
    },
  });
};

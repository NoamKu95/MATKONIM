import {StyleSheet, Text, TextStyle} from 'react-native';
import React from 'react';
import {Fonts} from '../../constants/fonts';
import {colors} from '../../constants/colors';
import i18n from '../../translations/i18n';

interface BoldTextProps {
  color?: string;
  children: string;
  size: number;
  lineHeight?: number;
  textAlign?: 'right' | 'left' | 'center';
  letterSpacing?: number;
}

const BoldText = ({
  children,
  color,
  size,
  textAlign = 'center',
  lineHeight = 16,
  letterSpacing = 0,
}: BoldTextProps) => {
  const isHebrew =
    i18n.locale === 'he' || i18n.locale === 'he-IL' ? true : false;
  const dynamicStyleObject: TextStyle = {
    color: color ? color : colors.black,
    fontSize: size,
    lineHeight: lineHeight,
    textAlign: textAlign,
    letterSpacing: letterSpacing,
    fontWeight: 'bold',
  };
  return (
    <Text style={[styles(isHebrew).text, dynamicStyleObject]}>{children}</Text>
  );
};

export default BoldText;

const styles = (isHebrew: boolean) => {
  return StyleSheet.create({
    text: {
      fontFamily: isHebrew ? Fonts.RUBIK_BOLD : Fonts.MONTSERRAT_BOLD,
      textAlign: 'center',
    },
  });
};

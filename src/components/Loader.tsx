import React from 'react';
import {StyleSheet, View, ActivityIndicator, ViewStyle} from 'react-native';
import {colors} from '../constants/colors';
import BoldText from './text/BoldText';

type Props = {
  style?: ViewStyle;
  text?: string | null;
};

const Loader: React.FC<Props> = ({style, text}: Props) => {
  return (
    <View style={[styles.loadingContainer, style]}>
      <ActivityIndicator size="large" color={colors.darkLime} />
      <View style={styles.textContainer}>
        <BoldText
          children={text ?? ''}
          size={16}
          color={colors.darkLime}
          textAlign="center"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    paddingVertical: 24,
  },
});

export default Loader;

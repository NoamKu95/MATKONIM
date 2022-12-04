// Outer imports:
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  GestureResponderEvent,
  Pressable,
} from 'react-native';
import {colors} from '../constants/colors';
import BoldText from './text/BoldText';
import RegularText from './text/RegularText';

// Inner imports:

interface Props {
  mainText: string;
  buttonText: string;
  onPress: (event: GestureResponderEvent) => void;
}

const Callout = (props: Props) => {
  const {mainText, buttonText, onPress} = props;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <RegularText
          children={mainText}
          size={14}
          color={colors.darkLime}
          textAlign="left"
          lineHeight={24}
        />

        <Pressable style={styles.buttonContainer} onPress={onPress}>
          <BoldText
            children={buttonText}
            size={16}
            color={colors.gray}
            textAlign="left"
            lineHeight={18}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Callout;

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 12,
    backgroundColor: colors.lightGreen,
    paddingHorizontal: 24,
    paddingVertical: 4,
  },
  textContainer: {
    flex: 1,
    paddingVertical: 16,
  },
  text: {
    color: colors.gray,
  },
  buttonContainer: {
    paddingTop: 12,
  },
});

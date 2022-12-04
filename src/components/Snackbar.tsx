// Outer imports:
import React from 'react';
import {
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {colors} from '../constants/colors';
import {icons} from '../constants/icons';
import FadePanel from './animations/FadePanel';
import BoldText from './text/BoldText';

// Inner imports:

interface Props {
  text: string;
  textSize?: number;
  textColor: string;
  textAlign?: 'left' | 'right' | 'center';
  bgColor: string;
  isVisible: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

const Snackbar = ({
  text,
  textSize = 12,
  textColor,
  textAlign = 'left',
  bgColor,
  isVisible = false,
  onPress,
}: Props) => {
  const renderSnackbar = () => {
    return (
      <View style={[styles.mainContainer, {backgroundColor: bgColor}]}>
        <BoldText
          children={text}
          size={textSize}
          color={textColor}
          textAlign={textAlign}
          lineHeight={textSize}
        />
        <Pressable hitSlop={10} style={styles.iconWrapper} onPress={onPress}>
          <Image
            source={icons.close}
            resizeMethod="resize"
            style={styles.icon}
          />
        </Pressable>
      </View>
    );
  };

  return (
    <>
      {isVisible ? (
        <FadePanel children={renderSnackbar()} visible={isVisible} />
      ) : (
        <></>
      )}
    </>
  );
};

export default Snackbar;

const styles = StyleSheet.create({
  mainContainer: {
    height: 50,
    width: '100%',
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    borderBottomWidth: 0.8,
    paddingHorizontal: 12,
    borderColor: colors.darkLime,
    shadowColor: colors.lightGray2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  iconWrapper: {
    position: 'absolute',
    top: 5,
    right: 5,
    opacity: 0.5,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

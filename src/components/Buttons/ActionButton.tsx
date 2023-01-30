import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  Pressable,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../constants/colors";
import BoldText from "../text/BoldText";

interface Props {
  buttonText: string;
  buttonTextColor: string;
  buttonTextSize: number;
  buttonContainerStyle: any;
  buttonColors: string[];
  onPress: (event: GestureResponderEvent) => void;
  isPressable?: boolean;
}

const ActionButton = ({
  buttonText,
  buttonTextColor,
  buttonTextSize,
  buttonContainerStyle,
  buttonColors,
  onPress,
  isPressable = true,
}: Props) => {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={
          isPressable
            ? buttonColors
            : [colors.transparentBlack1, colors.transparentBlack1]
        }
        style={buttonContainerStyle}
      >
        <BoldText
          children={buttonText}
          size={buttonTextSize}
          color={isPressable ? buttonTextColor : colors.transparentBlack3}
          textAlign="center"
          lineHeight={18}
        />
      </LinearGradient>
    </Pressable>
  );
};

export default ActionButton;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = StyleSheet.create({});

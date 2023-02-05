// Outer imports:
import React from "react";
import { StyleSheet, GestureResponderEvent, Pressable } from "react-native";

// Inner imports:
import { colors } from "../constants/colors";

// Components:
import RegularText from "./text/RegularText";

// Inner imports:

interface Props {
  text: string;
  textSize?: number;

  bgColor: string;
  selectedBgColor: string;

  isSelected: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

const Chip = ({
  text,
  textSize = 14,
  bgColor,
  selectedBgColor,
  isSelected,
  onPress,
}: Props) => {
  return (
    <Pressable
      style={[
        styles.mainContainer,
        { backgroundColor: isSelected ? selectedBgColor : bgColor },
      ]}
      onPress={onPress}
    >
      <RegularText
        children={text}
        size={textSize}
        color={isSelected ? colors.white : colors.darkLime}
        textAlign="center"
      />
    </Pressable>
  );
};

export default Chip;

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: 100,
    alignItems: "center",
    marginHorizontal: 4,
    marginTop: 12,
    marginBottom: 4,
  },
  textContainer: {
    flex: 1,
    paddingVertical: 16,
  },
});

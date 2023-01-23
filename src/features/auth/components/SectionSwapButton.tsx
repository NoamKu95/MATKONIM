// Outer imports:
import React from "react";
import { Pressable, StyleSheet } from "react-native";

// Inner imports:
import { colors } from "../../../constants/colors";

// Components:
import BoldText from "../../../components/text/BoldText";

// Redux:
import { useAppDispatch } from "../../../store/store";
import { updateAuthSection } from "../state/authActions";

interface Props {
  text: string;
  moveToSection: string;
}

const SectionSwapButton = ({ text, moveToSection }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <Pressable
      style={styles.bottomMiniButton}
      onPress={() => {
        dispatch(updateAuthSection(moveToSection));
      }}
    >
      <BoldText
        children={text}
        size={12}
        color={colors.darkGreen}
        textAlign="center"
        lineHeight={16}
      />
    </Pressable>
  );
};

export default SectionSwapButton;

const styles = StyleSheet.create({
  bottomMiniButton: {
    paddingTop: 16,
  },
});

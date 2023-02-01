// Outer imports:
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { colors } from "../../constants/colors";

// Inner imports:

// Types:
import BoldText from "../text/BoldText";
import RegularText from "../text/RegularText";
import ShrinkingRegularText from "../text/ShrinkingRegularText";

// Components:

interface Props {
  stepNumber: number;
  stepText: string;
  isLastIndex: boolean;
  isCardFocused: boolean;
}

const PreparationStepCard: React.FC<Props> = ({
  stepNumber,
  stepText,
  isLastIndex = false,
  isCardFocused = false,
}: Props) => {
  return (
    <View
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          marginRight: isLastIndex ? 20 : 10,
          marginLeft: isLastIndex ? 10 : 20,
          backgroundColor: isCardFocused ? colors.lightLime : colors.lightGray,
        },
      ]}
    >
      <View style={styles.stepNumberContainer}>
        <BoldText
          children={`${stepNumber}`}
          color={colors.lightLime}
          size={100}
          textAlign="left"
          lineHeight={100}
        />
      </View>
      <View style={styles.stepTextContainer}>
        <ShrinkingRegularText
          children={`${stepText}`}
          color={colors.transparentBlack7}
          size={20}
          textAlign="justify"
          lineHeight={20}
          numberOfLines={5}
        />
      </View>
    </View>
  );
};

export default PreparationStepCard;

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: 250,
    borderRadius: 16,
    marginBottom: 2,
    shadowColor: colors.lightGray2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  stepNumberContainer: {
    position: "absolute",
    top: 15,
    left: 15,
  },
  stepTextContainer: {
    paddingHorizontal: 12,
    paddingTop: "15%",
    paddingBottom: 12,
  },
});

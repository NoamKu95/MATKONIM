// Outer imports:
import React from "react";
import { View, StyleSheet } from "react-native";

// Inner imports:
import { colors } from "../../constants/colors";
import { paddings } from "../../constants/paddings";
import { STEP_CARD_HEIGHT, STEP_CARD_WIDTH } from "../../constants/sizes";

// Components:
import BoldText from "../text/BoldText";
import ShrinkingRegularText from "../text/ShrinkingRegularText";

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
        styles().container,
        isLastIndex ? styles().containerForLastIndex : {},
        isCardFocused ? styles().containerForFocused : {},
      ]}
    >
      <View style={styles().stepNumberContainer}>
        <BoldText
          children={`${stepNumber}`}
          color={isCardFocused ? colors.white : colors.lightLime}
          size={100}
          textAlign="left"
          lineHeight={100}
        />
      </View>
      <View style={styles(stepText.length).stepTextContainer}>
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

const styles = (textLength?: number) =>
  StyleSheet.create({
    container: {
      height: STEP_CARD_HEIGHT,
      width: STEP_CARD_WIDTH,
      backgroundColor: colors.lightGray,
      borderRadius: 16,

      marginRight: 10,
      marginLeft: 20,

      shadowColor: colors.lightGray2,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 2,
      marginBottom: 2,
    },
    containerForLastIndex: {
      marginRight: 20,
      marginLeft: 10,
    },
    containerForFocused: {
      backgroundColor: colors.lightLime,
    },

    stepNumberContainer: {
      position: "absolute",
      paddingTop: paddings._24px,
      paddingHorizontal: paddings._8px,
    },
    // @ts-ignore
    stepTextContainer: {
      paddingHorizontal: textLength ?? 0 > 50 ? paddings._8px : paddings._12px,
      paddingVertical: textLength ?? 0 > 50 ? paddings._24px : paddings._32px,
    },
  });

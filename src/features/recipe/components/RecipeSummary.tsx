// Outer imports:
import React from "react";
import { View, StyleSheet } from "react-native";
import i18n from "../../../translations/i18n";

// Inner imports:
import { colors } from "../../../constants/colors";
import { paddings } from "../../../constants/paddings";

// Components:
import MediumText from "../../../components/text/MediumText";
import ShrinkingBoldText from "../../../components/text/ShrinkingBoldText";

interface Props {
  name: string;
  serving: number;
  duration: string;
}

const RecipeSummary = ({ name, serving, duration }: Props) => {
  return (
    <View style={styles.recipeSummaryContainer}>
      <View style={styles.recipeNameWrapper}>
        <ShrinkingBoldText
          children={name}
          color={colors.black}
          size={28}
          textAlign="left"
          letterSpacing={0.5}
          lineHeight={28}
        />
      </View>
      <MediumText
        children={`${duration}  ||  ${serving} ${i18n.t(
          "recipeCard.servings"
        )}`}
        color={colors.transparentBlack5}
        size={16}
        textAlign="left"
      />
      <View style={styles.divider} />
    </View>
  );
};

export default RecipeSummary;

const styles = StyleSheet.create({
  recipeSummaryContainer: {
    paddingHorizontal: paddings._16px,
    paddingTop: paddings._12px,
    justifyContent: "space-evenly",
  },
  recipeNameWrapper: {
    paddingVertical: paddings._8px,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: colors.darkGreen,
    borderStyle: "dashed",
    paddingVertical: paddings._8px,
  },
});

// Outer imports:
import React from "react";
import { View, StyleSheet } from "react-native";

// Inner imports:
import { colors } from "../../constants/colors";
import { paddings } from "../../constants/paddings";

// Components:
import BoldText from "../text/BoldText";
import ShrinkingBoldText from "../text/ShrinkingBoldText";

// Types:
import { Ingredient } from "../../models/ingredient";

interface Props {
  ingredient: Ingredient;
  isLastIndex: boolean;
}

const IngredientCard: React.FC<Props> = ({
  ingredient,
  isLastIndex = false,
}: Props) => {
  return (
    <View
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          marginRight: !isLastIndex ? 10 : 20,
          marginLeft: !isLastIndex ? 20 : 10,
        },
      ]}
    >
      <View style={styles.quantityContainer}>
        <ShrinkingBoldText
          children={`${ingredient.amount}`}
          color={colors.lightLime}
          size={75}
          textAlign="left"
          lineHeight={75}
        />
      </View>
      <View style={[styles.measurementContainer]}>
        <BoldText
          children={ingredient.measure}
          color={colors.darkGreen}
          size={18}
          textAlign="left"
          lineHeight={18}
        />
      </View>
      <View style={styles.ingNameContainer}>
        <ShrinkingBoldText
          children={ingredient.name}
          color={colors.darkGreen}
          size={35}
          textAlign="left"
          lineHeight={35}
          numberOfLines={2}
        />
      </View>
    </View>
  );
};

export default IngredientCard;

const styles = StyleSheet.create({
  container: {
    height: 130,
    width: 150,
    borderRadius: 16,
    backgroundColor: colors.lightGray,

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
  measurementContainer: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  quantityContainer: {
    paddingTop: paddings._24px,
    paddingHorizontal: paddings._8px,
  },
  ingNameContainer: {
    position: "absolute",
    bottom: "5%",
    paddingHorizontal: paddings._8px,
  },
});

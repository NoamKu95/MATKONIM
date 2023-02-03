// Outer imports:
import React from "react";
import {
  View,
  Image,
  StyleSheet,
  GestureResponderEvent,
  Pressable,
} from "react-native";

// Inner imports:
import { colors } from "../../constants/colors";
import { images } from "../../constants/images";
import { paddings } from "../../constants/paddings";
import { RECIPE_CARD_HEIGHT, RECIPE_CARD_WIDTH } from "../../constants/sizes";

// Types:
import { Recipe } from "../../models/recipe";
import { HE } from "../../models/translations";
import i18n from "../../translations/i18n";

// Components:
import CardInfo from "../InfoSquares/CardInfo";
import RegularText from "../text/RegularText";

interface Props {
  recipe: Recipe;
  isLastIndex?: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

const RecipeCard: React.FC<Props> = ({
  recipe,
  isLastIndex = false,
  onPress,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        isLastIndex ? styles.containerForLastIndex : null,
      ]}
    >
      <Image
        source={
          recipe.image
            ? {
                uri: recipe.image,
              }
            : images.loginBackground
        }
        style={styles.backgroundImage}
      />

      <View style={styles.categoryContainer}>
        <RegularText
          children={recipe.category}
          color={colors.white}
          size={12}
          textAlign="left"
        />
      </View>

      <View style={styles.cardInfoContainer}>
        <CardInfo
          titleText={recipe.name}
          subtitleText={`${recipe.duration}   ||   ${recipe.serving} ${i18n.t(
            "recipeCard.servings"
          )}`}
        />
      </View>
    </Pressable>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  container: {
    height: RECIPE_CARD_HEIGHT,
    width: RECIPE_CARD_WIDTH,
    borderRadius: 12,
    marginLeft: i18n.locale === HE ? paddings._8px : 0,
    marginRight: paddings._8px,
  },
  containerForLastIndex: {
    marginLeft: i18n.locale === HE ? paddings._8px : 0,
    // marginRight: i18n.locale === HE ? paddings._8px : 0,
  },
  backgroundImage: {
    height: RECIPE_CARD_HEIGHT,
    width: RECIPE_CARD_WIDTH,
    borderRadius: 12,
  },
  categoryContainer: {
    position: "absolute",
    top: 20,
    left: 15,
    paddingHorizontal: paddings._16px,
    paddingVertical: paddings._4px,

    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 50,
    backgroundColor: colors.transparentBlack5,
  },
  cardInfoContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    paddingHorizontal: paddings._12px,
  },
});

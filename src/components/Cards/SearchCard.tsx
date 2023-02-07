// Outer imports:
import React from "react";
import {
  View,
  Image,
  StyleSheet,
  GestureResponderEvent,
  Pressable,
} from "react-native";
import i18n from "../../translations/i18n";

// Inner imports:
import { colors } from "../../constants/colors";
import { images } from "../../constants/images";

// Types:
import { Recipe } from "../../models/recipe";

// Components:
import BoldText from "../text/BoldText";
import RegularText from "../text/RegularText";

interface Props {
  recipe: Recipe;
  onPress: (event: GestureResponderEvent) => void;
}

const SearchCard: React.FC<Props> = ({ recipe, onPress }: Props) => {
  return (
    <Pressable onPress={onPress} style={styles.cardContainer}>
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
      <View style={styles.cardInfoContainer}>
        <View>
          <BoldText
            children={recipe.name}
            size={18}
            color={colors.black}
            textAlign="left"
            lineHeight={24}
          />
          <RegularText
            children={`${recipe.duration}   ||   ${recipe.serving} ${i18n.t(
              "recipeCard.servings"
            )}`}
            color={colors.black}
            size={12}
            textAlign="left"
          />
        </View>
        <View style={styles.categoryBadge}>
          <BoldText
            children={recipe.category}
            size={12}
            color={colors.white}
            textAlign="center"
          />
        </View>
      </View>
    </Pressable>
  );
};

export default SearchCard;

const styles = StyleSheet.create({
  cardContainer: {
    height: 250,
    borderWidth: 0,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: colors.lightGray2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  backgroundImage: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    overflow: "hidden",
  },

  // INFO TEXTS
  cardInfoContainer: {
    backgroundColor: colors.white,
    height: 70,
    width: "99%",
    alignSelf: "center",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },

  categoryBadge: {
    backgroundColor: colors.darkLime,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 50,
    maxHeight: 30,
  },
});

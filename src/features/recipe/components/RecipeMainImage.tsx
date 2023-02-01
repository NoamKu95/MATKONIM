// Outer imports:
import React from "react";
import {
  View,
  StyleSheet,
  Image,
  GestureResponderEvent,
  Pressable,
} from "react-native";
import i18n from "../../../translations/i18n";

// Inner imports:
import { colors } from "../../../constants/colors";
import { icons } from "../../../constants/icons";
import { images } from "../../../constants/images";
import { HE } from "../../../models/translations";

// Types:
import { Recipe } from "../../../models/recipe";

interface Props {
  recipe: Recipe | null;
  onBackPress: (event: GestureResponderEvent) => void;
}

const HEADER_HEIGHT = 250;

const RecipeMainImage = ({ recipe, onBackPress }: Props) => {
  return (
    <View>
      <Image
        source={{
          uri: recipe?.image,
        }}
        resizeMode="cover"
        style={styles.recipeHeaderImage}
      />

      <Pressable onPress={onBackPress} style={styles.backBtn}>
        <Image source={icons.back} style={styles.backIcon} />
      </Pressable>
    </View>
  );
};

export default RecipeMainImage;

const styles = StyleSheet.create({
  recipeHeaderImage: {
    height: HEADER_HEIGHT,
    width: "100%",
  },
  backBtn: {
    height: 35,
    width: 35,

    position: "absolute",
    top: "5%",
    // right: i18n.locale === HE ? "5%" : "0%",
    left: i18n.locale === HE ? "5%" : undefined,
    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 50,
    backgroundColor: colors.transparentBlack5,
  },
  backIcon: {
    width: 15,
    height: 15,
    tintColor: colors.lightGray,
    transform: i18n.locale === HE ? [{ scaleX: -1 }] : [{ scaleX: 1 }],
  },
});

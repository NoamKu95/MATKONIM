// Outer imports:
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  GestureResponderEvent,
  Pressable,
} from "react-native";

// Inner imports:
import { colors } from "../../constants/colors";

// Types:
import { Recipe } from "../../models/recipe";

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
      style={isLastIndex ? styles.containerLastIndex : styles.container}
    >
      <Image
        source={{
          uri: recipe.image,
        }}
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

      <CardInfo recipe={recipe} />
    </Pressable>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: 250,
    marginRight: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  containerLastIndex: {
    height: 250,
    width: 250,
    marginLeft: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  backgroundImage: {
    width: 250,
    height: 250,
    borderRadius: 12,
  },
  categoryContainer: {
    position: "absolute",
    top: 20,
    left: 15,
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: colors.transparentGray,
    borderRadius: 12,
  },
  categoryText: {
    color: colors.white,
  },
});

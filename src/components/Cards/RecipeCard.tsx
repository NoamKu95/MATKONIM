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
import { colors } from "../../constants/colors";
import { images } from "../../constants/images";
import { paddings } from "../../constants/paddings";

// Inner imports:

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
      style={[
        styles.container,
        isLastIndex
          ? { marginLeft: 4, marginRight: 12 }
          : { marginLeft: 12, marginRight: 4 },
      ]}
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
    borderRadius: 12,
    backgroundColor: "lightgreen",
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
    paddingHorizontal: paddings._16px,
    paddingVertical: paddings._4px,
    backgroundColor: colors.transparentGray,
    borderRadius: 12,
  },
  categoryText: {
    color: colors.white,
  },
});

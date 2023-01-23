// Outer imports:
import React from "react";
import {
  View,
  StyleSheet,
  GestureResponderEvent,
  ImageBackground,
  Pressable,
} from "react-native";

// Inner imports:
import { colors } from "../../constants/colors";

// Types:
import { Category } from "../../models/category";
import i18n from "../../translations/i18n";
import ShrinkingBoldText from "../text/ShrinkingBoldText";

interface Props {
  category: Category;
  image: any;
  width: string;
  onPress: (event: GestureResponderEvent) => void;
}

const CategoryCard: React.FC<Props> = ({
  category,
  image,
  width,
  onPress,
}: Props) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, { width }]}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        imageStyle={{ opacity: 0.85 }}
        style={styles.imageBackground}
      >
        <View style={styles.textContainer}>
          <ShrinkingBoldText
            children={
              i18n.locale === "he" ? category.name : category.englishName
            }
            color={colors.white}
            size={20}
            textAlign="center"
            letterSpacing={1}
            lineHeight={20}
          />
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: colors.black,
    height: 100,
    marginVertical: 2,
  },
  imageBackground: {
    flex: 1,
    borderRadius: 12,
    height: 100,
    overflow: "hidden",
    width: "100%",
  },
  textContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryName: {
    color: colors.white,
    textAlign: "center",
  },
});

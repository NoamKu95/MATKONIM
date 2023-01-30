// Outer imports:
import React from "react";
import { View, StyleSheet } from "react-native";
import Chip from "../../../components/Chip";

// Types:
import { colors } from "../../../constants/colors";
import { CATEGORIES } from "../../../models/category";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import i18n from "../../../translations/i18n";
import {
  setRecipeCategory,
  setRecipeCategoryWarning,
} from "../state/addRecipeSlice";

// Redux:

// Components:

interface BasicInfoProps {
  renderTitlesOfSection: (
    title: string,
    subtitle: string | null
  ) => JSX.Element;
  renderWarningTextPlaceholder: Function;
}

const CategoryFormPart = ({
  renderTitlesOfSection,
  renderWarningTextPlaceholder,
}: BasicInfoProps) => {
  const dispatch = useAppDispatch();
  const recipeCategory = useAppSelector(
    (state) => state.addRecipe.recipeCategory
  );
  const recipeCategoryWarning = useAppSelector(
    (state) => state.addRecipe.recipeCategoryWarning
  );

  const updateCategoryChip = (chipName: string) => {
    if (chipName === recipeCategory) {
      dispatch(setRecipeCategory(null));
    } else {
      dispatch(setRecipeCategory(chipName));
    }
    if (recipeCategoryWarning !== null) {
      dispatch(setRecipeCategoryWarning(null));
    }
  };

  return (
    <View style={styles.categorySectionContainer}>
      {renderTitlesOfSection(
        i18n.t("addRecipe.categoriesTitle"),
        i18n.t("addRecipe.categoriesSubTitle")
      )}
      <View style={styles.chipsContainer}>
        {CATEGORIES.map((category) => {
          return (
            <Chip
              key={category.id}
              text={category.name}
              isSelected={category.name === recipeCategory}
              bgColor={colors.lightGreen}
              selectedBgColor={colors.darkLime}
              onPress={() => {
                updateCategoryChip(category.name);
              }}
            />
          );
        })}
      </View>
      {renderWarningTextPlaceholder(recipeCategoryWarning, "center")}
    </View>
  );
};

export default CategoryFormPart;

const styles = StyleSheet.create({
  categorySectionContainer: {
    paddingVertical: 12,
  },
  chipsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});

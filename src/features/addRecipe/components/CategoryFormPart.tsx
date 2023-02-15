// Outer imports:
import React from "react";
import { View, StyleSheet } from "react-native";
import i18n from "../../../translations/i18n";

// Inner imports:
import { colors } from "../../../constants/colors";
import { paddings } from "../../../constants/paddings";
import { CATEGORIES } from "../../../models/category";
import { HE } from "../../../models/translations";

// Redux:
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  setRecipeCategory,
  setRecipeCategoryWarning,
} from "../state/addRecipeSlice";

// Components:
import Chip from "../../../components/Chip";

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

  const renderCategoriesChips = () => {
    return (
      <View style={styles.chipsContainer}>
        {CATEGORIES.map((category) => {
          return (
            <Chip
              key={category.id}
              text={i18n.locale === HE ? category.name : category.englishName}
              isSelected={category.name === recipeCategory}
              onPress={() => {
                updateCategoryChip(category.name);
              }}
              bgColor={colors.lightGreen}
              selectedBgColor={colors.darkLime}
            />
          );
        })}
      </View>
    );
  };

  const updateCategoryChip = (chipName: string) => {
    if (chipName === recipeCategory) {
      dispatch(setRecipeCategory(null));
    } else {
      dispatch(setRecipeCategory(chipName));
      dispatch(setRecipeCategoryWarning(null));
    }
  };

  return (
    <View style={styles.categorySectionContainer}>
      {renderTitlesOfSection(
        i18n.t("addRecipe.categoriesTitle"),
        i18n.t("addRecipe.categoriesSubTitle")
      )}
      {renderCategoriesChips()}
      {renderWarningTextPlaceholder(recipeCategoryWarning, "center")}
    </View>
  );
};

export default CategoryFormPart;

const styles = StyleSheet.create({
  categorySectionContainer: {
    paddingVertical: paddings._12px,
  },
  chipsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingHorizontal: paddings._8px,
    paddingVertical: paddings._8px,
  },
});

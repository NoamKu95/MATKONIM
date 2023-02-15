// Outer imports:
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import i18n from "../../../translations/i18n";

// Types:
import { AddRecipeTextInputTypes } from "../../../models/types";

// Inner imports:
import { colors } from "../../../constants/colors";
import { paddings } from "../../../constants/paddings";
import { validateNumber, validateText } from "../../../utils/validators";

// Redux:
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  setRecipeDurationWarning,
  setRecipeNameWarning,
  setRecipeServingsWarning,
} from "../state/addRecipeSlice";
import { defineValidationErrorMessage } from "../../errorHandling/state/errorHandlingActions";

// Components:
import BottomBorderTextInput from "../../../components/TextInput/BottomBorderTextInput";

interface BasicInfoProps {
  renderTitlesOfSection: (
    title: string,
    subtitle: string | null
  ) => JSX.Element;
  onChangeText: (newTxt: string, textInputType: string) => void;
}

const BasicInfoFormPart = ({
  renderTitlesOfSection,
  onChangeText,
}: BasicInfoProps) => {
  const dispatch = useAppDispatch();
  const recipeName = useAppSelector((state) => state.addRecipe.recipeName);
  const recipeNameWarning = useAppSelector(
    (state) => state.addRecipe.recipeNameWarning
  );
  const recipeDuration = useAppSelector(
    (state) => state.addRecipe.recipeDuration
  );
  const recipeDurationWarning = useAppSelector(
    (state) => state.addRecipe.recipeDurationWarning
  );
  const recipeServings = useAppSelector(
    (state) => state.addRecipe.recipeServings
  );
  const recipeServingsWarning = useAppSelector(
    (state) => state.addRecipe.recipeServingsWarning
  );

  // ======================LISTENERS============================

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (recipeName != null) {
        let error = validateText(recipeName);
        if (error) {
          let errorMsg = defineValidationErrorMessage(error);
          dispatch(setRecipeNameWarning(errorMsg));
        } else {
          dispatch(setRecipeNameWarning(null));
        }
      }
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [recipeName]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (recipeDuration != null) {
        let error = validateText(recipeDuration);
        if (error) {
          let errorMsg = defineValidationErrorMessage(error);
          dispatch(setRecipeDurationWarning(errorMsg));
        } else {
          dispatch(setRecipeDurationWarning(null));
        }
      }
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [recipeDuration]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (recipeServings != null) {
        let error = validateNumber(recipeServings);
        if (error) {
          let errorMsg = defineValidationErrorMessage(error);
          dispatch(setRecipeServingsWarning(errorMsg));
        } else {
          dispatch(setRecipeServingsWarning(null));
        }
      }
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [recipeServings]);

  return (
    <View style={styles.infoSectionContainer}>
      {renderTitlesOfSection(i18n.t("addRecipe.infoTitle"), null)}
      <BottomBorderTextInput
        textValue={recipeName ?? ""}
        textSize={16}
        placeholderText={i18n.t("addRecipe.recipeNameExample")}
        labelText={i18n.t("addRecipe.recipeNameLabel")}
        labelTextColor={colors.darkLime}
        warningText={recipeNameWarning}
        onChangeText={(newTxt) => {
          onChangeText(newTxt, AddRecipeTextInputTypes.RECIPE_NAME);
        }}
      />
      <BottomBorderTextInput
        textValue={recipeDuration ?? ""}
        textSize={16}
        placeholderText={i18n.t("addRecipe.recipeDurationExample")}
        labelText={i18n.t("addRecipe.recipeDurationLabel")}
        labelTextColor={colors.darkLime}
        warningText={recipeDurationWarning}
        onChangeText={(newTxt) => {
          onChangeText(newTxt, AddRecipeTextInputTypes.RECIPE_DURATION);
        }}
      />
      <BottomBorderTextInput
        textValue={recipeServings ?? ""} // TODO: find solution. This: (recipeServings ? `${recipeServings}` : "") prevents input of 0 or lower
        textSize={16}
        placeholderText={i18n.t("addRecipe.recipeServingsExample")}
        labelText={i18n.t("addRecipe.recipeServingsLabel")}
        labelTextColor={colors.darkLime}
        warningText={recipeServingsWarning}
        onChangeText={(newTxt) => {
          onChangeText(newTxt, AddRecipeTextInputTypes.RECIPE_SERVINGS);
        }}
        keyboardType={"number-pad"}
      />
    </View>
  );
};

export default BasicInfoFormPart;

const styles = StyleSheet.create({
  infoSectionContainer: {
    paddingVertical: paddings._12px,
    paddingHorizontal: paddings._8px,
  },
});

// Outer imports:
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";

// Types:
import BottomBorderTextInput from "../../../components/TextInput/BottomBorderTextInput";
import { colors } from "../../../constants/colors";
import { AddRecipeTextInputTypes } from "../../../models/types";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import i18n from "../../../translations/i18n";
import { validateNumber, validateText } from "../../../utils/validators";
import { defineErrorMessage } from "../../errorHandling/state/errorHandlingActions";
import {
  setRecipeDurationWarning,
  setRecipeNameWarning,
  setRecipeServingsWarning,
} from "../state/addRecipeSlice";

// Redux:

// Components:

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
          let errorMsg = defineErrorMessage(error);
          dispatch(setRecipeNameWarning(errorMsg));
        } else {
          dispatch(setRecipeNameWarning(null));
        }
      }
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeName]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (recipeDuration != null) {
        let error = validateText(recipeName);
        if (error) {
          let errorMsg = defineErrorMessage(error);
          dispatch(setRecipeDurationWarning(errorMsg));
        } else {
          dispatch(setRecipeDurationWarning(null));
        }
      }
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeDuration]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (recipeServings != null) {
        let error = validateNumber(recipeServings);
        if (error) {
          let errorMsg = defineErrorMessage(error);
          dispatch(setRecipeServingsWarning(errorMsg));
        } else {
          dispatch(setRecipeServingsWarning(null));
        }
      }
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        textValue={recipeServings ?? ""} // TODO: think of solution
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
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
});

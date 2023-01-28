// Outer imports:
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import i18n from "../../../translations/i18n";

// Inner imports:
import { colors } from "../../../constants/colors";
import { icons } from "../../../constants/icons";

// Redux:
import { useAppDispatch, useAppSelector } from "../../../store/store";
import ActionButton from "../../../components/Buttons/ActionButton";
import BottomBorderTextInput from "../../../components/TextInput/BottomBorderTextInput";
import IngredientsCarousel from "../../../components/Carousels/IngredientsCarousel";
import { AddRecipeTextInputTypes, measurements } from "../../../models/types";
import Chip from "../../../components/Chip";
import {
  setIngredientAmount,
  setIngredientMeasurement,
  setIngredientName,
  setRecipeIngredientsWarning,
} from "../state/addRecipeSlice";
import {
  addIngredientToNewRecipe,
  updateStateValueWithString,
} from "../state/addRecipeActions";
import PrepStepsCarousel from "../../../components/Carousels/PrepStepsCarousel";

interface BasicInfoProps {
  renderTitlesOfSection: (
    title: string,
    subtitle: string | null
  ) => JSX.Element;
  onChangeText: (newTxt: string, textInputType: string) => void;
  renderWarningTextPlaceholder: Function;
}

const PrepStepsFormPart = ({
  renderTitlesOfSection,
  onChangeText,
  renderWarningTextPlaceholder,
}: BasicInfoProps) => {
  const dispatch = useAppDispatch();
  const recipePrepStep = useAppSelector(
    (state) => state.addRecipe.recipePrepStep
  );
  const prepStepTextWarning = useAppSelector(
    (state) => state.addRecipe.recipePrepStepWarning
  );
  const recipePreparationSteps = useAppSelector(
    (state) => state.addRecipe.recipePreparationSteps
  );
  // e.g. no prep steps were added
  const recipePreparationStepsWarning = useAppSelector(
    (state) => state.addRecipe.recipePreparationStepsWarning
  );

  return (
    <>
      <View style={styles.infoSectionContainer}>
        {renderTitlesOfSection(
          i18n.t("addRecipe.prepStepsTitle"),
          i18n.t("addRecipe.prepStepsSubTitle")
        )}
        <BottomBorderTextInput
          textValue={recipePrepStep ?? ""}
          textSize={16}
          placeholderText={i18n.t("addRecipe.prepSteps_StepExample")}
          labelText={i18n.t("addRecipe.prepSteps_StepLabel")}
          labelTextColor={colors.darkLime}
          warningText={prepStepTextWarning}
          onChangeText={(newTxt) => {
            onChangeText(newTxt, AddRecipeTextInputTypes.PREPARATION_STEP);
          }}
        />
        <ActionButton
          buttonText={i18n.t("addRecipe.prepStepsAddButton")}
          buttonTextColor={colors.white}
          buttonTextSize={16}
          isPressable={recipePrepStep !== null && recipePrepStep !== ""}
          onPress={() => {
            dispatch(
              updateStateValueWithString(
                recipePrepStep ?? "",
                AddRecipeTextInputTypes.ADD_PREPARATION_STEP
              )
            );
          }}
          buttonContainerStyle={styles.addStepButton}
          buttonColors={[colors.lime, colors.darkGreen]}
        />
      </View>
      {recipePreparationSteps.length > 0 && (
        <PrepStepsCarousel preparationSteps={recipePreparationSteps} />
      )}
      {renderWarningTextPlaceholder(recipePreparationStepsWarning, "center")}
    </>
  );
};

export default PrepStepsFormPart;

const styles = StyleSheet.create({
  infoSectionContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  addStepButton: {
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
  },
});

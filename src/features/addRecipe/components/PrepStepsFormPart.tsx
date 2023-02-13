// Outer imports:
import React from "react";
import { View, StyleSheet } from "react-native";
import i18n from "../../../translations/i18n";

// Inner imports:
import { colors } from "../../../constants/colors";

// Redux:
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { updateStateValueWithString } from "../state/addRecipeActions";

// Components:
import ActionButton from "../../../components/Buttons/ActionButton";
import BottomBorderTextInput from "../../../components/TextInput/BottomBorderTextInput";
import PrepStepsCarousel from "../../../components/Carousels/PrepStepsCarousel";

// Types:
import { AddRecipeTextInputTypes } from "../../../models/types";

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

  const renderTextInput = () => {
    return (
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
    );
  };

  const renderActionButton = () => {
    return (
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
    );
  };

  const renderCarousel = () => {
    if (recipePreparationSteps.length > 0) {
      return <PrepStepsCarousel preparationSteps={recipePreparationSteps} />;
    }
    return <></>;
  };

  return (
    <>
      <View style={styles.infoSectionContainer}>
        {renderTitlesOfSection(
          i18n.t("addRecipe.prepStepsTitle"),
          i18n.t("addRecipe.prepStepsSubTitle")
        )}
        {renderTextInput()}
        {renderActionButton()}
      </View>
      {renderCarousel()}
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

// Outer imports:
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Pressable, Image } from "react-native";
import i18n from "../../translations/i18n";

// Inner imports:
import { colors } from "../../constants/colors";
import { icons } from "../../constants/icons";

// Types:
import { AddRecipeTextInputTypes } from "../../models/types";

// Redux:
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  saveRecipe,
  updateStateValueWithNumber,
  updateStateValueWithString,
} from "./state/addRecipeActions";
import {
  resetAddRecipeState,
  setRecipeCategoryWarning,
  setRecipeImageWarning,
  setRecipeIngredientsWarning,
  setRecipePreparationStepsWarning,
} from "./state/addRecipeSlice";

// Components:
import RegularText from "../../components/text/RegularText";
import BoldText from "../../components/text/BoldText";
import ActionButton from "../../components/Buttons/ActionButton";
import Loader from "../../components/Loader";
import Snackbar from "../../components/Snackbar";
import BasicInfoFormPart from "./components/BasicInfoFormPart";
import IngredientsFormPart from "./components/IngredientsFormPart";
import PrepStepsFormPart from "./components/PrepStepsFormPart";
import CategoryFormPart from "./components/CategoryFormPart";
import ImageSelectionFormPart from "./components/ImageSelectionFormPart";

const AddRecipe = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.addRecipe.isLoading);
  const loadingText = useAppSelector((state) => state.addRecipe.loadingText);
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
  const recipeCategory = useAppSelector(
    (state) => state.addRecipe.recipeCategory
  );
  const recipePreparationSteps = useAppSelector(
    (state) => state.addRecipe.recipePreparationSteps
  );
  const ingredients = useAppSelector(
    (state) => state.addRecipe.recipeIngredients
  );
  const imageUri = useAppSelector((state) => state.addRecipe.recipeImageUri);
  const [isSaveAvailable, setIsSaveAvailable] = useState(false);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false); // TODO: move to slice
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // ======================LISTENERS============================

  // Disable / Enable form's save button
  useEffect(() => {
    if (validateFormInputs()) {
      setIsSaveAvailable(true);
    } else {
      setIsSaveAvailable(false);
    }
  }, [
    recipeName,
    recipeDuration,
    recipeServings,
    ingredients,
    recipePreparationSteps,
    recipeCategory,
    imageUri,
  ]);

  useEffect(() => {
    if (isSnackbarVisible) {
      const timer = setTimeout(() => {
        setIsSnackbarVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSnackbarVisible]);

  const validateFormInputs = (): boolean => {
    return (
      recipeName !== null &&
      recipeNameWarning === null &&
      recipeDuration !== null &&
      recipeDurationWarning === null &&
      recipeServings !== null &&
      recipeServingsWarning === null &&
      recipeCategory !== null &&
      ingredients.length > 0 &&
      recipePreparationSteps.length > 0 &&
      imageUri !== null
    );
  };

  const renderTitlesOfSection = (title: string, subtitle: string | null) => {
    return (
      <>
        <View style={styles.sectionTitle}>
          <BoldText
            children={title}
            size={24}
            color={colors.darkLime}
            textAlign="left"
            lineHeight={24}
            letterSpacing={0.5}
          />
        </View>
        {subtitle !== null ? (
          <View style={styles.sectionExplanationText}>
            <RegularText
              children={subtitle}
              size={14}
              color={colors.transparentBlack5}
              textAlign="justify"
              lineHeight={14}
            />
          </View>
        ) : (
          <></>
        )}
      </>
    );
  };

  const renderWarningTextPlaceholder = (
    warningText: string | null,
    textAlign: "center" | "left" | "right" | "justify" | undefined = "left"
  ) => {
    if (warningText !== null) {
      return (
        <View style={styles.warningTextContainer}>
          <RegularText
            children={warningText ?? ""}
            color={colors.red}
            size={12}
            textAlign={textAlign}
          />
        </View>
      );
    }
  };

  const onChangeText = (newTxt: string, textInputType: string) => {
    if (
      textInputType !== AddRecipeTextInputTypes.RECIPE_SERVINGS &&
      textInputType !== AddRecipeTextInputTypes.INGREDIENT_AMOUNT
    ) {
      dispatch(updateStateValueWithString(newTxt, textInputType));
    } else {
      dispatch(updateStateValueWithNumber(parseInt(newTxt, 10), textInputType));
    }
  };

  const validateSections = () => {
    if (recipePreparationSteps.length === 0) {
      dispatch(
        setRecipePreparationStepsWarning(
          i18n.t("errorHandling.validationErrors.PrepStepSectionError")
        )
      );
    }
    if (ingredients.length === 0) {
      dispatch(
        setRecipeIngredientsWarning(
          i18n.t("errorHandling.validationErrors.IngredientsSectionError")
        )
      );
    }
    if (recipeCategory === null) {
      dispatch(
        setRecipeCategoryWarning(
          i18n.t("errorHandling.validationErrors.CategorySectionError")
        )
      );
    }
    if (imageUri === null) {
      dispatch(
        setRecipeImageWarning(
          i18n.t("errorHandling.validationErrors.ImageSelectionSectionError")
        )
      );
    }
  };

  // ============================================================

  const renderFormHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.mainTitleContainer}>
          <BoldText
            children={i18n.t("addRecipe.mainTitle")}
            size={32}
            color={colors.darkLime}
            textAlign="center"
            lineHeight={45}
          />
        </View>
        <RegularText
          children={i18n.t("addRecipe.subtitleText")}
          size={14}
          color={colors.gray}
          textAlign="center"
          lineHeight={20}
        />
        <Pressable
          style={styles.iconWrapper}
          onPress={() => {
            dispatch(resetAddRecipeState());
            setSnackbarMessage(i18n.t("addRecipe.clearForm"));
            setIsSnackbarVisible(true);
          }}
        >
          <Image
            source={icons.trash}
            resizeMode="contain"
            style={styles.icon}
          />
        </Pressable>
      </View>
    );
  };

  const renderFormSections = () => {
    return (
      <>
        <BasicInfoFormPart
          renderTitlesOfSection={renderTitlesOfSection}
          onChangeText={onChangeText}
        />
        {renderDivider()}
        <IngredientsFormPart
          renderTitlesOfSection={renderTitlesOfSection}
          onChangeText={onChangeText}
          renderWarningTextPlaceholder={renderWarningTextPlaceholder}
        />
        {renderDivider()}
        <PrepStepsFormPart
          renderTitlesOfSection={renderTitlesOfSection}
          onChangeText={onChangeText}
          renderWarningTextPlaceholder={renderWarningTextPlaceholder}
        />
        {renderDivider()}
        <CategoryFormPart
          renderTitlesOfSection={renderTitlesOfSection}
          renderWarningTextPlaceholder={renderWarningTextPlaceholder}
        />
        {renderDivider()}
        <ImageSelectionFormPart
          renderTitlesOfSection={renderTitlesOfSection}
          renderWarningTextPlaceholder={renderWarningTextPlaceholder}
        />
      </>
    );
  };

  const renderSaveButton = () => {
    return (
      <View style={styles.saveBtnContainer}>
        <ActionButton
          buttonText={i18n.t("addRecipe.saveButton")}
          buttonTextColor={colors.white}
          buttonTextSize={16}
          buttonContainerStyle={styles.saveButton}
          buttonColors={[colors.lime, colors.darkGreen]}
          onPress={
            isSaveAvailable
              ? () => {
                  dispatch(saveRecipe());
                }
              : () => {
                  validateSections();
                  setSnackbarMessage(
                    i18n.t("errorHandling.validationErrors.formIncomplete")
                  );
                  setIsSnackbarVisible(true);
                }
          }
          isPressable={isSaveAvailable}
        />
      </View>
    );
  };

  const renderDivider = () => {
    return <View style={styles.divider} />;
  };

  return (
    <View style={styles.mainContainer}>
      {isLoading ? (
        <Loader text={loadingText} style={styles.loader} />
      ) : (
        <>
          <Snackbar
            text={snackbarMessage}
            textColor={colors.darkGreen}
            bgColor={colors.lightGreen}
            isVisible={isSnackbarVisible}
            onPress={() => setIsSnackbarVisible(false)}
          />
          <ScrollView style={styles.formScroller}>
            {renderFormHeader()}
            {renderFormSections()}
            {renderSaveButton()}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default AddRecipe;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  formScroller: {
    zIndex: -1,
  },
  loader: {
    justifyContent: "center",
  },
  sectionTitle: {
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  sectionExplanationText: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 6,
  },
  warningTextContainer: {
    paddingHorizontal: 12,
  },

  // HEADER
  headerContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  mainTitleContainer: {
    paddingTop: 10,
    paddingBottom: 5,
  },
  iconWrapper: {
    position: "absolute",
    top: 5,
    right: 5,
    opacity: 0.7,
  },
  icon: {
    width: 25,
    height: 25,
  },
  menuOptionContainer: {
    position: "absolute",
    top: 40,
    right: 15,
    justifyContent: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.darkGreen,
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  // SAVE
  saveBtnContainer: {
    paddingHorizontal: 8,
    paddingBottom: 8,
    paddingTop: 18,
  },
  saveButton: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    marginBottom: 12,
  },

  // DIVIDER
  divider: {
    borderTopWidth: 1.5,
    borderStyle: "dashed",
    borderTopColor: colors.lightLime,
    marginVertical: 8,
  },
});

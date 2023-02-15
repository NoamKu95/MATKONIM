// Outer imports:
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import i18n from "../../../translations/i18n";

// Inner imports:
import { colors } from "../../../constants/colors";
import { HE } from "../../../models/translations";
import { validateNumber, validateText } from "../../../utils/validators";

// Components:
import BottomBorderTextInput from "../../../components/TextInput/BottomBorderTextInput";
import Chip from "../../../components/Chip";
import ActionButton from "../../../components/Buttons/ActionButton";
import IngredientsCarousel from "../../../components/Carousels/IngredientsCarousel";

// Types:
import { AddRecipeTextInputTypes, measurements } from "../../../models/types";

// Redux:
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  setIngredientAmountWarning,
  setIngredientMeasurement,
  setIngredientNameWarning,
} from "../state/addRecipeSlice";
import { addIngredientToNewRecipe } from "../state/addRecipeActions";
import { defineValidationErrorMessage } from "../../errorHandling/state/errorHandlingActions";

interface BasicInfoProps {
  renderTitlesOfSection: (
    title: string,
    subtitle: string | null
  ) => JSX.Element;
  onChangeText: (newTxt: string, textInputType: string) => void;
  renderWarningTextPlaceholder: Function;
}

const IngredientsFormPart = ({
  renderTitlesOfSection,
  onChangeText,
  renderWarningTextPlaceholder,
}: BasicInfoProps) => {
  const dispatch = useAppDispatch();
  const ingredientName = useAppSelector(
    (state) => state.addRecipe.ingredientName
  );
  const ingredientNameWarning = useAppSelector(
    (state) => state.addRecipe.ingredientNameWarning
  );
  const ingredientAmount = useAppSelector(
    (state) => state.addRecipe.ingredientAmount
  );
  const ingredientAmountWarning = useAppSelector(
    (state) => state.addRecipe.ingredientAmountWarning
  );
  const ingredientMeasure = useAppSelector(
    (state) => state.addRecipe.ingredientMeasurement
  );
  const ingredientMeasurementWarning = useAppSelector(
    (state) => state.addRecipe.ingredientMeasurementWarning
  );
  const ingredients = useAppSelector(
    (state) => state.addRecipe.recipeIngredients
  );
  // e.g. no ingredients were added
  const ingredientsWarning = useAppSelector(
    (state) => state.addRecipe.recipeIngredientsWarning
  );
  const [isAddIngAvailable, setIsAddIngAvailable] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (ingredientName != null) {
        let error = validateText(ingredientName);
        if (error) {
          let errorMsg = defineValidationErrorMessage(error);
          dispatch(setIngredientNameWarning(errorMsg));
        } else {
          dispatch(setIngredientNameWarning(null));
        }
      }
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [ingredientName]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (ingredientAmount != null) {
        let error = validateNumber(ingredientAmount);
        if (error) {
          let errorMsg = defineValidationErrorMessage(error);
          dispatch(setIngredientAmountWarning(errorMsg));
        } else {
          dispatch(setIngredientAmountWarning(null));
        }
      }
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [ingredientAmount]);

  // Disable / Enable add button
  useEffect(() => {
    if (validateIngredientInputs()) {
      setIsAddIngAvailable(true);
    } else {
      setIsAddIngAvailable(false);
    }
  }, [ingredientName, ingredientAmount, ingredientMeasure]);

  const validateIngredientInputs = (): boolean => {
    return (
      ingredientName !== null &&
      ingredientNameWarning === null &&
      ingredientAmount !== null &&
      ingredientAmountWarning === null &&
      ingredientMeasure !== null &&
      ingredientMeasurementWarning === null
    );
  };

  const renderTextInputs = () => {
    return (
      <>
        <BottomBorderTextInput
          textValue={ingredientName ?? ""}
          textSize={16}
          placeholderText={i18n.t("addRecipe.ingredientNameExample")}
          labelText={i18n.t("addRecipe.ingredientNameLabel")}
          labelTextColor={colors.darkLime}
          warningText={ingredientNameWarning}
          onChangeText={(newTxt) => {
            onChangeText(newTxt, AddRecipeTextInputTypes.INGREDIENT_NAME);
          }}
        />
        <BottomBorderTextInput
          textValue={ingredientAmount ?? ""} // TODO: find solution. This: (ingredientAmount ? `${ingredientAmount}` : "") prevents input of 0 or lower
          textSize={16}
          placeholderText={i18n.t("addRecipe.ingredientAmountExample")}
          labelText={i18n.t("addRecipe.ingredientAmountLabel")}
          labelTextColor={colors.darkLime}
          warningText={ingredientAmountWarning}
          onChangeText={(newTxt) => {
            onChangeText(newTxt, AddRecipeTextInputTypes.INGREDIENT_AMOUNT);
          }}
          keyboardType={"number-pad"}
        />
      </>
    );
  };

  const updateMeasureChip = (measure: string) => {
    if (measure === ingredientMeasure) {
      dispatch(setIngredientMeasurement(null));
    } else {
      dispatch(setIngredientMeasurement(measure));
    }
  };

  const renderMeasurementChips = () => {
    return (
      <View style={styles.ingsChipsContainer}>
        {measurements.map((item: { name: string; englishName: string }) => {
          return (
            <Chip
              key={item.name}
              text={i18n.locale === HE ? item.name : item.englishName}
              isSelected={
                item.name === ingredientMeasure ||
                item.englishName === ingredientMeasure
              }
              onPress={() => {
                updateMeasureChip(
                  i18n.locale === HE ? item.name : item.englishName
                );
              }}
              bgColor={colors.lightGreen}
              selectedBgColor={colors.darkLime}
            />
          );
        })}
      </View>
    );
  };

  const renderSaveButton = () => {
    return (
      <ActionButton
        buttonText={i18n.t("addRecipe.ingredientAddButton")}
        buttonTextColor={colors.white}
        buttonTextSize={16}
        isPressable={isAddIngAvailable}
        onPress={() => {
          if (isAddIngAvailable) {
            dispatch(
              addIngredientToNewRecipe(
                ingredientName,
                ingredientAmount,
                ingredientMeasure
              )
            );
          }
        }}
        buttonContainerStyle={styles.addIngredientButton}
        buttonColors={[colors.lime, colors.darkGreen]}
      />
    );
  };

  const renderIngredientsCarousel = () => {
    if (ingredients.length > 0) {
      return <IngredientsCarousel ingredients={ingredients} />;
    }
  };

  return (
    <>
      <View style={styles.ingredientsSectionContainer}>
        {renderTitlesOfSection(
          i18n.t("addRecipe.ingredientsTitle"),
          i18n.t("addRecipe.ingredientsSubTitle")
        )}
        {renderTextInputs()}
        {renderMeasurementChips()}
        {renderWarningTextPlaceholder(ingredientMeasurementWarning, "center")}
        {renderSaveButton()}
      </View>
      {renderIngredientsCarousel()}
      {renderWarningTextPlaceholder(ingredientsWarning, "center")}
    </>
  );
};

export default IngredientsFormPart;

const styles = StyleSheet.create({
  ingredientsSectionContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  addIngredientButton: {
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
  },
  ingsChipsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
});

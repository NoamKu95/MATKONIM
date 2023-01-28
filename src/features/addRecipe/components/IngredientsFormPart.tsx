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
  setIngredientAmountWarning,
  setIngredientMeasurement,
  setIngredientName,
  setIngredientNameWarning,
  setRecipeIngredientsWarning,
} from "../state/addRecipeSlice";
import { addIngredientToNewRecipe } from "../state/addRecipeActions";
import { validateNumber, validateText } from "../../../utils/validators";
import { InputsValidationErrors } from "../../../models/errors";
import { defineErrorMessage } from "../../errorHandling/state/errorHandlingActions";

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
  const ingredients = useAppSelector(
    (state) => state.addRecipe.recipeIngredients
  );
  // e.g. no ingredients were added
  const ingredientsWarning = useAppSelector(
    (state) => state.addRecipe.recipeIngredientsWarning
  );
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
  const [isAddIngAvailable, setIsAddIngAvailable] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (ingredientName != null) {
        let error = validateText(ingredientName);
        if (error) {
          let errorMsg = defineErrorMessage(error);
          dispatch(setIngredientNameWarning(errorMsg));
        } else {
          dispatch(setIngredientNameWarning(null));
        }
      }
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientName]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (ingredientAmount != null) {
        let error = validateNumber(ingredientAmount);
        if (error) {
          let errorMsg = defineErrorMessage(error);
          dispatch(setIngredientAmountWarning(errorMsg));
        } else {
          dispatch(setIngredientAmountWarning(null));
        }
      }
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientAmount]);

  // Disable / Enable ingredient button
  useEffect(() => {
    if (validateIngredientInputs()) {
      setIsAddIngAvailable(true);
    } else {
      setIsAddIngAvailable(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const updateMeasureChip = (measure: string) => {
    if (measure === ingredientMeasure) {
      dispatch(setIngredientMeasurement(null));
    } else {
      dispatch(setIngredientMeasurement(measure));
    }
  };

  return (
    <>
      <View style={styles.ingredientsSectionContainer}>
        {renderTitlesOfSection(
          i18n.t("addRecipe.ingredientsTitle"),
          i18n.t("addRecipe.ingredientsSubTitle")
        )}
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
          textValue={`${ingredientAmount ?? ""}`}
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
        <View style={styles.ingsChipsContainer}>
          {measurements.map((item) => {
            return (
              <Chip
                key={item}
                text={item}
                isSelected={item === ingredientMeasure}
                bgColor={colors.lightGreen}
                selectedBgColor={colors.darkLime}
                onPress={() => {
                  updateMeasureChip(item);
                }}
              />
            );
          })}
        </View>
        {renderWarningTextPlaceholder(ingredientMeasurementWarning, "center")}
        <ActionButton
          buttonText={i18n.t("addRecipe.ingredientAddButton")}
          buttonTextColor={colors.white}
          buttonTextSize={16}
          isPressable={isAddIngAvailable}
          onPress={() => {
            dispatch(
              addIngredientToNewRecipe(
                ingredientName,
                ingredientAmount,
                ingredientMeasure
              )
            );
          }}
          buttonContainerStyle={styles.addIngredientButton}
          buttonColors={[colors.lime, colors.darkGreen]}
        />
      </View>
      {ingredients.length > 0 && (
        <IngredientsCarousel ingredients={ingredients} />
      )}
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

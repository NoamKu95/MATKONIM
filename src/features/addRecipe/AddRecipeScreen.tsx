// Outer imports:
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Pressable, Image} from 'react-native';
import i18n from '../../translations/i18n';

// Inner imports:
import {colors} from '../../constants/colors';
import {icons} from '../../constants/icons';

// Types:
import {CATEGORIES} from '../../models/category';
import {AddRecipeTextInputTypes, measurements} from '../../models/types';

// Redux:
import {useAppDispatch, useAppSelector} from '../../store/store';
import {
  addIngredientToNewRecipe,
  openDeviceGallery,
  saveRecipe,
  updateStateValueWithNumber,
  updateStateValueWithString,
} from './state/addRecipeActions';
import {
  resetAddRecipeState,
  setIngredientAmount,
  setIngredientAmountWarning,
  setIngredientMeasurement,
  setIngredientName,
  setIngredientNameWarning,
  setRecipeCategory,
  setRecipeCategoryWarning,
  setRecipeDurationWarning,
  setRecipeImageWarning,
  setRecipeIngredientsWarning,
  setRecipeNameWarning,
  setRecipePreparationStepsWarning,
  setRecipePrepStep,
  setRecipeServingsWarning,
} from './state/addRecipeSlice';

// Components:
import RegularText from '../../components/text/RegularText';
import BoldText from '../../components/text/BoldText';
import ActionButton from '../../components/Buttons/ActionButton';
import BottomBorderTextInput from '../../components/TextInput/BottomBorderTextInput';
import Chip from '../../components/Chip';
import IngredientsCarousel from '../../components/Carousels/IngredientsCarousel';
import PrepStepsCarousel from '../../components/Carousels/PrepStepsCarousel';
import Loader from '../../components/Loader';
import Snackbar from '../../components/Snackbar';
import {
  validateNumber,
  validateText,
  ValidationError,
} from '../../utils/validators';

const AddRecipe = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(state => state.addRecipe.isLoading);
  const loadingText = useAppSelector(state => state.addRecipe.loadingText);
  const recipeName = useAppSelector(state => state.addRecipe.recipeName);
  const recipeNameWarning = useAppSelector(
    state => state.addRecipe.recipeNameWarning,
  );
  const recipeDuration = useAppSelector(
    state => state.addRecipe.recipeDuration,
  );
  const recipeDurationWarning = useAppSelector(
    state => state.addRecipe.recipeDurationWarning,
  );
  const recipeServings = useAppSelector(
    state => state.addRecipe.recipeServings,
  );
  const recipeServingsWarning = useAppSelector(
    state => state.addRecipe.recipeServingsWarning,
  );
  const recipeCategory = useAppSelector(
    state => state.addRecipe.recipeCategory,
  );
  const recipeCategoryWarning = useAppSelector(
    state => state.addRecipe.recipeCategoryWarning,
  );
  const recipePrepStep = useAppSelector(
    state => state.addRecipe.recipePrepStep,
  );
  const prepStepTextWarning = useAppSelector(
    state => state.addRecipe.recipePrepStepWarning,
  );
  const recipePreparationSteps = useAppSelector(
    state => state.addRecipe.recipePreparationSteps,
  );
  // e.g. no prep steps were added
  const recipePreparationStepsWarning = useAppSelector(
    state => state.addRecipe.recipePreparationStepsWarning,
  );
  const ingredients = useAppSelector(
    state => state.addRecipe.recipeIngredients,
  );
  // e.g. no ingredients were added
  const ingredientsWarning = useAppSelector(
    state => state.addRecipe.recipeIngredientsWarning,
  );
  const ingredientName = useAppSelector(
    state => state.addRecipe.ingredientName,
  );
  const ingredientNameWarning = useAppSelector(
    state => state.addRecipe.ingredientNameWarning,
  );
  const ingredientAmount = useAppSelector(
    state => state.addRecipe.ingredientAmount,
  );
  const ingredientAmountWarning = useAppSelector(
    state => state.addRecipe.ingredientAmountWarning,
  );
  const ingredientMeasure = useAppSelector(
    state => state.addRecipe.ingredientMeasurement,
  );
  const ingredientMeasurementWarning = useAppSelector(
    state => state.addRecipe.ingredientMeasurementWarning,
  );
  const imageUri = useAppSelector(state => state.addRecipe.recipeImageUri);
  const recipeImageWarning = useAppSelector(
    state => state.addRecipe.recipeImageWarning,
  );
  const [isSaveAvailable, setIsSaveAvailable] = useState(false);
  const [isAddIngAvailable, setIsAddIngAvailable] = useState(false);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false); // TODO: move to slice
  const [snackbarMessage, setSnackbarMessage] = useState('');

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

  // Disable / Enable form save button
  useEffect(() => {
    if (validateFormInputs()) {
      setIsSaveAvailable(true);
    } else {
      setIsSaveAvailable(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    recipeName,
    recipeDuration,
    recipeServings,
    ingredients,
    recipePreparationSteps,
    recipeCategory,
    imageUri,
  ]);

  // =====================HELPER FUNCTIONS=======================

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
    textAlign: 'center' | 'left' | 'right' | 'justify' | undefined = 'left',
  ) => {
    if (warningText !== null) {
      return (
        <View style={styles.warningTextContainer}>
          <RegularText
            children={warningText ?? ''}
            color="red"
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

  const defineErrorMessage = (error: ValidationError): string => {
    switch (error) {
      case ValidationError.nullValue:
        return 'שדה חובה';
      case ValidationError.specialCharacters:
        return 'לא ניתן להזין תווים מיוחדים';
      case ValidationError.tooShort:
        return 'התוכן שהוזן קצר מדי';
      case ValidationError.belowZero:
        return 'לא ניתן להזין ערך קטן או שווה לאפס';
      default:
        return '';
    }
  };

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

  const checkNonTextInputSections = () => {
    if (recipePreparationSteps.length === 0) {
      dispatch(setRecipePreparationStepsWarning('חובה להזין שלבי הכנה'));
    }
    if (ingredients.length === 0) {
      dispatch(setRecipeIngredientsWarning('חובה להזין מצרכים נדרשים'));
    }
    if (recipeCategory === null) {
      dispatch(setRecipeCategoryWarning('חובה לבחור קטגוריה למתכון'));
    }
    if (imageUri === null) {
      dispatch(setRecipeImageWarning('חובה להוסיף תמונה למתכון'));
    }
  };

  // ============================================================

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.mainTitleContainer}>
          <BoldText
            children={i18n.t('addRecipe.mainTitle')}
            size={32}
            color={colors.darkLime}
            textAlign="center"
            lineHeight={45}
          />
        </View>
        <RegularText
          children={i18n.t('addRecipe.subtitleText')}
          size={14}
          color={colors.gray}
          textAlign="center"
          lineHeight={20}
        />
        <Pressable
          style={styles.iconWrapper}
          onPress={() => {
            dispatch(resetAddRecipeState());
            setSnackbarMessage('הטופס נוקה בהצלחה!');
            setIsSnackbarVisible(true);
          }}>
          <Image
            source={icons.trash}
            resizeMode="contain"
            style={styles.icon}
          />
        </Pressable>
      </View>
    );
  };

  const renderRecipeInfoSection = () => {
    return (
      <View style={styles.infoSectionContainer}>
        {renderTitlesOfSection(i18n.t('addRecipe.infoTitle'), null)}
        <BottomBorderTextInput
          textValue={recipeName ?? ''}
          textSize={16}
          placeholderText={i18n.t('addRecipe.recipeNameExample')}
          labelText={i18n.t('addRecipe.recipeNameLabel')}
          labelTextColor={colors.darkLime}
          warningText={recipeNameWarning}
          onChangeText={newTxt => {
            onChangeText(newTxt, AddRecipeTextInputTypes.RECIPE_NAME);
          }}
        />
        <BottomBorderTextInput
          textValue={recipeDuration ?? ''}
          textSize={16}
          placeholderText={i18n.t('addRecipe.recipeDurationExample')}
          labelText={i18n.t('addRecipe.recipeDurationLabel')}
          labelTextColor={colors.darkLime}
          warningText={recipeDurationWarning}
          onChangeText={newTxt => {
            onChangeText(newTxt, AddRecipeTextInputTypes.RECIPE_DURATION);
          }}
        />
        <BottomBorderTextInput
          textValue={recipeServings ?? ''} // TODO: think of solution
          textSize={16}
          placeholderText={i18n.t('addRecipe.recipeServingsExample')}
          labelText={i18n.t('addRecipe.recipeServingsLabel')}
          labelTextColor={colors.darkLime}
          warningText={recipeServingsWarning}
          onChangeText={newTxt => {
            onChangeText(newTxt, AddRecipeTextInputTypes.RECIPE_SERVINGS);
          }}
          keyboardType={'number-pad'}
        />
      </View>
    );
  };

  const renderIngredientsSection = () => {
    return (
      <>
        <View style={styles.ingredientsSectionContainer}>
          {renderTitlesOfSection(
            i18n.t('addRecipe.ingredientsTitle'),
            i18n.t('addRecipe.ingredientsSubTitle'),
          )}
          <BottomBorderTextInput
            textValue={ingredientName ?? ''}
            textSize={16}
            placeholderText={i18n.t('addRecipe.ingredientNameExample')}
            labelText={i18n.t('addRecipe.ingredientNameLabel')}
            labelTextColor={colors.darkLime}
            warningText={ingredientNameWarning}
            onChangeText={newTxt => {
              onChangeText(newTxt, AddRecipeTextInputTypes.INGREDIENT_NAME);
            }}
          />
          <BottomBorderTextInput
            textValue={`${ingredientAmount ?? ''}`}
            textSize={16}
            placeholderText={i18n.t('addRecipe.ingredientAmountExample')}
            labelText={i18n.t('addRecipe.ingredientAmountLabel')}
            labelTextColor={colors.darkLime}
            warningText={ingredientAmountWarning}
            onChangeText={newTxt => {
              onChangeText(newTxt, AddRecipeTextInputTypes.INGREDIENT_AMOUNT);
            }}
            keyboardType={'number-pad'}
          />
          <View style={styles.ingsChipsContainer}>
            {measurements.map(item => {
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
          {renderWarningTextPlaceholder(ingredientMeasurementWarning, 'center')}
          <ActionButton
            buttonText={i18n.t('addRecipe.ingredientAddButton')}
            buttonTextColor={colors.white}
            buttonTextSize={16}
            isPressable={isAddIngAvailable}
            onPress={() => {
              dispatch(
                addIngredientToNewRecipe(
                  ingredientName,
                  ingredientAmount,
                  ingredientMeasure,
                ),
              );
              dispatch(setIngredientName(null));
              dispatch(setIngredientAmount(null));
              dispatch(setRecipeIngredientsWarning(null));
            }}
            buttonContainerStyle={styles.addIngredientButton}
            buttonColors={[colors.lime, colors.darkGreen]}
          />
        </View>
        {ingredients.length > 0 && (
          <IngredientsCarousel ingredients={ingredients} />
        )}
        {renderWarningTextPlaceholder(ingredientsWarning, 'center')}
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

  const renderPreparationStepsSection = () => {
    return (
      <>
        <View style={styles.infoSectionContainer}>
          {renderTitlesOfSection(
            i18n.t('addRecipe.prepStepsTitle'),
            i18n.t('addRecipe.prepStepsSubTitle'),
          )}
          <BottomBorderTextInput
            textValue={recipePrepStep ?? ''}
            textSize={16}
            placeholderText={i18n.t('addRecipe.prepSteps_StepExample')}
            labelText={i18n.t('addRecipe.prepSteps_StepLabel')}
            labelTextColor={colors.darkLime}
            warningText={prepStepTextWarning}
            onChangeText={newTxt => {
              onChangeText(newTxt, AddRecipeTextInputTypes.PREPARATION_STEP);
            }}
          />
          <ActionButton
            buttonText={i18n.t('addRecipe.prepStepsAddButton')}
            buttonTextColor={colors.white}
            buttonTextSize={16}
            isPressable={recipePrepStep !== null && recipePrepStep !== ''}
            onPress={() => {
              dispatch(
                updateStateValueWithString(
                  recipePrepStep ?? '',
                  AddRecipeTextInputTypes.ADD_PREPARATION_STEP,
                ),
              );
              dispatch(setRecipePrepStep(null));
              dispatch(setRecipePreparationStepsWarning(null));
            }}
            buttonContainerStyle={styles.addIngredientButton}
            buttonColors={[colors.lime, colors.darkGreen]}
          />
        </View>
        {recipePreparationSteps.length > 0 && (
          <PrepStepsCarousel preparationSteps={recipePreparationSteps} />
        )}
        {renderWarningTextPlaceholder(recipePreparationStepsWarning, 'center')}
      </>
    );
  };

  const renderCategorySection = () => {
    return (
      <View style={styles.categorySectionContainer}>
        {renderTitlesOfSection(
          i18n.t('addRecipe.categoriesTitle'),
          i18n.t('addRecipe.categoriesSubTitle'),
        )}
        <View style={styles.chipsContainer}>
          {CATEGORIES.map(category => {
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
        {renderWarningTextPlaceholder(recipeCategoryWarning, 'center')}
      </View>
    );
  };

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

  const renderPickImageSection = () => {
    return (
      <View style={styles.gallerySectionContainer}>
        {renderTitlesOfSection(
          i18n.t('addRecipe.recipeImageTitle'),
          i18n.t('addRecipe.recipeImageSubTitle'),
        )}
        <Pressable
          style={[
            styles.galleryIconWrapper,
            {
              borderColor:
                imageUri !== null ? colors.darkGreen : colors.transparentBlack5,
            },
          ]}
          onPress={() => dispatch(openDeviceGallery())}>
          <Image
            source={imageUri !== null ? icons.checkmarkGreen : icons.gallery}
            resizeMethod={'resize'}
            style={[styles.galleryIcon, {opacity: imageUri !== null ? 1 : 0.3}]}
          />
        </Pressable>
        {renderWarningTextPlaceholder(recipeImageWarning, 'center')}
      </View>
    );
  };

  const renderSaveButton = () => {
    return (
      <View style={styles.saveBtnContainer}>
        <ActionButton
          buttonText={i18n.t('addRecipe.saveButton')}
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
                  checkNonTextInputSections();
                  setSnackbarMessage('אופס, נראה שיש צורך לתקן משהו בטופס');
                  setIsSnackbarVisible(true);
                }
          }
          isPressable={isSaveAvailable}
        />
      </View>
    );
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
            {renderHeader()}
            {renderRecipeInfoSection()}
            {renderIngredientsSection()}
            {renderPreparationStepsSection()}
            {renderCategorySection()}
            {renderPickImageSection()}
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
    justifyContent: 'center',
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
    position: 'absolute',
    top: 5,
    right: 5,
    opacity: 0.7,
  },
  icon: {
    width: 25,
    height: 25,
  },
  menuOptionContainer: {
    position: 'absolute',
    top: 40,
    right: 15,
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.darkGreen,
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  // INFO
  infoSectionContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },

  // INGREDIENTS
  ingredientsSectionContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  addIngredientButton: {
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
  },
  ingsChipsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    paddingBottom: 16,
  },

  // CATEGORIES
  categorySectionContainer: {
    paddingVertical: 12,
  },
  chipsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },

  // GALLERY
  gallerySectionContainer: {
    paddingTop: 12,
  },
  galleryIconWrapper: {
    alignSelf: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 50,
    padding: 15,
    marginTop: 8,
    marginBottom: 12,
  },
  galleryIcon: {
    width: 45,
    height: 45,
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
    justifyContent: 'center',
    marginBottom: 12,
  },
});

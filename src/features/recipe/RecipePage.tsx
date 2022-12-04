// Outer imports:
import React from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import i18n from '../../translations/i18n';

// Inner imports:
import {colors} from '../../constants/colors';
import {pop} from '../../navigation/RootNavigation';
import {useAppSelector} from '../../store/store';

// Components:
import BoldText from '../../components/text/BoldText';
import RecipeSummary from './components/RecipeSummary';
import RecipeMainImage from './components/RecipeMainImage';
import IngredientsCarousel from '../../components/Carousels/IngredientsCarousel';
import PrepStepsCarousel from '../../components/Carousels/PrepStepsCarousel';

const RecipePage = () => {
  const selectedRecipe = useAppSelector(state => state.recipe.selectedRecipe);

  const renderRecipePageHeader = () => {
    return (
      <>
        <RecipeMainImage
          recipe={selectedRecipe}
          onBackPress={() => {
            pop();
          }}
        />

        <RecipeSummary
          name={selectedRecipe?.name ?? ''}
          serving={selectedRecipe?.serving ?? 1}
          duration={selectedRecipe?.duration ?? ''}
        />
      </>
    );
  };

  const renderIngredientsCarousel = () => {
    return (
      <>
        <View style={styles.ingredientsHeaderContainer}>
          <BoldText
            children={i18n.t('recipe.ingredients')}
            color={colors.black}
            size={20}
            textAlign="left"
            lineHeight={20}
          />
        </View>
        <IngredientsCarousel ingredients={selectedRecipe?.ingredients ?? []} />
      </>
    );
  };

  const renderPreparationStepsCarousel = () => {
    return (
      <>
        <View style={styles.ingredientsHeaderContainer}>
          <BoldText
            children={i18n.t('recipe.preparationSteps')}
            color={colors.black}
            size={20}
            textAlign="left"
            lineHeight={20}
          />
        </View>
        <PrepStepsCarousel
          preparationSteps={selectedRecipe?.preparationSteps ?? []}
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {renderRecipePageHeader()}
        {renderIngredientsCarousel()}
        {renderPreparationStepsCarousel()}
      </ScrollView>
    </View>
  );
};

export default RecipePage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  ingredientsHeaderContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingTop: 24,
    paddingBottom: 12,
  },
});

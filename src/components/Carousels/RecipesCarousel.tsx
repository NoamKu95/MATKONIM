// Outer imports:
import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {colors} from '../../constants/colors';
import {setSelectedRecipe} from '../../features/recipe/state/recipeSlice';
import {Recipe} from '../../models/recipe';
import {navigate} from '../../navigation/RootNavigation';
import {useAppDispatch} from '../../store/store';
import RecipeCard from '../Cards/RecipeCard';

// Inner imports:

interface Props {
  recipes: Recipe[];
}

const RecipesCarousel = ({recipes}: Props) => {
  const dispatch = useAppDispatch();

  const renderRecipeCard = (row: {item: Recipe; index: number}) => {
    return (
      <RecipeCard
        recipe={row.item}
        isLastIndex={row.index === recipes.length - 1}
        onPress={() => {
          dispatch(setSelectedRecipe(row.item));
          navigate('Recipe');
        }}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={recipes}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: Recipe) => `${item.id}`}
        renderItem={renderRecipeCard}
      />
    </View>
  );
};

export default RecipesCarousel;

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 12,
    backgroundColor: colors.lightGreen,
    paddingHorizontal: 24,
    paddingVertical: 4,
  },
});

// Outer imports:
import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {colors} from '../../constants/colors';
import {Ingredient} from '../../models/ingredient';
import IngredientCard from '../Cards/IngredientCard';

// Inner imports:

interface Props {
  ingredients: Ingredient[];
}

const IngredientsCarousel = ({ingredients}: Props) => {
  const renderIngredientCard = (row: {item: Ingredient; index: number}) => {
    return (
      <IngredientCard
        ingredient={row.item}
        isLastIndex={row.index === ingredients.length - 1}
        isOnlyCard={ingredients.length === 1}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={ingredients}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: Ingredient) => `${item.name}`}
        renderItem={renderIngredientCard}
      />
    </View>
  );
};

export default IngredientsCarousel;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
    marginVertical: 12,
  },
});

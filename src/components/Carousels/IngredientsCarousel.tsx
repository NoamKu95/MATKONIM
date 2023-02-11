// Outer imports:
import React from "react";
import { StyleSheet, FlatList } from "react-native";

// Inner imports:
import { INGREDIENT_CARD_WIDTH, SCREEN_WIDTH } from "../../constants/sizes";

// Types:
import { Ingredient } from "../../models/ingredient";

// Components:
import IngredientCard from "../Cards/IngredientCard";

interface Props {
  ingredients: Ingredient[];
}

const IngredientsCarousel = ({ ingredients }: Props) => {
  const renderIngredientCard = (row: { item: Ingredient; index: number }) => {
    return (
      <IngredientCard
        ingredient={row.item}
        isLastIndex={row.index === ingredients.length - 1}
      />
    );
  };

  return (
    <FlatList
      data={ingredients}
      keyExtractor={(item: Ingredient) => `${item.name}`}
      renderItem={renderIngredientCard}
      scrollEnabled={ingredients.length * INGREDIENT_CARD_WIDTH > SCREEN_WIDTH}
      horizontal
      inverted
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default IngredientsCarousel;

const styles = StyleSheet.create({});

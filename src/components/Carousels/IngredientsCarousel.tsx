// Outer imports:
import React, { useState } from "react";
import { StyleSheet, FlatList, Dimensions } from "react-native";

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
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item: Ingredient) => `${item.name}`}
      renderItem={renderIngredientCard}
      inverted
      scrollEnabled={ingredients.length * INGREDIENT_CARD_WIDTH > SCREEN_WIDTH}
    />
  );
};

export default IngredientsCarousel;

const styles = StyleSheet.create({});

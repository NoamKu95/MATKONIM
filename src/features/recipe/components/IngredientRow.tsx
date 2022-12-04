// Outer imports:
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {colors} from '../../../constants/colors';

// Inner imports:
import {Ingredient} from '../../../models/ingredient';

// Types:

// Components:

interface Props {
  ingredient: Ingredient;
}

const IngredientRow: React.FC<Props> = ({ingredient}: Props) => {
  return (
    <View style={styles.ingredientCardContainer}>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>{ingredient.quantity}</Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{ingredient.name}</Text>
      </View>

      <View style={styles.iconContainer}>
        <Image source={ingredient.icon} style={styles.iconStyle} />
      </View>
    </View>
  );
};

export default IngredientRow;

const styles = StyleSheet.create({
  ingredientCardContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    marginVertical: 5,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    marginHorizontal: 25,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 5,
    backgroundColor: colors.lightGray,
  },
  iconStyle: {
    height: 40,
    width: 40,
  },
  descriptionContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  descriptionText: {},
  quantityContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  quantityText: {},
});

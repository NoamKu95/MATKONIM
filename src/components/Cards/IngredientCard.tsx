// Outer imports:
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

// Inner imports:
import {colors} from '../../constants/colors';
import BoldText from '../text/BoldText';

// Types:
import {Ingredient} from '../../models/ingredient';
import ShrinkingBoldText from '../text/ShrinkingBoldText';

interface Props {
  ingredient: Ingredient;
  isLastIndex: boolean;
  isOnlyCard: boolean;
}

const IngredientCard: React.FC<Props> = ({
  ingredient,
  isLastIndex = false,
  isOnlyCard = false,
}: Props) => {
  return (
    <View
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          marginRight: !isLastIndex ? 10 : isOnlyCard ? 0 : 20,
          marginLeft: isLastIndex ? 10 : 20,
          width: isOnlyCard ? Dimensions.get('window').width - 18 : 150,
        },
      ]}>
      <View style={styles.quantityContainer}>
        <ShrinkingBoldText
          children={`${ingredient.amount}`}
          color={colors.lightLime}
          size={75}
          textAlign="left"
          lineHeight={75}
        />
      </View>
      <View style={[styles.measurementContainer]}>
        <BoldText
          children={ingredient.measure}
          color={colors.darkGreen}
          size={18}
          textAlign="left"
          lineHeight={18}
        />
      </View>
      <View style={styles.textContainer}>
        <ShrinkingBoldText
          children={ingredient.name}
          color={colors.darkGreen}
          size={35}
          textAlign="left"
          lineHeight={35}
          numberOfLines={2}
        />
      </View>
    </View>
  );
};

export default IngredientCard;

const styles = StyleSheet.create({
  container: {
    height: 130,
    width: 150,
    borderRadius: 16,
    backgroundColor: colors.lightGray,
    marginBottom: 2,
    shadowColor: colors.lightGray2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  measurementContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  quantityContainer: {
    paddingTop: 24,
    paddingHorizontal: 8,
  },
  textContainer: {
    position: 'absolute',
    top: '65%',
    paddingHorizontal: 8,
  },
});

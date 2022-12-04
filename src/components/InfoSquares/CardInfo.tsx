// Outer imports:
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

// Inner imports:
import {colors} from '../../constants/colors';
import {icons} from '../../constants/icons';

// Types:
import {Recipe} from '../../models/recipe';
import i18n from '../../translations/i18n';
import RegularText from '../text/RegularText';
import ShrinkingBoldText from '../text/ShrinkingBoldText';

interface Props {
  recipe: Recipe;
}

const CardInfo: React.FC<Props> = (props: Props) => {
  const {recipe} = props;

  return (
    <View style={styles.container}>
      <ShrinkingBoldText
        children={recipe.name}
        color={colors.white}
        size={18}
        textAlign="left"
        lineHeight={18}
      />
      <RegularText
        children={`${recipe.duration}   ||   ${recipe.serving} ${i18n.t(
          'recipeCard.servings',
        )}`}
        color={colors.white}
        size={12}
        textAlign="left"
      />
    </View>
  );
};

export default CardInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.transparentDarkGray,
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    height: '25%',
    paddingVertical: '5%',
    paddingHorizontal: '5%',
    borderRadius: 12,
  },
  infoText: {
    color: colors.white,
  },
  recipeName: {
    width: '70%',
    color: colors.white,
    fontSize: 18,
  },
  cookingDetailsText: {
    color: colors.lightGray,
  },
  bookmarkIcon: {
    width: 20,
    height: 20,
    marginLeft: 8,
    tintColor: colors.darkGreen,
  },
});

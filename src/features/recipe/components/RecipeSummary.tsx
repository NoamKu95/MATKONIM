// Outer imports:
import React from 'react';
import {View, StyleSheet} from 'react-native';
import BoldText from '../../../components/text/BoldText';
import MediumText from '../../../components/text/MediumText';

// Inner imports:
import {colors} from '../../../constants/colors';
import i18n from '../../../translations/i18n';

// Components:

interface Props {
  name: string;
  serving: number;
  duration: string;
}

const RecipeSummary = ({name, serving, duration}: Props) => {
  return (
    <View style={styles.recipeSummaryContainer}>
      <BoldText
        children={name}
        color={colors.black}
        size={24}
        textAlign="left"
        letterSpacing={0.5}
        lineHeight={24}
      />

      <MediumText
        children={`${duration}  ||  ${serving} ${i18n.t(
          'recipeCard.servings',
        )}`}
        color={colors.transparentBlack5}
        size={16}
        textAlign="left"
      />
    </View>
  );
};

export default RecipeSummary;

const styles = StyleSheet.create({
  recipeSummaryContainer: {
    height: 80,
    paddingHorizontal: '5%',
    paddingTop: 10,
    justifyContent: 'space-evenly',
    // backgroundColor: colors.lightGray,
  },
  recipeName: {},
  timeServings: {
    marginTop: 5,
    color: colors.lightGray2,
  },
});

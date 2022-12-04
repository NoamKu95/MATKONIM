// Outer imports:
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

// Inner imports:
import {colors} from '../../constants/colors';
import {icons} from '../../constants/icons';
import {Recipe} from '../../models/Recipe';

// Types:

interface Props {
  recipe: Recipe | null;
}

const RecipePageInfo: React.FC<Props> = ({recipe}: Props) => {
  return (
    <View style={styles.recipeInfoContainer}>
      <TouchableOpacity
        onPress={() => {
          console.log('View Profile!');
        }}
        style={styles.iconContainer}>
        <Image source={icons.rightArrow} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default RecipePageInfo;

const styles = StyleSheet.create({
  recipeInfoContainer: {
    position: 'absolute',
    bottom: 10,
    left: 30,
    right: 30,
    height: 80,
    backgroundColor: colors.transparentDarkGray,
    borderRadius: 24,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeBy: {
    color: colors.lightGray2,
  },
  name: {
    color: colors.white2,
  },
  iconContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.lightGreen1,
  },
  icon: {
    width: 15,
    height: 15,
    tintColor: colors.lightGreen1,
  },
});

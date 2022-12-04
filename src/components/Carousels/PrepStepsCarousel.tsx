// Outer imports:
import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {colors} from '../../constants/colors';
import PreparationStepCard from '../Cards/PreparationStepCard';

// Inner imports:

interface Props {
  preparationSteps: string[];
}

const PrepStepsCarousel = ({preparationSteps}: Props) => {
  const renderStepCard = (row: {item: string; index: number}) => {
    return (
      <PreparationStepCard
        stepNumber={row.index + 1}
        stepText={row.item}
        isLastIndex={row.index === preparationSteps.length - 1}
        isOnlyCard={preparationSteps.length === 1}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={preparationSteps}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: string) => `${item}`}
        renderItem={renderStepCard}
      />
    </View>
  );
};

export default PrepStepsCarousel;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
    marginVertical: 12,
  },
});

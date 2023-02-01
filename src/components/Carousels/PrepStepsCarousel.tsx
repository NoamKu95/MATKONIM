// Outer imports:
import React, { useCallback, useState } from "react";
import { StyleSheet, View, FlatList, ViewToken } from "react-native";

// Inner imports:
import { colors } from "../../constants/colors";

// Components:
import PreparationStepCard from "../Cards/PreparationStepCard";

interface Props {
  preparationSteps: string[];
}

const PrepStepsCarousel = ({ preparationSteps }: Props) => {
  const [currentStepIndex, setCurrentstepIndex] = useState(0);

  // const viewabilityConfig = {
  //   waitForInteraction: true,
  //   viewAreaCoveragePercentThreshold: 50,
  // };

  // const handleViewableItemsChanged = useCallback(
  //   (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
  //     let newVisibleIndex = info.viewableItems[0].index ?? 0;
  //     if (currentStepIndex !== newVisibleIndex) {
  //       setCurrentstepIndex(newVisibleIndex);
  //     }
  //   },
  //   []
  // );

  const renderStepCard = (row: { item: string; index: number }) => {
    return (
      <PreparationStepCard
        stepNumber={row.index + 1}
        stepText={row.item}
        isLastIndex={row.index === preparationSteps.length - 1}
        isCardFocused={currentStepIndex === row.index}
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
        inverted
        // viewabilityConfig={viewabilityConfig}
        // onViewableItemsChanged={handleViewableItemsChanged}
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

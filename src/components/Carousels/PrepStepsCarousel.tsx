// Outer imports:
import React, { useCallback, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";

// Inner imports:
import { colors } from "../../constants/colors";
import { SCREEN_WIDTH, STEP_CARD_WIDTH } from "../../constants/sizes";

// Components:
import PreparationStepCard from "../Cards/PreparationStepCard";

interface Props {
  preparationSteps: string[];
}

const PrepStepsCarousel = ({ preparationSteps }: Props) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const _onViewableItemsChanged = useCallback(({ viewableItems }) => {
    setCurrentStepIndex(viewableItems[0].index);
  }, []);

  const _viewabilityConfig = {
    itemVisiblePercentThreshold: 60,
  };

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
        extraData={currentStepIndex}
        keyExtractor={(item: string) => `${item}`}
        renderItem={renderStepCard}
        onViewableItemsChanged={_onViewableItemsChanged}
        scrollEnabled={preparationSteps.length * STEP_CARD_WIDTH > SCREEN_WIDTH}
        pagingEnabled={true}
        horizontal
        inverted={preparationSteps.length === 1}
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={_viewabilityConfig}
        decelerationRate={"fast"}
        snapToAlignment={"start"}
      />
    </View>
  );
};

export default PrepStepsCarousel;

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 12,
  },
});

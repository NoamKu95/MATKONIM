// Outer imports:
import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, View, FlatList, ViewToken } from "react-native";

// Inner imports:
import { SCREEN_WIDTH, STEP_CARD_WIDTH } from "../../constants/sizes";

// Components:
import PreparationStepCard from "../Cards/PreparationStepCard";

interface Props {
  preparationSteps: string[];
}

const PrepStepsCarousel = ({ preparationSteps }: Props) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const _onViewableItemsChanged = useCallback(
    (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      setCurrentStepIndex(info?.viewableItems[0]?.index ?? 0);
    },
    []
  );

  const _viewabilityConfig = {
    itemVisiblePercentThreshold: 60,
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        ref={(ref) => (flatList = ref)}
        data={preparationSteps}
        extraData={currentStepIndex}
        keyExtractor={(item: string) => `${item}`}
        renderItem={({ item, index }) => (
          <PreparationStepCard
            stepNumber={index + 1}
            stepText={item}
            isLastIndex={index === preparationSteps.length - 1}
            isCardFocused={currentStepIndex === index}
          />
        )}
        onViewableItemsChanged={_onViewableItemsChanged}
        scrollEnabled={preparationSteps.length * STEP_CARD_WIDTH > SCREEN_WIDTH}
        pagingEnabled={true}
        horizontal
        inverted={preparationSteps.length === 1}
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={_viewabilityConfig}
        decelerationRate={"fast"}
        snapToAlignment={"start"}
        onContentSizeChange={() => flatList.scrollToEnd({ animated: true })}
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

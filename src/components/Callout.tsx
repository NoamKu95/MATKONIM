// Outer imports:
import React from "react";
import {
  StyleSheet,
  View,
  GestureResponderEvent,
  Pressable,
} from "react-native";
import i18n from "../translations/i18n";

// Inner imports:
import { colors } from "../constants/colors";
import { paddings } from "../constants/paddings";
import { HE } from "../models/translations";

// Components:
import BoldText from "./text/BoldText";
import RegularText from "./text/RegularText";

interface Props {
  mainText: string;
  buttonText: string;
  onPress: (event: GestureResponderEvent) => void;
}

const Callout = (props: Props) => {
  const { mainText, buttonText, onPress } = props;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <RegularText
          children={mainText}
          size={14}
          color={colors.darkLime}
          textAlign={"left"}
          lineHeight={24}
        />

        <Pressable style={styles.buttonContainer} onPress={onPress}>
          <BoldText
            children={buttonText}
            size={16}
            color={colors.gray}
            textAlign={"left"}
            lineHeight={18}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Callout;

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 12,
    backgroundColor: colors.lightGreen,
    paddingHorizontal: paddings._24px,
    paddingVertical: paddings._4px,
  },
  textContainer: {
    flex: 1,
    paddingVertical: paddings._16px,
  },
  text: {
    color: colors.gray,
  },
  buttonContainer: {
    paddingTop: paddings._12px,
  },
});

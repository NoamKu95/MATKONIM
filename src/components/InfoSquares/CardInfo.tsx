// Outer imports:
import React from "react";
import { View, StyleSheet } from "react-native";

// Inner imports:
import { colors } from "../../constants/colors";
import { paddings } from "../../constants/paddings";

// Components:
import RegularText from "../text/RegularText";
import ShrinkingBoldText from "../text/ShrinkingBoldText";

interface Props {
  titleText: string;
  subtitleText: string;
}

const CardInfo: React.FC<Props> = ({ titleText, subtitleText }: Props) => {
  return (
    <View style={styles.container}>
      <ShrinkingBoldText
        children={titleText}
        color={colors.white}
        size={18}
        textAlign="left"
        lineHeight={18}
      />
      <RegularText
        children={subtitleText}
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
    justifyContent: "space-between",
    padding: paddings._12px,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
});

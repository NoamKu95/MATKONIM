// Outer imports:
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import i18n from "../../translations/i18n";
import { useNetInfo } from "@react-native-community/netinfo";

// Inner imports:
import { colors } from "../../constants/colors";
import { paddings } from "../../constants/paddings";
import { icons } from "../../constants/icons";
import BoldText from "../../components/text/BoldText";
import RegularText from "../../components/text/RegularText";
import ActionButton from "../../components/Buttons/ActionButton";
import { pop } from "../../navigation/RootNavigation";
import { MyErrorData, GeneralErrorTypes } from "../../models/errors";

// Redux:
import { useAppDispatch } from "../../store/store";
import { generalErrorHandler } from "./state/errorHandlingActions";

const NoInternetScreen = () => {
  const dispatch = useAppDispatch();
  const netInfo = useNetInfo();

  const returnOrStayAccordingToConnection = () => {
    if (netInfo.isConnected) {
      pop();
    } else {
      const error: MyErrorData = {
        type: GeneralErrorTypes.NO_INTERNET,
        message: i18n.t("errorHandling.noInternetTitle"),
        icon: icons.no_internet,
      };
      dispatch(generalErrorHandler(error));
    }
  };

  const renderTexts = () => {
    return (
      <View style={styles.textContainer}>
        <View style={styles.title}>
          <BoldText
            size={22}
            lineHeight={26}
            color={colors.black}
            textAlign="center"
          >
            {i18n.t("errorHandling.noInternetTitle")}
          </BoldText>
        </View>
        <View style={styles.description}>
          <RegularText
            size={18}
            lineHeight={32}
            color={colors.black}
            textAlign="center"
            letterSpacing={0.2}
          >
            {i18n.t("errorHandling.noInternetDescription")}
          </RegularText>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.flex}>
        <Image
          source={icons.no_internet}
          resizeMethod="resize"
          style={styles.icon}
        />
        {renderTexts()}
        <ActionButton
          buttonText={i18n.t("errorHandling.noInternetButtonLabel")}
          buttonColors={[colors.darkGreen, colors.lime]}
          buttonTextColor={colors.white}
          buttonTextSize={18}
          buttonContainerStyle={styles.buttonContainer}
          onPress={returnOrStayAccordingToConnection}
        />
      </View>
    </SafeAreaView>
  );
};

export default NoInternetScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    paddingVertical: paddings._8px,
  },
  description: {
    paddingHorizontal: paddings._16px,
  },
  textContainer: {
    paddingVertical: paddings._32px,
    justifyContent: "space-between",
  },
  buttonContainer: {
    paddingVertical: 18,
    borderRadius: 12,
    width: Dimensions.get("screen").width - 48,
  },
  icon: {
    width: 70,
    height: 70,
  },
});

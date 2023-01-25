// Outer imports:
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import i18n from "../../translations/i18n";

// Inner imports:
import { colors } from "../../constants/colors";
import MediumText from "../../components/text/MediumText";
import RegularText from "../../components/text/RegularText";
import { paddings } from "../../constants/paddings";
import { pop } from "../../navigation/RootNavigation";

const NoInternetScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.flex}>
        {/* <SomeRelevantIcon /> */}
        <View style={styles.textContainer}>
          <View style={styles.title}>
            <MediumText
              size={22}
              lineHeight={26}
              color={colors.black}
              textAlign="center"
            >
              {i18n.t("errorHandling.NoInternetTitle")}
            </MediumText>
          </View>
          <RegularText
            size={18}
            lineHeight={21}
            color={colors.black}
            textAlign="center"
          >
            {i18n.t("errorHandling.noInternetConnectionDescription")}
          </RegularText>
        </View>
        <View style={styles.buttonContainer}>
          {/* <BigButton
            onPress={pop}
            buttonLabel={i18n.t("errorHandling.noInternetButtonLabel")}
          /> */}
        </View>
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
    paddingHorizontal: paddings._24px,
  },
  title: {
    paddingVertical: paddings._8px,
  },
  textContainer: {
    paddingVertical: paddings._32px,
    justifyContent: "space-between",
  },
  buttonContainer: {
    width: "50%",
  },
});

// Outer imports:
import React from "react";
import { View, StyleSheet, Pressable, Dimensions, Image } from "react-native";
import i18n from "../../translations/i18n";

// Inner imports:
import { colors } from "../../constants/colors";
import { icons } from "../../constants/icons";
import { paddings } from "../../constants/paddings";
import LogoutIcon from "../../assets/icons/svg/LogoutIcon";

// Redux:
import { useAppDispatch, useAppSelector } from "../../store/store";
import { signOutFromFirebase } from "../auth/state/authActions";

// Components:
import RegularText from "../../components/text/RegularText";
import BoldText from "../../components/text/BoldText";
import { HE } from "../../models/translations";

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const userSurname = useAppSelector((state) => state.auth.userName);

  const renderHeyUser = () => {
    return (
      <>
        <View style={styles.textsContainer}>
          <View style={styles.heyUser}>
            <BoldText
              children={`${i18n.t("profile.heyUser")} ${userSurname ?? ""}`}
              size={24}
              color={colors.darkLime}
              textAlign="left"
              lineHeight={32}
            />
          </View>
          <RegularText
            children={i18n.t("profile.personalText")}
            size={16}
            color={colors.gray}
            textAlign="left"
            lineHeight={32}
          />
        </View>
      </>
    );
  };

  const renderWhiteSheet = () => {
    return (
      <View style={styles.sheetContainer}>
        {renderHeyUser()}
        {renderLogout()}
      </View>
    );
  };

  const renderLogout = () => {
    return (
      <View style={styles.logoutContainer}>
        <Pressable
          style={styles.logoutContainer}
          onPress={() => {
            dispatch(signOutFromFirebase);
          }}
        >
          <View style={styles.iconWrapper}>
            <LogoutIcon />
          </View>
          <BoldText
            children={i18n.t("profile.logout")}
            size={14}
            color={colors.lime}
            textAlign="left"
          />
        </Pressable>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <>
        <View style={styles.userDetailsContainer}>
          <Image
            source={icons.abstract_shape1}
            resizeMethod={"resize"}
            style={styles.userIcon}
          />
          <View style={{ flexDirection: "column" }}>
            <View style={styles.userNameText}>
              <BoldText
                children="Noam Kurtzer"
                size={32}
                color={colors.white}
                textAlign="right"
                lineHeight={32}
              />
            </View>
            <View style={styles.recipesNumberWrapper}>
              <RegularText
                children="No. of recipes: 24"
                size={16}
                color={colors.white}
                textAlign="left"
              />
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {renderHeader()}
      {renderWhiteSheet()}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.lime,
  },
  sheetContainer: {
    marginTop: "20%",
    height: Dimensions.get("window").height,
    backgroundColor: colors.white,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    paddingHorizontal: paddings._16px,
    paddingVertical: paddings._32px,
  },

  heyUser: {
    paddingBottom: paddings._8px,
  },

  // USER DETAILS
  userDetailsContainer: {
    paddingTop: paddings._32px,
    paddingHorizontal: paddings._24px,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  userIcon: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.transparentBlack9,
    backgroundColor: colors.blue,
  },
  userNameText: {
    paddingBottom: paddings._8px,
  },
  recipesNumberWrapper: {
    alignSelf: "center",
    alignContent: "center",
    borderWidth: 1.5,
    borderColor: colors.white,
    padding: paddings._8px,
  },

  textsContainer: {
    paddingVertical: paddings._12px,
  },

  // LOGOUT
  logoutContainer: {
    paddingVertical: paddings._8px,
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    paddingRight: i18n.locale === HE ? paddings._8px : 0,
    paddingLeft: i18n.locale === HE ? 0 : paddings._8px,
    transform: i18n.locale === HE ? [{ scaleX: 1 }] : [{ scaleX: -1 }],
  },
});

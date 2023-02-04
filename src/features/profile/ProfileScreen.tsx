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
import { SCREEN_HEIGHT } from "../../constants/sizes";

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const userSurname = useAppSelector((state) => state.auth.userName);
  const recipes = useAppSelector((state) => state.home.recipes);

  const renderHeader = () => {
    return (
      <>
        <View style={styles.userDetailsMainContainer}>
          <View style={styles.userDetailsTextsContainer}>
            <BoldText
              children={userSurname ?? "נעם קורצר"}
              size={32}
              color={colors.white}
              textAlign="left"
              lineHeight={32}
            />
            <View style={styles.recipesNumberWrapper}>
              <RegularText
                children={`No. of recipes: ${recipes.length}`}
                size={16}
                color={colors.white}
                textAlign="left"
              />
            </View>
          </View>
          <Image
            source={icons.abstract_shape1}
            resizeMethod={"resize"}
            style={styles.userIcon}
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

  const renderHeyUser = () => {
    return (
      <>
        <View style={styles.textsContainer}>
          <View style={styles.heyUser}>
            <BoldText
              children={`${i18n.t("profile.heyUser")} ${userSurname ?? ""}`}
              size={21}
              color={colors.darkLime}
              textAlign="left"
              lineHeight={24}
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

  const renderLogout = () => {
    return (
      <Pressable
        style={styles.logoutContainer}
        onPress={() => {
          dispatch(signOutFromFirebase);
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={icons.user_logout} style={styles.logoutIcon} />
          <BoldText
            children={i18n.t("profile.logout")}
            size={14}
            color={colors.darkLime}
            textAlign="left"
          />
        </View>
      </Pressable>
    );
  };

  const renderRecipesChart = () => {
    return (
      <View>
        <View></View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {renderHeader()}
      {renderRecipesChart()}
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

  // USER DETAILS
  userDetailsMainContainer: {
    paddingTop: paddings._42px,
    paddingHorizontal: paddings._21px,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  userIcon: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: colors.transparentBlack3,
    backgroundColor: colors.lightGray,
    tintColor: colors.darkLime,
  },
  userDetailsTextsContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
  recipesNumberWrapper: {
    borderWidth: 1.5,
    borderRadius: 30,
    borderColor: colors.white,
    paddingVertical: paddings._8px,
    paddingHorizontal: paddings._16px,
  },

  // SHEET
  sheetContainer: {
    marginTop: "15%",
    height: SCREEN_HEIGHT,
    backgroundColor: colors.white,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    paddingHorizontal: paddings._16px,
    paddingVertical: paddings._32px,
  },
  heyUser: {
    paddingBottom: paddings._8px,
  },
  textsContainer: {
    paddingVertical: paddings._12px,
  },

  // LOGOUT
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 0.8,
    borderStyle: "dashed",
    borderTopColor: colors.transparentBlack7,
    paddingVertical: paddings._16px,
  },
  logoutIcon: {
    height: 25,
    width: 25,
    tintColor: colors.darkLime,
    marginRight: i18n.locale === HE ? paddings._4px : 0,
    marginLeft: i18n.locale === HE ? 0 : paddings._4px,
    transform: i18n.locale === HE ? [{ scaleX: -1 }] : [{ scaleX: 1 }],
  },
});

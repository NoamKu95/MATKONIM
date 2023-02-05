// Outer imports:
import React, { useState } from "react";
import { View, StyleSheet, Pressable, Image, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";
import LottieView from "lottie-react-native";
import i18n from "../../translations/i18n";

// Inner imports:
import { colors } from "../../constants/colors";
import { icons } from "../../constants/icons";
import { animations } from "../../constants/animations";
import { paddings } from "../../constants/paddings";
import { Directions } from "../../constants/directions";
import { countItemsUnderEachKey, countKeys } from "../../utils/counters";

// Redux:
import { useAppDispatch, useAppSelector } from "../../store/store";
import { signOutFromFirebase } from "../auth/state/authActions";

// Components:
import RegularText from "../../components/text/RegularText";
import BoldText from "../../components/text/BoldText";
import { HE } from "../../models/translations";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/sizes";
import {
  CATEGORIES_ENGLISH_NAMES,
  CATEGORIES_HEBREW_NAMES,
} from "../../models/category";

const ProfileScreen = () => {
  const dispatch = useAppDispatch();

  const userSurname = useAppSelector((state) => state.auth.userName);

  const xAxisLabels =
    i18n.locale === HE ? CATEGORIES_HEBREW_NAMES : CATEGORIES_ENGLISH_NAMES;
  const groupedRecipes = useAppSelector(
    (state) => state.home.categorizedRecipes
  );
  const [lottieArrowDirection, setLottieArrowDirection] = useState(
    Directions.RIGHT
  );

  const renderHeader = () => {
    return (
      <>
        <View style={styles().userDetailsMainContainer}>
          <View style={styles().userDetailsTextsContainer}>
            <BoldText
              children={userSurname ?? "נעם קורצר"}
              size={32}
              color={colors.white}
              textAlign="left"
              lineHeight={32}
            />
            <View style={styles().recipesNumberWrapper}>
              <RegularText
                children={`No. of recipes: ${countKeys(groupedRecipes)}`}
                size={16}
                color={colors.white}
                textAlign="left"
              />
            </View>
          </View>
          <Image
            source={icons.abstract_shape1}
            resizeMethod={"resize"}
            style={styles().userIcon}
          />
        </View>
      </>
    );
  };

  const renderWhiteSheet = () => {
    return (
      <View style={styles().sheetContainer}>
        {renderHeyUser()}
        {renderRecipesChart()}
        {renderLogout()}
      </View>
    );
  };

  const renderHeyUser = () => {
    return (
      <>
        <View style={styles().textsContainer}>
          <View style={styles().heyUser}>
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
        style={styles().logoutContainer}
        onPress={() => {
          dispatch(signOutFromFirebase);
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={icons.user_logout} style={styles().logoutIcon} />
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
      <View style={styles().chartMainContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={({ nativeEvent }) => {
            if (reachedEndOfScrollView(nativeEvent)) {
              setLottieArrowDirection(Directions.LEFT);
            } else if (reachedStartOfScrollView(nativeEvent)) {
              setLottieArrowDirection(Directions.RIGHT);
            }
          }}
          scrollEventThrottle={0}
        >
          <BarChart
            data={{
              labels: xAxisLabels,
              datasets: [
                {
                  data: countItemsUnderEachKey(
                    groupedRecipes,
                    CATEGORIES_HEBREW_NAMES
                  ),
                },
              ],
            }}
            width={SCREEN_WIDTH * 1.5}
            height={180}
            yAxisSuffix=""
            yAxisLabel=""
            withHorizontalLabels={false}
            verticalLabelRotation={0}
            withInnerLines={false}
            showValuesOnTopOfBars
            chartConfig={{
              backgroundColor: colors.white,
              backgroundGradientFrom: colors.white,
              backgroundGradientTo: colors.white,
              color: () => `rgba(26, 136, 113, 1)`,
              labelColor: () => `rgba(26, 136, 113, 1)`,
              barPercentage: 1,
              decimalPlaces: 0,
              propsForLabels: {
                fontSize: "9",
              },
            }}
            style={{
              paddingRight: 0,
            }}
          />
        </ScrollView>
        <View style={styles(lottieArrowDirection).arrowAnimationWrapper}>
          <LottieView
            autoPlay={true}
            loop
            speed={1.5}
            source={animations.scroll_indicator}
            style={styles(lottieArrowDirection).arrowAnimation}
          />
        </View>
      </View>
    );
  };

  const reachedEndOfScrollView = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    return layoutMeasurement.width + contentOffset.x >= contentSize.width;
  };

  const reachedStartOfScrollView = ({ contentOffset }) => {
    return contentOffset.x === 0;
  };

  return (
    <View style={styles().mainContainer}>
      {renderHeader()}
      {renderWhiteSheet()}
    </View>
  );
};

export default ProfileScreen;

const styles = (lottieArrowDirection?: string) =>
  StyleSheet.create({
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
      height: SCREEN_HEIGHT / 1.5,
      backgroundColor: colors.white,
      borderTopRightRadius: 35,
      borderTopLeftRadius: 35,
      paddingVertical: paddings._32px,
    },

    // SHEET TEXTS
    textsContainer: {
      paddingHorizontal: paddings._16px,
      paddingTop: paddings._12px,
    },
    heyUser: {
      paddingHorizontal: paddings._16px,
      paddingBottom: paddings._8px,
    },

    // CHART
    chartMainContainer: {
      height: 225,
      paddingBottom: paddings._16px,
    },

    // ARROW ANIMATION
    arrowAnimation: {
      width: 15,
      height: 15,
      transform: [
        lottieArrowDirection === Directions.LEFT
          ? { rotate: "45deg" }
          : { rotate: "-45deg" },
      ],
      opacity: 0.5,
    },
    arrowAnimationWrapper: {
      alignSelf:
        lottieArrowDirection === Directions.LEFT ? "flex-end" : "flex-start",
      paddingHorizontal: paddings._16px,
    },

    // LOGOUT
    logoutContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderTopWidth: 0.8,
      borderStyle: "dashed",
      borderTopColor: colors.transparentBlack7,
      padding: paddings._16px,
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

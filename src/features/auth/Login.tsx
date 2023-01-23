// Outer imports:
import React, { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Keyboard,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { updateAuthSection } from "./state/authActions";
import LinearGradient from "react-native-linear-gradient";
import i18n from "../../translations/i18n";

// Inner imports:
import { images } from "../../constants/images";
import { colors } from "../../constants/colors";

// Components:
import RegularText from "../../components/text/RegularText";
import BoldText from "../../components/text/BoldText";
import ActionButton from "../../components/Buttons/ActionButton";
import Loader from "../../components/Loader";
import LoginTextInputs from "./components/LoginTextInputs";
import RegisterTextInputs from "./components/RegisterTextInputs";
import SectionSwapButton from "./components/SectionSwapButton";

const Login = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const showLogin = useAppSelector((state) => state.auth.isShowLogin);
  const showRegister = useAppSelector((state) => state.auth.isShowRegistration);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const renderBackgroundImage = () => {
    return (
      <View style={styles.bgImageContainer}>
        <ImageBackground
          source={images.loginBackground}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[colors.transparent, colors.black]}
            style={styles.linearGradient}
          />
        </ImageBackground>
      </View>
    );
  };

  const renderTexts = () => {
    return (
      <View
        style={[
          styles.textContainer,
          showLogin ? { top: "30%" } : { top: "20%" },
        ]}
      >
        <BoldText
          children={i18n.t("auth.mainTitle")}
          size={32}
          color={colors.white}
          textAlign="left"
          lineHeight={44}
        />
        <View style={styles.secondaryTextContainer}>
          <RegularText
            children={i18n.t("auth.secondaryTitle")}
            size={18}
            color={colors.lightLime}
            textAlign="left"
            lineHeight={32}
          />
        </View>
      </View>
    );
  };

  const renderChooseActionButtons = () => {
    return (
      <View style={styles.buttonsContainer}>
        <ActionButton
          buttonText={i18n.t("auth.login")}
          buttonColors={[colors.darkGreen, colors.lime]}
          buttonTextColor={colors.white}
          buttonTextSize={18}
          buttonContainerStyle={styles.loginButtonStyle}
          onPress={() => {
            dispatch(updateAuthSection("login"));
          }}
        />
        <ActionButton
          buttonText={i18n.t("auth.signup")}
          buttonColors={[colors.transparent, colors.transparent]}
          buttonTextColor={colors.white}
          buttonTextSize={18}
          buttonContainerStyle={styles.signUpButtonStyle}
          onPress={() => {
            dispatch(updateAuthSection("register"));
          }}
        />
      </View>
    );
  };

  const renderLoginSection = () => {
    return (
      <View style={styles.sectionContainer}>
        <LoginTextInputs />
        <SectionSwapButton
          text={i18n.t("auth.loginSection.goRegister")}
          moveToSection={"registration"}
        />
      </View>
    );
  };

  const renderRegistrationSection = () => {
    return (
      <View style={styles.sectionContainer}>
        <RegisterTextInputs />
        <SectionSwapButton
          text={i18n.t("auth.registerSection.goLogin")}
          moveToSection={"login"}
        />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {renderBackgroundImage()}
      {!isKeyboardVisible && renderTexts()}
      {isLoading ? (
        <Loader style={styles.loader} />
      ) : (
        <>
          {!showLogin && !showRegister && renderChooseActionButtons()}
          {showLogin && !showRegister && renderLoginSection()}
          {!showLogin && showRegister && renderRegistrationSection()}
        </>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.black,
  },

  // LOADER
  loader: {
    justifyContent: "center",
  },

  // BACKGROUND IMAGE
  bgImageContainer: {
    height: Dimensions.get("window").height > 700 ? "65%" : "60%",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  linearGradient: {
    height: 200,
    justifyContent: "flex-end",
    paddingHorizontal: 8,
  },

  // TEXTS
  textContainer: {
    position: "absolute",
    paddingHorizontal: 8,
  },
  secondaryTextContainer: {
    paddingVertical: 8,
  },

  // BUTTONS
  buttonsContainer: {
    position: "absolute",
    bottom: "10%",
    width: "100%",
    paddingHorizontal: 8,
  },
  loginButtonStyle: {
    paddingVertical: 18,
    borderRadius: 12,
  },
  signUpButtonStyle: {
    marginTop: 24,
    paddingVertical: 18,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.darkLime,
  },

  sectionContainer: {
    position: "absolute",
    bottom: "0%",
    width: "100%",
    paddingHorizontal: 8,
  },
});

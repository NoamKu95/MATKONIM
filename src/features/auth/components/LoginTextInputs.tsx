// Outer imports:
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import i18n from "../../../translations/i18n";

// Inner imports:
import { colors } from "../../../constants/colors";

// Components:
import ActionButton from "../../../components/Buttons/ActionButton";
import CustomTextInput from "../../../components/TextInput/CustomTextInput";

// Redux:
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { logUserIn } from "../state/authActions";
import { validateEmail, validatePassword } from "../../../utils/validators";

const LoginTextInputs = () => {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.auth.userEmail);
  const password = useAppSelector((state) => state.auth.userPassword);
  const emailWarning = useAppSelector((state) => state.auth.emailWarning);
  const passwordWarning = useAppSelector((state) => state.auth.passwordWarning);
  const [isPasswordCensored, setIsPasswordCensored] = useState(true);

  return (
    <View style={styles.loginSectionContainer}>
      <CustomTextInput
        textValue={email ?? ""}
        placeholderText={i18n.t("auth.loginSection.emailPlaceholder")}
        warningText={emailWarning}
        isShowWarning={emailWarning !== null}
        onChangeText={(newTxt) => {
          if (newTxt !== "" && newTxt !== email) {
            dispatch(validateEmail(newTxt));
          }
        }}
        keyboardType={"email-address"}
      />
      <CustomTextInput
        textValue={password ?? ""}
        placeholderText={i18n.t("auth.loginSection.passwordPlaceholder")}
        warningText={passwordWarning}
        isShowWarning={passwordWarning !== null}
        onChangeText={(newTxt) => {
          if (newTxt !== "" && newTxt !== password) {
            dispatch(validatePassword(newTxt));
          }
        }}
        isCensored={isPasswordCensored}
        iconOnPress={() => setIsPasswordCensored(!isPasswordCensored)}
      />
      <ActionButton
        buttonText={i18n.t("auth.login")}
        buttonColors={[colors.darkGreen, colors.lime]}
        buttonTextColor={colors.white}
        buttonTextSize={18}
        buttonContainerStyle={styles.loginButtonStyle}
        onPress={() => {
          dispatch(logUserIn(email, password));
        }}
      />
    </View>
  );
};

export default LoginTextInputs;

const styles = StyleSheet.create({
  loginSectionContainer: {
    bottom: "0%",
    paddingHorizontal: 8,
  },
  loginButtonStyle: {
    paddingVertical: 18,
    borderRadius: 12,
  },
});

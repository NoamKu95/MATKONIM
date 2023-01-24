// Outer imports:
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import i18n from "../../../translations/i18n";

// Inner imports:
import { colors } from "../../../constants/colors";

// Components:
import ActionButton from "../../../components/Buttons/ActionButton";
import CustomTextInput from "../../../components/TextInput/CustomTextInput";

// Redux:
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  registerUser,
  validateEmail,
  validateName,
  validatePassword,
} from "../state/authActions";

const RegisterTextInputs = () => {
  const dispatch = useAppDispatch();
  const [surname, setSurname] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const nameWarning = useAppSelector((state) => state.auth.nameWarning);
  const emailWarning = useAppSelector((state) => state.auth.emailWarning);
  const passwordWarning = useAppSelector((state) => state.auth.passwordWarning);
  const [isPasswordCensored, setIsPasswordCensored] = useState(true);

  return (
    <View style={styles.registerSectionContainer}>
      <CustomTextInput
        textValue={surname ?? ""}
        placeholderText={i18n.t("auth.registerSection.namePlaceholder")}
        warningText={nameWarning}
        isShowWarning={nameWarning !== null}
        onChangeText={(newTxt) => {
          if (newTxt !== "" && newTxt !== surname) {
            dispatch(validateName(newTxt));
          }
        }}
      />
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
        buttonText={i18n.t("auth.signup")}
        buttonColors={[colors.darkGreen, colors.lime]}
        buttonTextColor={colors.white}
        buttonTextSize={18}
        buttonContainerStyle={styles.loginButtonStyle}
        onPress={() => {
          dispatch(registerUser(email, password, surname));
        }}
      />
    </View>
  );
};

export default RegisterTextInputs;

const styles = StyleSheet.create({
  registerSectionContainer: {
    bottom: "0%",
    paddingHorizontal: 8,
  },
  loginButtonStyle: {
    paddingVertical: 18,
    borderRadius: 12,
  },
});

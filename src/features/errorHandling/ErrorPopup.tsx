// Outer imports:
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

// Inner imports:
import { colors } from "../../constants/colors";
import { paddings } from "../../constants/paddings";
import { resetTo } from "../../navigation/RootNavigation";

// Redux:
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setIsError } from "./state/errorHandlingActions";

// Components:
import RegularText from "../../components/text/RegularText";
import { MyErrorTypes } from "../../models/errors";
import { icons } from "../../constants/icons";
import i18n from "../../translations/i18n";

const ErrorPopUp = () => {
  const dispatch = useAppDispatch();
  const isError = useAppSelector((state) => state.errorHandling.isError);
  const errorType = useAppSelector((state) => state.errorHandling.errorType);
  const errorMessage = useAppSelector(
    (state) => state.errorHandling.errorMessage
  );

  const modalContentByErrorType: { [key in MyErrorTypes]: JSX.Element } = {
    [MyErrorTypes.ERROR_CASE_1]: (
      <View style={styles.modalContent}>
        {icons.abstract_shape1}
        <RegularText size={15} color={colors.black} textAlign="center">
          {errorMessage
            ? errorMessage
            : i18n.t("errorHandling.somethingWentWrong")}
        </RegularText>
        {/* <BigButton
          buttonLabel={i18n.t("errorHandling.toHomePage")}
          onPress={() => {
            dispatch(setIsError(false));
            resetTo("Tabs");
          }}
        /> */}
      </View>
    ),
    [MyErrorTypes.ERROR_CASE_2]: (
      <View style={styles.modalContent}>
        {icons.abstract_shape1}
        <RegularText size={15} color={colors.black} textAlign="center">
          {errorMessage
            ? errorMessage
            : i18n.t("errorHandling.somethingWentWrong")}
        </RegularText>
        {/* <BigButton
          buttonLabel={i18n.t("errorHandling.toCustomerService")}
          onPress={() => {
            dispatch(setIsError(false));
            resetTo("Login");
          }}
        /> */}
      </View>
    ),
  };

  return (
    <Modal
      isVisible={isError}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={() => dispatch(setIsError(false))}
      style={styles.modal}
    >
      <View style={styles.modalContainer}>
        <Pressable
          style={styles.closeButton}
          onPress={() => dispatch(setIsError(false))}
          hitSlop={5}
        >
          {icons.close_circle}
        </Pressable>
        {modalContentByErrorType[errorType]}
      </View>
    </Modal>
  );
};

export default ErrorPopUp;

const styles = StyleSheet.create({
  modal: {
    alignItems: "center",
  },
  modalContainer: {
    height: "38%",
    backgroundColor: colors.white,
    width: "90%",
    borderRadius: 8,
    paddingVertical: paddings._16px,
    paddingHorizontal: paddings._16px,
  },
  modalContent: {
    alignItems: "center",
    height: "90%",
    justifyContent: "space-between",
  },
  closeButton: { width: "8%" },
});

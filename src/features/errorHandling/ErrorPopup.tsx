// Outer imports:
import React, { useEffect } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
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
import BoldText from "../../components/text/BoldText";
import CloseIcon from "../../assets/icons/svg/closeIcon";

const ErrorPopUp = () => {
  const dispatch = useAppDispatch();
  const isError = useAppSelector((state) => state.errorHandling.isError);
  const errorType = useAppSelector((state) => state.errorHandling.errorType);
  const errorMessage = useAppSelector(
    (state) => state.errorHandling.errorMessage
  );
  const errorIcon = useAppSelector((state) => state.errorHandling.errorIcon);

  const modalContentByErrorType: { [key in MyErrorTypes]: JSX.Element } = {
    [MyErrorTypes.NO_INTERNET]: (
      <View style={styles.modalContent}>
        <Image
          source={errorIcon ? errorIcon : icons.sad_face}
          resizeMethod="resize"
          style={{ height: 70, width: 70 }}
        />
        <BoldText size={15} color={colors.black} textAlign="center">
          {errorMessage
            ? errorMessage
            : i18n.t("errorHandling.somethingWentWrong")}
        </BoldText>
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
          <CloseIcon />
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
    justifyContent: "space-around",
  },
  closeButton: {
    width: "8%",
  },
  icon: {
    width: 30,
    height: 30,
  },
});

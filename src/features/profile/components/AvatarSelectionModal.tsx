// Outer imports:
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Image,
  ImageSourcePropType,
} from "react-native";
import Modal from "react-native-modal";
import i18n from "../../../translations/i18n";

// Inner imports:
import { colors } from "../../../constants/colors";
import { paddings } from "../../../constants/paddings";
import { SCREEN_WIDTH } from "../../../constants/sizes";
import {
  ANIMAL_AVATARS,
  AVATAR_TYPES,
  FEMALE_AVATARS,
  MALE_AVATARS,
} from "../../../constants/dataArrays";
import CloseIcon from "../../../assets/icons/svg/closeIcon";

// Components:
import BoldText from "../../../components/text/BoldText";
import ActionButton from "../../../components/Buttons/ActionButton";

// Types:
import { Avatar } from "../../../models/avatar";

// Redux:
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { setModalVisibility, setSelectedAvatar } from "../state/profileSlice";
import { updateSavedUserAvatar } from "../state/profileActions";
import Loader from "../../../components/Loader";

enum AvatarType {
  female = 1,
  male,
  undefined,
}

interface AvatarModalProps {
  currentAvatar: Avatar;
}

const AvatarSelectionModal = ({ currentAvatar }: AvatarModalProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.profile.isLoading);
  const modalVisibility = useAppSelector(
    (state) => state.profile.isModalVisible
  );
  const [selectedType, setSelectedType] = useState<AvatarType>(
    AvatarType.undefined
  );
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar>(currentAvatar);

  const renderAvatarTypeSelection = () => {
    return (
      <>
        <View style={styles.title}>
          <BoldText
            children={i18n.t("profile.avatarModal.chooseType")}
            color={colors.darkGreen}
            size={18}
            lineHeight={18}
            textAlign={"left"}
          />
        </View>

        <View style={styles.typesIconsContainer}>
          {AVATAR_TYPES.map((avatar) => {
            return (
              <Pressable
                onPress={() => setSelectedType(avatar.id)}
                style={[
                  styles.typeIconWrapper,
                  selectedType === avatar.id ? styles.selectedIcon : null,
                ]}
                key={avatar.id}
              >
                <Image source={avatar.icon} style={styles.avatarIcon} />
              </Pressable>
            );
          })}
        </View>
        {renderDivider()}
      </>
    );
  };

  const renderAvatarsBySelectedType = () => {
    let arr: Avatar[] = [];
    if (selectedType !== null) {
      if (selectedType === AvatarType.female) {
        arr = FEMALE_AVATARS;
      } else if (selectedType === AvatarType.male) {
        arr = MALE_AVATARS;
      } else {
        arr = ANIMAL_AVATARS;
      }
    }

    return (
      <>
        <View style={styles.title}>
          <BoldText
            children={i18n.t("profile.avatarModal.chooseAvatar")}
            color={colors.darkGreen}
            size={18}
            lineHeight={18}
            textAlign={"left"}
          />
        </View>
        {renderAvatars(arr)}
        {renderDivider()}
      </>
    );
  };

  const renderAvatars = (iconsArr: Avatar[]) => {
    return (
      <View style={styles.avatarsContainer}>
        {iconsArr.map((avatar) => {
          return (
            <Pressable
              onPress={() => setSelectedAvatar(avatar)}
              style={[
                styles.avatarIconWrapper,
                selectedAvatar.icon === avatar.icon
                  ? styles.selectedIcon
                  : null,
              ]}
              key={avatar.id}
            >
              <Image source={avatar.icon} style={styles.avatarIcon} />
            </Pressable>
          );
        })}
      </View>
    );
  };

  const renderAvatarPreview = () => {
    return (
      <>
        <View style={styles.title}>
          <BoldText
            children={i18n.t("profile.avatarModal.preview")}
            color={colors.darkGreen}
            size={18}
            lineHeight={18}
            textAlign={"left"}
          />
        </View>
        <View style={styles.previewImageContainer}>
          <Image source={selectedAvatar.icon} style={styles.previewImage} />
        </View>
      </>
    );
  };

  const renderSaveButton = () => {
    return isLoading ? (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    ) : (
      <View style={styles.saveButtonContainer}>
        <ActionButton
          buttonText={i18n.t("profile.avatarModal.save")}
          buttonTextColor={colors.white}
          buttonTextSize={16}
          buttonContainerStyle={styles.saveButton}
          buttonColors={[colors.darkGreen, colors.lime]}
          onPress={() => {
            dispatch(updateSavedUserAvatar(selectedAvatar));
          }}
        />
      </View>
    );
  };

  const renderDivider = () => {
    return <View style={styles.divider} />;
  };

  return (
    <Modal
      isVisible={modalVisibility}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modal}
    >
      <View style={styles.mainContainer}>
        <Pressable
          onPress={() => dispatch(setModalVisibility(false))}
          style={styles.closeIconContainer}
        >
          <CloseIcon />
        </Pressable>
        {renderAvatarTypeSelection()}
        {renderAvatarsBySelectedType()}
        {renderAvatarPreview()}
        {renderSaveButton()}
      </View>
    </Modal>
  );
};

export default AvatarSelectionModal;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    backgroundColor: colors.white,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    flex: 0,
    bottom: 0,
    position: "absolute",
    width: "100%",
    height: "80%",
  },

  mainContainer: {
    height: "100%",
    paddingTop: paddings._32px,
    paddingHorizontal: paddings._16px,
  },

  // CLOSE
  closeIconContainer: {
    position: "absolute",
    top: "2%",
    right: "3%",
  },

  title: {
    paddingTop: paddings._21px,
    paddingBottom: paddings._16px,
  },

  // TYPE
  typesIconsContainer: {
    flexDirection: "row",
    alignContent: "space-between",
    alignSelf: "center",
  },
  typeIconWrapper: {
    borderWidth: 1.5,
    borderColor: "transparent",
    padding: paddings._8px,
  },

  // ICONS
  selectedIcon: {
    borderRadius: 50,
    borderColor: colors.transparentBlack5,
    borderWidth: 1.5,
    borderStyle: "dashed",
  },

  // AVATARS
  avatarsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  avatarIconWrapper: {
    padding: paddings._8px,
    marginHorizontal: 4,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  avatarIcon: {
    width: SCREEN_WIDTH / 10,
    height: SCREEN_WIDTH / 10,
  },

  // PREVIEW
  previewImageContainer: {
    alignItems: "center",
  },
  previewImage: {
    width: SCREEN_WIDTH / 3,
    height: SCREEN_WIDTH / 3,
  },

  // SAVE
  saveButtonContainer: {
    paddingVertical: paddings._24px,
  },
  saveButton: {
    justifyContent: "center",
    borderRadius: 12,
    paddingVertical: 18,
  },

  loaderContainer: {
    position: "absolute",
    bottom: "3%",
    left: "50%",
  },

  // DIVIDER
  divider: {
    borderTopWidth: 0.8,
    borderStyle: "dashed",
    borderTopColor: colors.transparentBlack7,
    marginTop: 12,
  },
});

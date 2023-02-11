// Outer imports:
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Image,
  GestureResponderEvent,
} from "react-native";
import Modal from "react-native-modal";

// Inner imports:
import { colors } from "../../../constants/colors";
import { paddings } from "../../../constants/paddings";
import {
  ANIMAL_AVATARS,
  AVATAR_TYPES,
  FEMALE_AVATARS,
  MALE_AVATARS,
} from "../../../constants/dataArrays";
import CloseIcon from "../../../assets/icons/svg/closeIcon";

// Components:
import BoldText from "../../../components/text/BoldText";

// Types:
import { Avatar } from "../../../models/avatar";

// Redux:
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { setModalVisibility, setSelectedAvatar } from "../state/profileSlice";
import ActionButton from "../../../components/Buttons/ActionButton";

enum AvatarType {
  female = 1,
  male,
  undefined,
}

const AvatarSelectionModal = () => {
  const dispatch = useAppDispatch();
  const modalVisibility = useAppSelector(
    (state) => state.profile.isModalVisible
  );
  const [selectedType, setSelectedType] = useState<AvatarType>(
    AvatarType.undefined
  );
  const selectedAvatar = useAppSelector(
    (state) => state.profile.selectedAvatar
  );

  const renderAvatarTypeSelection = () => {
    return (
      <>
        <View style={styles.title}>
          <BoldText
            children="Choose your avatar type: "
            color={colors.darkGreen}
            size={24}
            lineHeight={24}
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
            children="Choose your avatar:"
            color={colors.darkGreen}
            size={24}
            lineHeight={24}
            textAlign={"left"}
          />
        </View>
        {renderAvatars(arr)}
      </>
    );
  };

  const renderAvatars = (iconsArr: Avatar[]) => {
    return (
      <View style={styles.avatarsContainer}>
        {iconsArr.map((avatar) => {
          return (
            <Pressable
              onPress={() => dispatch(setSelectedAvatar(avatar.icon))}
              style={[
                styles.avatarIconWrapper,
                selectedAvatar === avatar.icon ? styles.selectedIcon : null,
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
            children="Preview:"
            color={colors.darkGreen}
            size={24}
            lineHeight={24}
            textAlign={"left"}
          />
        </View>
        <View style={styles.previewImageContainer}>
          <Image source={selectedAvatar} style={styles.previewImage} />
        </View>
      </>
    );
  };

  const renderSaveButton = () => {
    return (
      <>
        <ActionButton
          buttonText={"Save Avatar"}
          buttonTextColor={colors.white}
          buttonTextSize={16}
          buttonContainerStyle={styles.saveButtonContainer}
          buttonColors={[colors.lightGreen1, colors.lightGreen1]}
          onPress={() => {
            console.log("save");
          }}
        />
      </>
    );
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
    height: "95%",
  },

  mainContainer: {
    height: "100%",
    paddingTop: paddings._42px,
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
    width: 50,
    height: 50,
  },

  // PREVIEW
  previewImageContainer: {
    alignItems: "center",
  },
  previewImage: {
    width: 150,
    height: 150,
  },

  // SAVE
  saveButtonContainer: {
    height: 45,
    justifyContent: "center",
    borderRadius: 12,
    marginVertical: paddings._16px,
  },
});

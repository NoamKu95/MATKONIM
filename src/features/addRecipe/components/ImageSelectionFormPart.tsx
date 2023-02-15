// Outer imports:
import React from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import i18n from "../../../translations/i18n";

// Inner imports:
import { colors } from "../../../constants/colors";
import { icons } from "../../../constants/icons";
import { paddings } from "../../../constants/paddings";

// Redux:
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { openDeviceGallery } from "../state/addRecipeActions";

interface BasicInfoProps {
  renderTitlesOfSection: (
    title: string,
    subtitle: string | null
  ) => JSX.Element;
  renderWarningTextPlaceholder: Function;
}

const ImageSelectionFormPart = ({
  renderTitlesOfSection,
  renderWarningTextPlaceholder,
}: BasicInfoProps) => {
  const dispatch = useAppDispatch();
  const imageUri = useAppSelector((state) => state.addRecipe.recipeImageUri);
  const recipeImageWarning = useAppSelector(
    (state) => state.addRecipe.recipeImageWarning
  );

  return (
    <View style={styles().gallerySectionContainer}>
      {renderTitlesOfSection(
        i18n.t("addRecipe.recipeImageTitle"),
        i18n.t("addRecipe.recipeImageSubTitle")
      )}
      <Pressable
        style={styles(imageUri !== null).galleryIconWrapper}
        onPress={() => dispatch(openDeviceGallery())}
      >
        <Image
          source={imageUri !== null ? icons.checkmarkGreen : icons.gallery}
          resizeMethod={"resize"}
          style={styles(imageUri !== null).galleryIcon}
        />
      </Pressable>
      <View style={styles().warningContainer}>
        {renderWarningTextPlaceholder(recipeImageWarning, "center")}
      </View>
    </View>
  );
};

export default ImageSelectionFormPart;

const styles = (imageSelected?: boolean) =>
  StyleSheet.create({
    gallerySectionContainer: {
      paddingTop: paddings._12px,
    },
    galleryIconWrapper: {
      alignSelf: "center",
      borderWidth: 1,
      borderStyle: "dashed",
      borderRadius: 50,
      padding: paddings._16px,
      marginTop: 8,
      borderColor: imageSelected ? colors.darkGreen : colors.transparentBlack5,
    },
    galleryIcon: {
      width: 45,
      height: 45,
      opacity: imageSelected ? 1 : 0.3,
    },
    warningContainer: {
      paddingTop: paddings._12px,
    },
  });

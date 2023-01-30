// Outer imports:
import React from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import i18n from "../../../translations/i18n";

// Inner imports:
import { colors } from "../../../constants/colors";
import { icons } from "../../../constants/icons";

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
    <View style={styles.gallerySectionContainer}>
      {renderTitlesOfSection(
        i18n.t("addRecipe.recipeImageTitle"),
        i18n.t("addRecipe.recipeImageSubTitle")
      )}
      <Pressable
        style={[
          styles.galleryIconWrapper,
          {
            borderColor:
              imageUri !== null ? colors.darkGreen : colors.transparentBlack5,
          },
        ]}
        onPress={() => dispatch(openDeviceGallery())}
      >
        <Image
          source={imageUri !== null ? icons.checkmarkGreen : icons.gallery}
          resizeMethod={"resize"}
          style={[styles.galleryIcon, { opacity: imageUri !== null ? 1 : 0.3 }]}
        />
      </Pressable>
      {renderWarningTextPlaceholder(recipeImageWarning, "center")}
    </View>
  );
};

export default ImageSelectionFormPart;

const styles = StyleSheet.create({
  gallerySectionContainer: {
    paddingTop: 12,
  },
  galleryIconWrapper: {
    alignSelf: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 50,
    padding: 15,
    marginTop: 8,
    marginBottom: 12,
  },
  galleryIcon: {
    width: 45,
    height: 45,
  },
});

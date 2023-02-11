// Outer imports:
import React, { useEffect, useState } from "react";
import { TextInput, StyleSheet, View, Pressable, Image } from "react-native";
import i18n from "../../../translations/i18n";

// Inner imports:
import { icons } from "../../../constants/icons";
import { colors } from "../../../constants/colors";
import { paddings } from "../../../constants/paddings";
import { HE } from "../../../models/translations";

interface Props {
  valueText?: string | null;
  placeHolderText: string;
  searchHandler: (text: string) => void;
  isAutoSearch?: boolean;
}

const Searchbar = ({
  valueText = null,
  placeHolderText,
  searchHandler,
  isAutoSearch = true,
}: Props) => {
  const [text, setText] = useState(valueText ?? "");
  let isTextEmpty = text === null || text === "";

  useEffect(() => {
    if (isAutoSearch) {
      const delayDebounceFn = setTimeout(() => {
        if (!isTextEmpty) {
          searchHandler(text);
        }
      }, 1000);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [text]);

  const iconPressed = () => {
    if (!isAutoSearch) {
      searchHandler(text);
    } else if (!isTextEmpty) {
      setText("");
      searchHandler(""); // immediately reset the search results
    }
  };

  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.textInput}
        onChangeText={(newTxt) => setText(newTxt)}
        value={text}
        placeholder={placeHolderText}
        placeholderTextColor={colors.transparentBlack5}
        maxLength={25}
      />
      <Pressable onPress={iconPressed} style={styles.iconWrapper}>
        <Image
          source={
            !isAutoSearch
              ? icons.search
              : isTextEmpty
              ? icons.search
              : icons.close
          }
          style={styles.icon}
        />
      </Pressable>
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
  },
  textInput: {
    paddingHorizontal: paddings._24px,
    paddingVertical: paddings._8px,

    textAlign: i18n.locale === HE ? "right" : "left",
    color: colors.black,
    width: "100%",
  },
  iconWrapper: {
    position: "absolute",
    right: "5%",
    top: "30%",
  },
  icon: {
    height: 20,
    width: 20,
    opacity: 0.5,
  },
});

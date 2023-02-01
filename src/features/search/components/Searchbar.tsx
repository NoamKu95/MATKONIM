// Outer imports:
import React, { useEffect } from "react";
import { TextInput, StyleSheet, View, Pressable, Image } from "react-native";
import i18n from "../../../translations/i18n";

// Inner imports:
import { icons } from "../../../constants/icons";
import { colors } from "../../../constants/colors";
import { paddings } from "../../../constants/paddings";
import { HE } from "../../../models/translations";

// Redux:
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { updateSearchPhrase } from "../state/searchActions";

interface Props {
  placeHolderText: string;
  searchHandler: (text: string) => void;
}

const Searchbar = ({ placeHolderText, searchHandler }: Props) => {
  const dispatch = useAppDispatch();

  const searchText = useAppSelector((state) => state.search.searchPhrase);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchText != null) {
        searchHandler(searchText);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const changeSearchText = (newTxt: string) => {
    dispatch(updateSearchPhrase(newTxt));
  };

  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.textInput}
        onChangeText={(newTxt) => dispatch(updateSearchPhrase(newTxt))}
        value={searchText}
        placeholder={placeHolderText}
        placeholderTextColor={colors.transparentBlack5}
        maxLength={25}
      />
      <Pressable
        onPress={() => searchHandler(searchText ?? "")}
        style={styles.iconWrapper}
      >
        <Image source={icons.search} style={styles.icon} />
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

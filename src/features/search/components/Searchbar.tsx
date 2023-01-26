import React, { useEffect } from "react";
import { TextInput, StyleSheet, View, Pressable, Image } from "react-native";
import { updateSearchPhrase } from "../state/searchActions";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import i18n from "../../../translations/i18n";
import { icons } from "../../../constants/icons";
import { colors } from "../../../constants/colors";

const isHebrew = i18n.locale === "he" || i18n.locale === "he-IL" ? true : false;

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
        onChangeText={(newTxt) => changeSearchText(newTxt)}
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
    marginTop: 24,
  },
  textInput: {
    paddingHorizontal: 24,
    paddingVertical: 8,

    textAlign: isHebrew ? "right" : "left",
    color: colors.black,
    width: "100%",
  },
  searchBarImage: {
    width: 20,
    height: 20,
    alignSelf: "center",
  },
  iconWrapper: {
    position: "absolute",
    right: "5%",
    top: "25%",
  },
  icon: {
    height: 20,
    width: 20,
    opacity: 0.5,
  },
});

// Outer imports:
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  SafeAreaView,
} from "react-native";
import i18n from "../../translations/i18n";

// Redux:
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  getRecipesFromServer,
  updateSearchPhrase,
  updateSearchResults,
} from "./state/searchActions";
import { setCategoryFilter } from "./state/searchSlice";

// Types:
import { Recipe } from "../../models/recipe";

// Inner imports:
import { colors } from "../../constants/colors";
import { icons } from "../../constants/icons";
import { paddings } from "../../constants/paddings";
import { navigate } from "../../navigation/RootNavigation";
import { CATEGORIES } from "../../models/category";
import { HE } from "../../models/translations";

// Components:
import RegularText from "../../components/text/RegularText";
import BoldText from "../../components/text/BoldText";
import Loader from "../../components/Loader";
import Chip from "../../components/Chip";
import Searchbar from "./components/Searchbar";
import SearchCard from "../../components/Cards/SearchCard";
import { setSelectedRecipe } from "../recipe/state/recipeSlice";
import { SCREEN_HEIGHT } from "../../constants/sizes";

const RecipesSearch = () => {
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector((state) => state.home.isFetching);
  const filteredRecipes = useAppSelector(
    (state) => state.search.filteredRecipes
  );
  const searchCategories = useAppSelector(
    (state) => state.search.searchCategories
  );
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Keyboard listener
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // (1)
  useEffect(() => {
    filterRecipesBasedOnSearchFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fires on :
  // (1) Page load  //  (2) One sec after user stops typing  //  (3) On chip press
  const filterRecipesBasedOnSearchFilters = () => {
    dispatch(updateSearchResults());
  };

  const renderHeader = () => {
    return (
      <View style={styles.titlesWrapper}>
        <View style={styles.mainTitle}>
          <BoldText
            children={i18n.t("search.mainTitle")}
            size={24}
            color={colors.black}
            textAlign="center"
            lineHeight={24}
          />
        </View>
        <RegularText
          children={i18n.t("search.secondaryTitle")}
          size={14}
          color={colors.darkLime}
          textAlign="center"
        />
      </View>
    );
  };

  // (2)
  const renderSearchbar = () => {
    return (
      <View style={styles.searchbarContainer}>
        <Searchbar
          placeHolderText={i18n.t("search.searchPlaceholder")}
          searchHandler={(newText) => {
            dispatch(updateSearchPhrase(newText));
            filterRecipesBasedOnSearchFilters();
          }}
        />
      </View>
    );
  };

  const renderCategories = () => {
    return (
      <View style={styles.chipsContainer}>
        {CATEGORIES.map((category) => {
          return (
            <Chip
              key={category.id}
              text={i18n.locale === HE ? category.name : category.englishName}
              textSize={12}
              onPress={() => {
                updateCategoryChip(category.name);
              }}
              isSelected={searchCategories.includes(category.name)}
              bgColor={colors.lightGreen}
              selectedBgColor={colors.darkLime}
            />
          );
        })}
      </View>
    );
  };

  // (3)
  const updateCategoryChip = (chipName: string) => {
    if (searchCategories.includes(chipName)) {
      dispatch(
        setCategoryFilter(
          searchCategories.filter((category) => category != chipName)
        )
      );
    } else {
      dispatch(setCategoryFilter([...searchCategories, chipName]));
    }
    filterRecipesBasedOnSearchFilters();
  };

  const renderSearchResultsList = () => {
    return (
      <View style={styles.listWrapper}>
        <FlatList
          data={filteredRecipes}
          keyExtractor={(item: Recipe) => `${item.id}`}
          renderItem={renderRecipeCard}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.list}
        />
      </View>
    );
  };

  const renderRecipeCard = ({ item }: { item: Recipe }) => {
    return (
      <View style={styles.searchCardContainer}>
        <SearchCard
          recipe={item}
          onPress={() => {
            dispatch(setSelectedRecipe(item));
            navigate("Recipe");
          }}
        />
      </View>
    );
  };

  const renderNoResults = () => {
    return isKeyboardVisible ? (
      <></>
    ) : (
      <View style={styles.noResultsContainer}>
        <Image
          source={icons.no_results}
          resizeMethod={"resize"}
          style={styles.icon}
        />
        <View style={styles.noResultsTextContainer}>
          <BoldText
            children={i18n.t("search.noResults")}
            size={20}
            color={colors.darkLime}
            textAlign="center"
            lineHeight={32}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {renderHeader()}
      {renderSearchbar()}
      {renderCategories()}
      {isFetching ? (
        <View style={styles.loaderContainer}>
          <Loader text={i18n.t("search.loadingText")} />
        </View>
      ) : filteredRecipes.length === 0 ? (
        renderNoResults()
      ) : (
        renderSearchResultsList()
      )}
    </SafeAreaView>
  );
};

export default RecipesSearch;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.white,
    height: SCREEN_HEIGHT,
    flex: 1,
  },

  // HEADER
  titlesWrapper: {
    alignItems: "center",
    paddingTop: paddings._24px,
    paddingBottom: paddings._16px,
  },
  mainTitle: {
    paddingBottom: paddings._8px,
  },

  // SEARCHBAR
  searchbarContainer: {
    paddingHorizontal: paddings._8px,
  },

  // CATEGORIES
  chipsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingHorizontal: paddings._8px,
    paddingVertical: paddings._8px,
  },

  // LOADER
  loaderContainer: {
    position: "absolute",
    top: SCREEN_HEIGHT / 2,
    alignSelf: "center",
    alignItems: "center",
  },

  // RECIPES LIST
  listWrapper: {
    paddingTop: paddings._24px,
    height: SCREEN_HEIGHT * 0.6 - 70,
  },
  list: {
    // paddingBottom: 70,
  },

  searchCardContainer: { paddingHorizontal: paddings._8px },

  // NO RESULTS
  noResultsContainer: {
    position: "absolute",
    top: SCREEN_HEIGHT / 2.5,
    alignSelf: "center",
    alignItems: "center",
  },
  icon: {
    width: 70,
    height: 70,
    opacity: 0.7,
    transform: i18n.locale === HE ? [{ scaleX: -1 }] : [{ scaleX: 1 }],
  },
  noResultsTextContainer: { paddingVertical: paddings._12px },
});

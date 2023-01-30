// Outer imports:
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  Image,
  Keyboard,
} from "react-native";
import i18n from "../../translations/i18n";

// Redux:
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  getRecipesFromServer,
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

const RecipesSearch = () => {
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector((state) => state.home.isFetching);
  const searchCategory = useAppSelector((state) => state.search.searchCategory);
  const filteredRecipes = useAppSelector(
    (state) => state.search.filteredRecipes
  );
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    filterRecipesBasedOnSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // MARK: Helper Functions

  // Fires on :
  // (1) Page load  //  (2) One sec after user stops typing  //  (3) On search icon press  //  (4) On chip press
  const filterRecipesBasedOnSearch = () => {
    dispatch(updateSearchResults());
  };

  const updateCategoryChip = (chipName: string) => {
    if (chipName === searchCategory) {
      dispatch(setCategoryFilter(null));
    } else {
      dispatch(setCategoryFilter(chipName));
    }
    filterRecipesBasedOnSearch();
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

  const renderSearchbar = () => {
    return (
      <View style={styles.searchbarContainer}>
        <Searchbar
          placeHolderText={i18n.t("search.searchPlaceholder")}
          searchHandler={filterRecipesBasedOnSearch}
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
              isSelected={category.name === searchCategory}
              bgColor={colors.lightGreen}
              selectedBgColor={colors.darkLime}
            />
          );
        })}
      </View>
    );
  };

  const renderSearchResultsList = () => {
    return (
      <View style={styles.listWrapper}>
        <FlatList
          data={[]}
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
      <SearchCard
        recipe={item}
        onPress={() => {
          dispatch(setSelectedRecipe(item));
          navigate("Recipe");
        }}
      />
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
        <BoldText
          children={i18n.t("search.noResults")}
          size={20}
          color={colors.darkLime}
          textAlign="center"
          lineHeight={32}
        />
      </View>
    );
  };

  return (
    <View style={styles.safeArea}>
      {renderHeader()}
      {renderSearchbar()}
      {renderCategories()}
      {isFetching ? (
        <Loader text={i18n.t("search.loadingText")} />
      ) : filteredRecipes.length !== 0 ? (
        renderSearchResultsList()
      ) : (
        renderNoResults()
      )}
    </View>
  );
};

export default RecipesSearch;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
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

  // RECIPES LIST
  listWrapper: {
    paddingVertical: paddings._24px,
    paddingBottom:
      i18n.locale === HE
        ? Dimensions.get("window").height * 0.32
        : Dimensions.get("window").height * 0.35,
  },
  list: {
    height: "81.5%",
  },

  // NO RESULTS
  noResultsContainer: {
    position: "absolute",
    top: "55%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    height: 150,
  },
  icon: {
    width: 70,
    height: 70,
    opacity: 0.7,
    transform: i18n.locale === HE ? [{ scaleX: -1 }] : [{ scaleX: 1 }],
  },
});

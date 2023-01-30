// Outer imports:
import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import i18n from "../../translations/i18n";

// Redux:
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getRecipesForHomepage } from "./state/homeActions";
import { setSelectedRecipe } from "../recipe/state/recipeSlice";

// Inner imports:
import { colors } from "../../constants/colors";
import { navigate } from "../../navigation/RootNavigation";

// Types:
import { Recipe } from "../../models/recipe";
import { CategoryCards } from "../../models/category";

// Components:
import BoldText from "../../components/text/BoldText";
import Callout from "../../components/Callout";
import Searchbar from "../search/components/Searchbar";
import RecipeCard from "../../components/Cards/RecipeCard";
import CategoryCard from "../../components/Cards/CategoryCard";
import { setCategoryFilter } from "../search/state/searchSlice";

const Home = () => {
  const dispatch = useAppDispatch();

  const recipes = useAppSelector((state) => state.home.recipes);

  useEffect(() => {
    dispatch(getRecipesForHomepage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // MARK: Render Functions

  const renderSearchBar = () => {
    return (
      <Searchbar
        placeHolderText={i18n.t("homepage.search")}
        searchHandler={() => {}} // TODO: add handler
      />
    );
  };

  const renderCallout = () => {
    return (
      <View style={styles.calloutWrapper}>
        <Callout
          mainText={i18n.t("homepage.callout.mainText")}
          buttonText={i18n.t("homepage.callout.pressableText")}
          onPress={() => {
            navigate("Search");
          }}
        />
      </View>
    );
  };

  const renderRecentlyAddedSection = () => {
    return (
      <>
        <View style={styles.recentlyAddedTitleContainer}>
          <BoldText
            children={i18n.t("homepage.recentlyAddedTitle")}
            color={colors.black}
            size={16}
            textAlign="left"
            letterSpacing={1}
          />
        </View>
        <FlatList
          data={recipes}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item: Recipe) => `${item.name}`}
          renderItem={renderRecipeCard}
        />
      </>
    );
  };

  const renderRecipeCard = (row: { item: Recipe; index: number }) => {
    return (
      <RecipeCard
        recipe={row.item}
        isLastIndex={row.index === recipes.length - 1}
        onPress={() => {
          dispatch(setSelectedRecipe(row.item));
          navigate("Recipe");
        }}
      />
    );
  };

  const renderCategoriesSquares = () => {
    return (
      <View style={styles.categoriesWrapper}>
        <View style={styles.categoriesTitle}>
          <BoldText
            children={i18n.t("homepage.categories")}
            color={colors.black}
            size={16}
            textAlign="left"
            letterSpacing={1}
          />
        </View>
        {CategoryCards.map((row) => {
          return (
            <View style={styles.categoryRowContainer}>
              {row.map((category) => {
                return (
                  <CategoryCard
                    category={category}
                    image={category.image}
                    width={category.isWideImage ? "49%" : "24%"}
                    onPress={() => {
                      dispatch(setCategoryFilter(category.name));
                      navigate("Search");
                    }}
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView nestedScrollEnabled={true}>
        {renderSearchBar()}
        {renderCallout()}
        {recipes.length > 0 && renderRecentlyAddedSection()}
        {renderCategoriesSquares()}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  // SEARCHBAR
  searchBarContainer: {
    flexDirection: "row-reverse",
    height: 50,
    marginHorizontal: 8,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: colors.lightGray,
  },
  searchBarImage: {
    width: 20,
    height: 20,
    alignSelf: "center",
  },
  searchBarText: {
    marginLeft: 24,
  },

  //CALLOUT
  calloutWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },

  // RECENTLY ADDED
  recentlyAddedTitleContainer: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  recentlyAddedTitle: {
    marginHorizontal: 8,
    color: "black",
  },

  // CATEGORIES
  categoriesHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 8,
  },
  categoriesWrapper: {
    paddingHorizontal: 8,
  },
  categoriesTitle: {
    paddingVertical: 16,
  },
  categoryRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

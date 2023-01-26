// Outer imports:
import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, ScrollView } from "react-native";
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
import { CATEGORIES } from "../../models/category";

// Components:
import BoldText from "../../components/text/BoldText";
import Callout from "../../components/Callout";
import Searchbar from "../search/components/Searchbar";
import RecipeCard from "../../components/Cards/RecipeCard";
import CategoryCard from "../../components/Cards/CategoryCard";
import { setCategoryFilter } from "../search/state/searchSlice";
import { paddings } from "../../constants/paddings";
import { HE } from "../../models/translations";

const Home = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.auth.language);
  const recipes = useAppSelector((state) => state.home.recipes);

  useEffect(() => {
    dispatch(getRecipesForHomepage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSearchBar = () => {
    return (
      <View style={styles.searchbarContainer}>
        <Searchbar
          placeHolderText={i18n.t("homepage.search")}
          searchHandler={() => {}} // TODO: add handler
        />
      </View>
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
        <View style={styles.titleContainer}>
          <BoldText
            children={i18n.t("homepage.recentlyAddedTitle")}
            color={colors.black}
            size={16}
            textAlign={language === HE ? "left" : "right"}
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
        key={row.item.id}
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
        <View style={styles.titleContainer}>
          <BoldText
            children={i18n.t("homepage.categories")}
            color={colors.black}
            size={16}
            textAlign={language === HE ? "left" : "right"}
            letterSpacing={1}
          />
        </View>
        {CATEGORIES.map((row) => {
          return (
            <View style={styles.categoryRowContainer} key={row[0].id}>
              {row.map((category) => {
                return (
                  <CategoryCard
                    key={category.id}
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
    width: "100%",
    height: "100%",
  },

  // SEARCHBAR
  searchbarContainer: {
    paddingHorizontal: paddings._12px,
  },

  // TITLES
  titleContainer: {
    paddingHorizontal: paddings._12px,
    paddingVertical: paddings._16px,
  },

  //CALLOUT
  calloutWrapper: {
    padding: paddings._12px,
  },

  // CATEGORIES
  categoriesWrapper: {
    paddingHorizontal: paddings._12px,
  },
  categoryRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

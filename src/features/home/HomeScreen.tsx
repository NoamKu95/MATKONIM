// Outer imports:
import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import i18n from "../../translations/i18n";

// Redux:
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getRecipesForHomepage } from "./state/homeActions";
import { setSelectedRecipe } from "../recipe/state/recipeSlice";
import { setCategoryFilter } from "../search/state/searchSlice";

// Inner imports:
import { colors } from "../../constants/colors";
import { paddings } from "../../constants/paddings";
import { icons } from "../../constants/icons";
import { HE } from "../../models/translations";
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
import {
  RECIPE_CARD_HEIGHT,
  RECIPE_CARD_WIDTH,
  SCREEN_WIDTH,
} from "../../constants/sizes";
import Loader from "../../components/Loader";
import RegularText from "../../components/text/RegularText";
import { updateSearchPhrase } from "../search/state/searchActions";

const Home = () => {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector((state) => state.home.recipes);
  const isLoading = useAppSelector((state) => state.home.isFetching);

  useEffect(() => {
    dispatch(getRecipesForHomepage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSearchBar = () => {
    return (
      <View style={styles.searchbarContainer}>
        <Searchbar
          placeHolderText={i18n.t("homepage.search")}
          searchHandler={(newText) => {
            dispatch(updateSearchPhrase(newText));
            navigate("Search");
          }}
          isAutoSearch={false}
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
            navigate("Search"); // TODO: Search shouldn't appear in RootStackParamList
          }}
        />
      </View>
    );
  };

  const renderSectionTitle = (text: string) => {
    return (
      <View style={styles.titleContainer}>
        <BoldText
          children={text}
          color={colors.black}
          size={16}
          textAlign={"left"}
          letterSpacing={1}
        />
      </View>
    );
  };

  const renderRecentlyAddedSection = () => {
    return (
      <>
        {renderSectionTitle(i18n.t("homepage.recentlyAddedTitle"))}
        {isLoading ? (
          <View style={styles.loaderWrapper}>
            <Loader />
          </View>
        ) : recipes.length === 0 ? (
          renderNoAddedRecipes()
        ) : (
          renderAddedRecipesList()
        )}
      </>
    );
  };

  const renderNoAddedRecipes = () => {
    return (
      <View style={styles.addRecipeMainContainer}>
        <RegularText
          children={i18n.t("homepage.noAddedRecipes")}
          color={colors.black}
          size={16}
          lineHeight={24}
        />
        <TouchableOpacity
          onPress={() => {
            // TODO: make it navigate to add recipe page
          }}
          style={styles.addRecipeWrapper}
        >
          <View style={styles.addRecipeTextContainer}>
            <BoldText
              children={i18n.t("homepage.addRecipeText")}
              color={colors.darkLime}
              size={16}
              lineHeight={16}
            />
          </View>
          <Image source={icons.plus} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderAddedRecipesList = () => {
    return (
      <FlatList
        keyExtractor={(item: Recipe) => `${item.id}`}
        data={recipes}
        horizontal
        snapToInterval={RECIPE_CARD_WIDTH}
        snapToAlignment={i18n.locale === HE ? "start" : "end"}
        decelerationRate="fast"
        // inverted={i18n.locale === HE}
        showsHorizontalScrollIndicator={false}
        renderItem={renderRecipeCard}
        scrollEnabled={recipes.length * RECIPE_CARD_WIDTH > SCREEN_WIDTH}
      />
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
      <>
        {renderSectionTitle(i18n.t("homepage.categories"))}
        <View style={styles.categoriesWrapper}>
          {CategoryCards.map((row, index) => {
            return (
              <View style={styles.categoryRowContainer} key={index}>
                {row.map((category) => {
                  return (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      image={category.image}
                      width={category.isWideImage ? "49%" : "24%"}
                      onPress={() => {
                        dispatch(setCategoryFilter([category.name]));
                        navigate("Search");
                      }}
                    />
                  );
                })}
              </View>
            );
          })}
        </View>
      </>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView nestedScrollEnabled={true}>
        {renderSearchBar()}
        {renderCallout()}
        {renderRecentlyAddedSection()}
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
    paddingHorizontal: paddings._8px,
    paddingTop: paddings._12px,
  },

  // TITLES
  titleContainer: {
    paddingVertical: paddings._16px,
    paddingTop: paddings._24px,
    paddingHorizontal: paddings._8px,
  },

  //CALLOUT
  calloutWrapper: {
    paddingVertical: paddings._12px,
    paddingHorizontal: paddings._8px,
  },

  // RECENTLY ADDED
  loaderWrapper: {
    paddingTop: RECIPE_CARD_HEIGHT / 2.5,
  },

  // ADD RECIPE
  addRecipeMainContainer: {
    padding: paddings._24px,
    paddingBottom: paddings._4px,
  },
  addRecipeWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: paddings._12px,
  },
  addRecipeTextContainer: {
    paddingHorizontal: paddings._8px,
  },
  icon: {
    width: 10,
    height: 10,
    tintColor: colors.darkLime,
  },

  // CATEGORIES
  categoriesWrapper: {
    paddingHorizontal: paddings._8px,
  },
  categoryRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

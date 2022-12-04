// import myRecipes from '../../../constants/myRecipes';
import {
  fetchRecipesOfUser,
  queryFirestore,
} from '../../../managers/firestoreManager';
import {Recipe} from '../../../models/recipe';
import {collections} from '../../../models/types';
import {AppThunk} from '../../../store/store';
import {getCurrentUserID} from '../../auth/state/authActions';
import {
  setFilteredRecipes,
  setIsFetching,
  setSearchPhrase,
} from './searchSlice';

export const getRecipesFromServer =
  (): AppThunk => async (dispatch, getState) => {
    try {
      dispatch(setIsFetching(true));

      // send GET request to server
      //   const partners = await returnPartnersRepo(userId); // TODO: get recipes from firebase
      const myData: Recipe[] = []; //myRecipes.trendingRecipes;

      // TODO: check if there is a filter to apply

      // dispatch the received data
      dispatch(setFilteredRecipes(myData));
      dispatch(setIsFetching(false));
    } catch (error) {
      console.log(error); // TODO: Error Handling
      dispatch(setIsFetching(false));
    }
  };

export const updateSearchPhrase =
  (searchWords: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setSearchPhrase(searchWords));
    } catch (error) {
      console.log(error); // TODO: Error Handling
    }
  };

export const updateSearchResults =
  (): AppThunk => async (dispatch, getState) => {
    const searchText: string | null = getState().search.searchPhrase;
    const categoryFilter: string | null = getState().search.searchCategory;
    const userCollectionPath = `${collections.USERS}/${getCurrentUserID()}/${
      collections.RECIPES
    }`;

    if ((searchText === null || searchText === '') && categoryFilter === null) {
      fetchRecipesOfUser(userCollectionPath);
    } else {
      let recipes = await queryFirestore(
        userCollectionPath,
        searchText,
        categoryFilter,
      );
      dispatch(setFilteredRecipes(recipes));
    }
  };

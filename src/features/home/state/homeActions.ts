import {setIsFetching, setRecipes} from './homeSlice';
import {AppThunk} from '../../../store/store';
import {Recipe} from '../../../models/recipe';
import {setFilteredRecipes} from '../../search/state/searchSlice';
import {fetchRecipesOfUser} from '../../../managers/firestoreManager';
import {getCurrentUserID} from '../../auth/state/authActions';
import {collections} from '../../../models/types';

export const getRecipesForHomepage =
  (): AppThunk => async (dispatch, getState) => {
    try {
      dispatch(setIsFetching(true));

      let x: Recipe[] = await fetchRecipesOfUser(
        `${collections.USERS}/${getCurrentUserID()}/${collections.RECIPES}`,
      );

      dispatch(setRecipes(x));
      dispatch(setFilteredRecipes(x));
    } catch (error) {
      console.log(error); // TODO: Error Handling
    } finally {
      dispatch(setIsFetching(false));
    }
  };

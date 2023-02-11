// Models:
import { icons } from "../../../constants/icons";
import { collections } from "../../../models/types";

// Redux:
import { AppThunk } from "../../../store/store";
import { setSelectedAvatar } from "./profileSlice";

export const getRecipesForHomepage =
  (): AppThunk => async (dispatch, getState) => {
    try {
      dispatch(setSelectedAvatar(icons.bat));
    } catch (err) {
      console.log(err); // TODO: Error Handing
    }
  };

// Models:
import { icons } from "../../../constants/icons";
import { updateUserAvatar } from "../../../managers/firestoreManager";
import { Avatar } from "../../../models/avatar";
import { collections } from "../../../models/types";

// Redux:
import { AppThunk } from "../../../store/store";
import { getCurrentUserID } from "../../auth/state/authActions";
import {
  setIsLoading,
  setModalVisibility,
  setSelectedAvatar,
} from "./profileSlice";

export const updateSavedUserAvatar =
  (newAvatar: Avatar): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true));
      await updateUserAvatar(
        collections.USERS,
        getCurrentUserID() ?? "",
        newAvatar.name
      );
      dispatch(setSelectedAvatar(newAvatar));
      dispatch(setModalVisibility(false));
    } catch (err) {
      console.log(err); // TODO: Error Handing
    } finally {
      dispatch(setIsLoading(false));
    }
  };

// Models:
import { icons } from "../../../constants/icons";
import { Avatar } from "../../../models/avatar";
import { collections } from "../../../models/types";

// Redux:
import { AppThunk } from "../../../store/store";
import { setSelectedAvatar } from "./profileSlice";

export const updateUserAvatar =
  (newAvatar: Avatar): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setSelectedAvatar(newAvatar.icon));
      // Update firestore
    } catch (err) {
      console.log(err); // TODO: Error Handing
    }
  };

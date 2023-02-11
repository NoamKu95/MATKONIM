import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native";
import { icons } from "../../../constants/icons";

export interface ProfileState {
  selectedAvatar: ImageSourcePropType;
}

const initialState: ProfileState = {
  selectedAvatar: icons.rabbit,
};

export const ProfileSlice = createSlice({
  name: "ProfileSlice",
  initialState,
  reducers: {
    setSelectedAvatar: (state, action: PayloadAction<ImageSourcePropType>) => {
      state.selectedAvatar = action.payload;
    },
  },
});

export const { setSelectedAvatar } = ProfileSlice.actions;

export default ProfileSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native";
import { icons } from "../../../constants/icons";

export interface ProfileState {
  selectedAvatar: ImageSourcePropType;
  isModalVisible: boolean;
}

const initialState: ProfileState = {
  selectedAvatar: icons.rabbit,
  isModalVisible: false,
};

export const ProfileSlice = createSlice({
  name: "ProfileSlice",
  initialState,
  reducers: {
    setModalVisibility: (state, action: PayloadAction<boolean>) => {
      state.isModalVisible = action.payload;
    },
    setSelectedAvatar: (state, action: PayloadAction<ImageSourcePropType>) => {
      state.selectedAvatar = action.payload;
    },
  },
});

export const { setModalVisibility, setSelectedAvatar } = ProfileSlice.actions;

export default ProfileSlice.reducer;

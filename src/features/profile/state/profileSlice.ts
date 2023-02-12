// Outer imports:
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Inner imports:
import { ANIMAL_AVATARS } from "../../../constants/dataArrays";
// Types:
import { Avatar } from "../../../models/avatar";

export interface ProfileState {
  selectedAvatar: Avatar;
  isModalVisible: boolean;
  isLoading: boolean;
}

const initialState: ProfileState = {
  selectedAvatar: ANIMAL_AVATARS[1],
  isModalVisible: false,
  isLoading: false,
};

export const ProfileSlice = createSlice({
  name: "ProfileSlice",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setModalVisibility: (state, action: PayloadAction<boolean>) => {
      state.isModalVisible = action.payload;
    },
    setSelectedAvatar: (state, action: PayloadAction<Avatar | undefined>) => {
      if (action.payload) {
        state.selectedAvatar = action.payload;
      }
    },
  },
});

export const { setIsLoading, setModalVisibility, setSelectedAvatar } =
  ProfileSlice.actions;

export default ProfileSlice.reducer;

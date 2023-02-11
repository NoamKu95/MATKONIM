import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { icons } from "../../../constants/icons";
import { Avatar } from "../../../models/avatar";

export interface ProfileState {
  selectedAvatar: Avatar;
  isModalVisible: boolean;
  isLoading: boolean;
}

const initialState: ProfileState = {
  selectedAvatar: { id: 4, name: "snake", icon: icons.snake },
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
    setSelectedAvatar: (state, action: PayloadAction<Avatar>) => {
      state.selectedAvatar = action.payload;
    },
  },
});

export const { setIsLoading, setModalVisibility, setSelectedAvatar } =
  ProfileSlice.actions;

export default ProfileSlice.reducer;

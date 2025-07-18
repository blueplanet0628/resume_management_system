import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Profile = {
  id: number;
  profile: string;
};

interface ProfileState {
  data: Profile | null; // now just one skill object, or null initially
}

const initialState: ProfileState = {
  data: null,
};

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.data = action.payload;
    },
    clearProfile: (state) => {
      state.data = null;
    },
  },
});

export const { setProfile, clearProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;

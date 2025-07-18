import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Experience = {
  id: number;
  company: string;
  periodFrom: string;
  periodTo: string;
  business: string;
  capital: string;
  teamSize: string;
  tasks: string;
};

interface ExperienceState {
  data: Experience[];
}

const initialState: ExperienceState = {
  data: [],
};

export const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {
    setExperiences: (state, action: PayloadAction<Experience[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setExperiences } = experienceSlice.actions;
export default experienceSlice.reducer;

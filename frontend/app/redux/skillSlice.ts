import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Skill = {
  id: number;
  skill: string;
};

interface SkillState {
  data: Skill | null; // now just one skill object, or null initially
}

const initialState: SkillState = {
  data: null,
};

export const skillSlice = createSlice({
  name: 'skill',
  initialState,
  reducers: {
    setSkill: (state, action: PayloadAction<Skill>) => {
      state.data = action.payload;
    },
    clearSkill: (state) => {
      state.data = null;
    },
  },
});

export const { setSkill, clearSkill } = skillSlice.actions;
export default skillSlice.reducer;

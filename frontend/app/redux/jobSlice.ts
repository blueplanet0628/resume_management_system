import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Job = {
  id: number;
  job: string;
};

interface JobState {
  data: Job | null; // now just one skill object, or null initially
}

const initialState: JobState = {
  data: null,
};

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setJob: (state, action: PayloadAction<Job>) => {
      state.data = action.payload;
    },
    clearJob: (state) => {
      state.data = null;
    },
  },
});

export const { setJob, clearJob } = jobSlice.actions;
export default jobSlice.reducer;

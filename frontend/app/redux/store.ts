import { configureStore } from '@reduxjs/toolkit';
import experienceReducer from './experienceSlice';
import skillReducer from './skillSlice'
import profileReducer from './profileSlice';
import jobReducer from './jobSlice';

export const store = configureStore({
  reducer: {
    experience: experienceReducer,
    skill: skillReducer,
    profile: profileReducer,
    job: jobReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

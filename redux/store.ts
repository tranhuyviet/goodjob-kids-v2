import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import jobReducer from './slices/jobSlice';

export const store = configureStore({
	reducer: {
		auth: userReducer,
		job: jobReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

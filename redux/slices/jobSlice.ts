import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IJob } from '../../utils/types';

const initialState = {
	jobs: <IJob[]>[],
};

const jobSlice = createSlice({
	name: 'jobs',
	initialState,
	reducers: {
		setJobs: (state, action: PayloadAction<IJob[]>) => {
			if (state.jobs.length !== action.payload.length) {
				state.jobs = [...state.jobs, ...action.payload];
			}
		},
	},
});

export const { setJobs } = jobSlice.actions;
export default jobSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mongoose from 'mongoose';
import { calculateStars } from '../../utils/generate';
import { IJobDonePopulated, IUserWithJobsDone } from '../../utils/types';

type IUserPayload = {
	user: IUserWithJobsDone;
	token: string;
};

const initialState = {
	user: <IUserWithJobsDone>{
		_id: '',
		name: '',
		userName: '',
		totalStars: 0,
		jobsDone: [],
	},
	isLoggedin: false,
	totalStars: 0,
	token: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		signup: (state, action: PayloadAction<IUserPayload>) => {
			state.user = action.payload.user;
			state.isLoggedin = !!mongoose.Types.ObjectId.isValid(state.user._id);
			state.token = action.payload.token;
		},

		signout: state => {
			state.user = initialState.user;
			state.isLoggedin = false;
			state.totalStars = 0;
			state.token = '';
		},

		setJobsDone: (state, action: PayloadAction<IJobDonePopulated[]>) => {
			state.user.jobsDone = action.payload;
			state.totalStars = calculateStars(state.user.jobsDone);
		},

		addJobDone: (state, action: PayloadAction<IJobDonePopulated>) => {
			state.user.jobsDone = [...state.user.jobsDone, action.payload];
			state.totalStars = calculateStars(state.user.jobsDone);
		},
	},
});

export const { signup, signout, setJobsDone, addJobDone } = userSlice.actions;
export default userSlice.reducer;

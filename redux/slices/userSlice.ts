import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mongoose from 'mongoose';
import { IUserWithJobsDone } from '../../utils/types';

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
	},
});

export const { signup } = userSlice.actions;
export default userSlice.reducer;

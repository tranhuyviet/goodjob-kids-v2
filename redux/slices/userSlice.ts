import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mongoose from 'mongoose';
import { IUserWithJobsDone } from '../../utils/types';

const initialState = {
	user: <IUserWithJobsDone>{
		_id: '',
		name: '',
		userName: '',
		totalStars: 0,
		jobsDone: [],
	},
	isLoggedin: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		signup: (state, action: PayloadAction<IUserWithJobsDone>) => {
			state.user = action.payload;
			state.isLoggedin = !!mongoose.Types.ObjectId.isValid(state.user._id);
		},
	},
});

export const { signup } = userSlice.actions;
export default userSlice.reducer;

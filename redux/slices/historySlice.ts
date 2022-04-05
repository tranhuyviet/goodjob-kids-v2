import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IHistoryPopulated } from '../../utils/types';

const initialState = {
	histories: <IHistoryPopulated[]>[],
};

const historySlice = createSlice({
	name: 'histories',
	initialState,
	reducers: {
		setHistories: (state, action: PayloadAction<IHistoryPopulated[]>) => {
			if (state.histories.length !== action.payload.length) {
				state.histories = [...action.payload];
			}
		},

		addHistory: (state, action: PayloadAction<IHistoryPopulated>) => {
			state.histories = [...state.histories, action.payload];
		},
	},
});

export const { setHistories, addHistory } = historySlice.actions;
export default historySlice.reducer;

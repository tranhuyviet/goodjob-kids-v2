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

		updateComment: (state, action: PayloadAction<{ historyId: string; comment: string }>) => {
			state.histories = state.histories.map(history => {
				if (history._id.toString() === action.payload.historyId) {
					return { ...history, comment: action.payload.comment };
				}
				return history;
			});
		},
	},
});

export const { setHistories, addHistory, updateComment } = historySlice.actions;
export default historySlice.reducer;

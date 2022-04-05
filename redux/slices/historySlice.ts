import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IHistory, IJob } from '../../utils/types';

const initialState = {
	histories: <IHistory[]>[],
};

const historySlice = createSlice({
	name: 'histories',
	initialState,
	reducers: {
		setHistories: (state, action: PayloadAction<IHistory[]>) => {
			if (state.histories.length !== action.payload.length) {
				state.histories = [...state.histories, ...action.payload];
			}
		},
	},
});

export const { setHistories } = historySlice.actions;
export default historySlice.reducer;

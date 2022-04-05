import History from '../models/historyModel';
import { IHistoryDocument } from '../utils/types';

const create = async (history: IHistoryDocument): Promise<IHistoryDocument> => {
	return History.create(history);
};

const getHistoriesByUserId = async (userId: string): Promise<IHistoryDocument[]> => {
	return History.find({ userId });
};

const historyService = { create, getHistoriesByUserId };

export default historyService;

import History from '../models/historyModel';
import { IHistoryDocument } from '../utils/types';

const create = async (history: IHistoryDocument): Promise<IHistoryDocument> => {
	return History.create(history);
};

const historyService = { create };

export default historyService;

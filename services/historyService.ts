import History from '../models/historyModel';
import Job from '../models/jobModel';
import { IHistoryDocument } from '../utils/types';

const save = async (history: IHistoryDocument): Promise<IHistoryDocument> => {
	return history.save();
};

const getHistoriesByUserId = async (userId: string): Promise<IHistoryDocument[]> => {
	return History.find({ userId }).populate({
		path: 'jobsDone',
		populate: {
			path: 'jobId',
			model: Job,
			select: 'name image star',
		},
	});
};

const historyService = { save, getHistoriesByUserId };

export default historyService;

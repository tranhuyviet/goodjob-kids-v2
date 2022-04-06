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

const getHistoryById = async (historyId: string): Promise<IHistoryDocument | null> => {
	return History.findById(historyId);
};

const updateComment = async (
	historyId: string,
	comment: string,
): Promise<IHistoryDocument | null> => {
	return History.findByIdAndUpdate(historyId, { comment }, { new: true });
};

const historyService = { save, getHistoriesByUserId, getHistoryById, updateComment };

export default historyService;

import Job from '../models/jobModel';
import { IJobDocument } from '../utils/types';

const findJobByName = async (name: string): Promise<IJobDocument | null> => {
	return Job.findOne({ name });
};

const findJobById = async (jobId: string): Promise<IJobDocument | null> => {
	return Job.findById(jobId);
};

const getJobs = async (): Promise<IJobDocument[]> => {
	return Job.find();
};

const jobService = { findJobByName, findJobById, getJobs };

export default jobService;

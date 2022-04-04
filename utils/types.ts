export interface ErrorsObject {
	[name: string]: string;
}

// JOB
export interface IJob {
	_id?: string;
	name: string;
	image: string;
	star: number;
}

export interface IJobDone {
	_id?: string;
	jobId: string;
	time: string;
}

export interface IJobDonePopulated {
	_id: string;
	jobId: IJob;
	time: string;
}

export type IJobBody = Omit<IJob, '_id'>;
export type IJobDoneBody = Omit<IJobDone, '_id'>;

// USER
export interface IUser {
	_id: string;
	name: string;
	userName: string;
}

export interface IUserWithJobsDone extends IUser {
	jobsDone: IJobDonePopulated[];
}

export interface ISignupBody {
	name: string;
}

// HISTORY
export interface IHistory {
	_id: string;
	userId: string;
	jobsDone: IJobDone[];
	totalStars: number;
	timeGotStars: string;
	comment: string;
}

export type IHistoryBody = Omit<IHistory, '_id'>;

export type IHistoryPopulated = {
	_id: string;
	userId: string;
	jobsDone: IJobDonePopulated[];
	totalStars: number;
	timeGotStars: string;
	comment: string;
};

// DOCUMENT
export type IJobDocument = Document & IJobBody;

export type IUserDocument = Document &
	IUser & {
		jobsDone: IJobDone[];
		returnToken: () => string;
		populate: (populateObject: {}) => Promise<IUserDocument>;
	};

export type IHistoryDocument = Document & IHistoryBody;

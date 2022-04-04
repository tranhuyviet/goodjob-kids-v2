import mongoose from 'mongoose';

const { Schema, model, models, Types } = mongoose;

const historySchema = new Schema({
	userId: {
		type: Types.ObjectId,
		ref: 'users',
	},
	jobsDone: [
		{
			jobId: {
				type: Types.ObjectId,
				ref: 'jobs',
			},
			time: String,
		},
	],
	totalStars: Number,
	timeGotStars: String,
	comment: String,
});

const History = models.histories || model('histories', historySchema);

export default History;

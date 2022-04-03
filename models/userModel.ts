import mongoose from 'mongoose';
import { generateToken } from '../utils/generate';

const { Schema, model, models, Types } = mongoose;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	userName: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	totalStars: {
		type: Number,
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
});

// return token to client
userSchema.methods.returnToken = function returnToken() {
	return generateToken({
		_id: this._id,
		name: this.name,
		userName: this.userName,
		totalStars: this.totalStars,
	});
};

const User = models.users || model('users', userSchema);

export default User;

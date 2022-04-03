import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const jobSchema = new Schema({
	name: {
		type: String,
		unique: true,
		lowercase: true,
	},
	image: {
		type: String,
	},
	star: {
		type: Number,
		min: 1,
	},
});

const Job = models.jobs || model('jobs', jobSchema);

export default Job;

import User from '../models/userModel';
import { IUserDocument } from '../utils/types';

const create = async (user: IUserDocument): Promise<IUserDocument> => {
	return User.create(user);
};

const update = async (user: IUserDocument): Promise<IUserDocument | null> => {
	return User.findByIdAndUpdate(user._id, user, {
		new: true,
	});
};

const findUserByUserName = async (userName: string): Promise<IUserDocument | null> => {
	return User.findOne({ userName });
};

const findUserByUserId = async (_id: string): Promise<IUserDocument | null> => {
	return User.findById(_id);
};

const userService = { create, update, findUserByUserName, findUserByUserId };

export default userService;

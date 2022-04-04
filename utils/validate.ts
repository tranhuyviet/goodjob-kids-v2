import * as Yup from 'yup';

// USER
const name = Yup.string()
	.min(1, 'Name must be at least 1 characters!')
	.max(12, 'Name cannot be longer than 12 characters!')
	.required('Name cannot be empty!');

// HISTORY
const comment = Yup.string().max(500, 'Short comment cannot be longer than 500 characters!');

export const signupValidate = Yup.object({ name });
export const historyValidate = Yup.object({ comment });

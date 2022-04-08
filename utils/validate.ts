import * as Yup from 'yup';

// USER
const name = Yup.string()
	.min(1, 'Name must be at least 1 characters!')
	.max(12, 'Name cannot be longer than 12 characters!')
	.required('Name cannot be empty!');
const userName = Yup.string() // username
	.min(6, 'Invalid code format')
	.max(17, 'Invalid code format')
	.required(' ')
	.trim()
	.matches(/^\S(.{0,10}\w)?-\d{4}$/, 'Invalid code format');

// HISTORY
const comment = Yup.string().max(500, 'Short comment cannot be longer than 500 characters!');

export const signupValidate = Yup.object().shape({ name });
export const userNameValidate = Yup.object().shape({ userName });
export const historyValidate = Yup.object().shape({ comment });

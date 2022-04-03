import * as Yup from 'yup';

const name = Yup.string()
	.min(1, 'Name must be at least 1 characters!')
	.max(12, 'Name cannot be longer than 12 characters!')
	.required('Name cannot be empty!');

const signupValidate = Yup.object({ name });

export default signupValidate;

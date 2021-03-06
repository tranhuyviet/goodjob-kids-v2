module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				body: ['Chewy', 'cursive'],
			},
			backgroundColor: {
				button: '#6FC2CB',
			},
		},
	},
	// eslint-disable-next-line global-require
	plugins: [require('@tailwindcss/forms')],
};

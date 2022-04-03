import axios from 'axios';

const fetchApi = async (url: string) => {
	try {
		const { data } = await axios.get(url);
		if (!data) throw new Error('Fetch API error');
		return data;
	} catch (error: any) {
		return error?.response?.data?.errors;
	}
};

export default fetchApi;

import axios from 'axios';

const fetchApi = async (url: string, token: string) => {
	try {
		const config = token
			? {
					headers: { Authorization: `Bearer ${token}` },
			  }
			: {};
		const { data } = await axios.get(url, config);
		if (!data) throw new Error('Fetch API error');
		return data;
	} catch (error: any) {
		return error?.response?.data?.errors;
	}
};

export default fetchApi;

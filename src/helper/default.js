import axios from "axios";

export const setAxios = () => {
	// SET DEFAULT AXIOS
	axios.defaults.withCredentials = true;
	axios.defaults.baseURL = "https://run.mocky.io/v3/c9a2b598-9c93-4999-bd04-0194839ef2dc";

	// SET AXIOS INTERCEPTOR
	axios.interceptors.response.use(
		function (response) {
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			return response;
		},
		function (error) {
			return Promise.reject(error);
		}
	);
};

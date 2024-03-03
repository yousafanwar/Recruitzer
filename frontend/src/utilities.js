import router from './router/index';

export const apiCall = async (url, method, data = null, customHeaders = {}) => {
	try {
		const options = {
			method,
			headers: {
				'Content-Type': 'application/json',
				...customHeaders
			},
			body: data ? JSON.stringify(data) : null
		};

		const response = await fetch(url, options);
		if (!response.ok) {
			if (response.status === 401) {
				window.location.href = '/login';
				return null;
			}
			throw new Error(`Error fetching data from ${url}: ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		throw new Error(`Error fetching data from ${url}. Error: ${error}`);
	}
};

export function getLoginData() {
	const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
	if (!loggedInUser) {
		router.push('/login');
	}
	return loggedInUser;
}

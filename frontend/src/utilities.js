import router from './router/index';

export async function fetchReq(reqType, endPoint, ...args) {
	let argsBody = {};

	try {
		let headerContent = {};
		let loginReq = false;
		if (reqType === 'POST login') {
			let splitReq = reqType.split(' ')[0];
			reqType = splitReq;
			headerContent = { 'Content-Type': 'application/json' };
			loginReq = true;
		}
		if (reqType === 'POST') {
			headerContent = { 'Content-Type': 'application/json' };
			for (let i = 0; i < args.length; i += 2) {
				argsBody[args[i]] = args[i + 1];
			}
		}
		if (reqType === 'GET' || reqType === 'UPDATE' || reqType === 'DELETE') {
			headerContent = { Authorization: `Bearer ${args}` };
		}
		const response = await fetch(`${endPoint}`, {
			method: reqType,
			headers: headerContent,
			body: reqType === 'POST' ? JSON.stringify(argsBody) : null
		});
		errorHandle(response);
		let result = await response.json();
		if (loginReq) {
			localStorage.setItem('loggedInUser', JSON.stringify(result));
			console.log(result);
			router.push('./');
		}
		if (reqType === 'GET' || reqType === 'UPDATE' || reqType === 'DELETE') {
			return result;
		}
	} catch (error) {
		throw new Error(error);
	}

	function errorHandle(response, reqType) {
		if (!response.ok) {
			throw new Error(`Failed to execute ${reqType} request`);
		}
		if (response.status === 401) {
			router.push('./login');
		}
	}
}

export async function httpReqDEL(id, token) {
	try {
		await fetch(`http://localhost:3000/api/user/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	} catch (error) {
		console.log('This is the delete function error', error);
	}
}

// THIS FUNCTION RETREIVE LOGIN DATA FROM LOCAL STORAGE
export function getLoginData() {
	const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
	if (!loggedInUser) {
		router.push('/login');
	}
	let { firstName, lastName, email, roleId, token } = loggedInUser;
	// console.log('in the getlogindata func', roleId);
	return { firstName, lastName, email, roleId, token };
}

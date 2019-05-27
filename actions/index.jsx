import axios from "axios";
import jwt_decode from "jwt-decode";
import * as Url from "../constants";
import setAuthToken from "../utils/setAuthToken";
import {
	GET_SElENIUM_JOBSCOUNT,
	GET_SOAP_JOBSCOUNT,
	AUTH_USER,
	GET_USER,
	GET_ALLREADYSENT_EMAIL,
	POST_EMAIL,
	GET_SERVER,
	GET_JOB_PARAMS,
	ERROR_MSG,
	GET_AVATAR,
	GET_TRIGGER_JOB_API,
	LOADING_PAGE,
	CREATE_PROJECT_RELEASE,
	SEARCH_PROJECT_RELEASE,
	GET_PROJECT,
	GET_RELEASE,
	EDIT_PROJECT_RELEASE,
	DELETE_PROJECT_RELEASE,
	MODAL_OPEN,
	PRO_REL_SPINNER,
	LOGGEDIN_USER_JOBS,
	MY_JOBS_SEARCH_WITH_JOBNAME,
	SEARCH_DATE
} from "./types";

//jobs count
export const getSeleniumJobsCount = seleniumParams => dispatch => {
	dispatch(setLoading());
	//dispatch(setDate(seleniumParams.rangeEndStartDateTime._d))
	if(seleniumParams.rangeEndStartDateTime) {
		dispatch(setDate(seleniumParams.rangeEndStartDateTime._d)) } // as during job search we dont send rangeEndStartDateTime property
	else {
        dispatch(setDate("jobsearch"))
	}
		const data = JSON.stringify(seleniumParams);

	axios
		.get(`${Url.seleniumBaseUrl}${data}`)
		.then(response => {
			response.data.map(seleniumData => {
				return (seleniumData["jobType"] = "Selenium");
			});
			dispatch({
				type: GET_SElENIUM_JOBSCOUNT,
				payload: response.data
			});
		})
		.catch(error => {
			dispatch({
				type: ERROR_MSG,
				payload: error
			});
		});
};
export const getSoapJobsCount = soapuiParams => dispatch => {
	dispatch(setLoading());
	const data = JSON.stringify(soapuiParams);
	axios
		.get(`${Url.soapBaseURL}${data}`)
		.then(response => {
			response.data.map(soapData => {
				return (soapData["jobType"] = "SoapUI");
			});
			dispatch({
				type: GET_SOAP_JOBSCOUNT,
				payload: response.data
			});
		})
		.catch(error => {
			dispatch({
				type: ERROR_MSG,
				payload: error
			});
		});
};

//Dispatching spinner component
export const setLoading = () => {
	return {
		type: LOADING_PAGE
	};
};

//Dispatching date 
export const setDate = (date) => {
	return {
		type: SEARCH_DATE,
		payload: date
	}
}

export const signIn = (data, callback) => dispatch => {
	axios
		.post(`${Url.logInUrl}`, data)
		.then(response => {
			const { token } = response.data;
			//local storage
			localStorage.setItem("jwtToken", token);
			// setAuthToken(token);
			const decodedToken = jwt_decode(token);
			dispatch(setCurrentUser(decodedToken));
			//dispatch(getAvatar(data.email));
			callback();
		})
		.catch(error => {
			dispatch({
				type: ERROR_MSG,
				payload: error
			});
		});
};

export const setCurrentUser = decoded => {
	return {
		type: AUTH_USER,
		payload: decoded
	};
};

export const get_user = () => dispatch => {
	const token = localStorage.jwtToken;
	setAuthToken(token);
	axios
		.get(`${Url.userUrl}`)
		.then(response => {
			dispatch(getAvatar(response.data.email));
			dispatch({
				type: GET_USER,
				payload: response.data
			});
		})
		.catch(e => {
			dispatch({
				type: GET_USER,
				payload: ""
			});
		});
};

export const log_out = () => dispatch => {
	localStorage.removeItem("jwtToken");
	setAuthToken(false);
	dispatch(setCurrentUser({}));
	dispatch(get_user());
	dispatch(getAvatar());
	//history.push('/pages/login-page');
};

export const getAllReadySentEmails = data => dispatch => {
	var subUrl =
		'{"jobName":"' +
		`${data.jobName}` +
		'","buildReference":"' +
		`${data.buildReference}` +
		'"}';
	axios
		.get(`${Url.getEmailNotificationUrl}${subUrl}`)
		.then(response => {
			dispatch({
				type: GET_ALLREADYSENT_EMAIL,
				payload: response.data.users
			});
		})
		.catch(error => {
			dispatch({
				type: GET_ALLREADYSENT_EMAIL,
				payload: error
			});
		});
};

export const postEmail = data => dispatch => {
	let subUrl = data;
	axios
		.get(`${Url.postEmail}${subUrl}`)
		.then(response => {
			dispatch({
				type: POST_EMAIL,
				payload: response
			});
		})
		.catch(error => {
			dispatch({
				type: POST_EMAIL,
				payload: error
			});
		});
};

export const get_server = () => dispatch => {
	setAuthToken(localStorage.jwtToken);
	axios
		.get(`${Url.serverUrl}`)
		.then(response => {
			dispatch({
				type: GET_SERVER,
				payload: response
			});
		})
		.catch(error => {
			dispatch({
				type: ERROR_MSG,
				payload: error
			});
		});
};

export const getProjectParams = () => dispatch => {
	axios
		.get(`${Url.projectUrl}`)
		.then(response => {
			dispatch({
				type: GET_PROJECT,
				payload: response
			});
		})
		.catch(error => {
			dispatch({
				type: ERROR_MSG,
				payload: error
			});
		});
};

export const getReleaseParams = () => dispatch => {
	axios
		.get(`${Url.releaseUrl}`)
		.then(response => {
			dispatch({
				type: GET_RELEASE,
				payload: response
			});
		})
		.catch(error => {
			dispatch({
				type: ERROR_MSG,
				payload: error
			});
		});
};

export const getJobParams = data => dispatch => {
	let getParams = ["branch", "ENVJOBS"];
	let subUrl =
		'{"jobName":"' +
		data +
		'","server":"jenkins0","getParams" : "' +
		getParams +
		'"}';
	axios
		.get(`${Url.jobParams}${subUrl}`)
		.then(response => {
			dispatch({
				type: GET_JOB_PARAMS,
				payload: response
			});
		})
		.catch(response => {
			dispatch({
				type: GET_JOB_PARAMS,
				payload: "Something went wrong please try again"
			});
		});
};

export const getAvatar = email => dispatch => {
	//setAuthToken(localStorage.jwtToken);
	axios
		.get(`${Url.avaterUrl}/${email}`)
		.then(response => {
			dispatch({
				type: GET_AVATAR,
				payload: response.data
			});
		})
		.catch(e => {
			dispatch({
				type: GET_AVATAR,
				payload: {}
			});
		});
};

export const triggerJob = data => dispatch => {
	axios
		.post(`${Url.triggerJobAPI}`, data)
		.then(response => {
			dispatch({
				type: GET_TRIGGER_JOB_API,
				payload: response
			});
		})
		.catch(error => {
			dispatch({
				type: ERROR_MSG,
				payload: error
			});
		});
};

export const createProjectRelease = data => dispatch => {
	dispatch(setSpinner());
	axios
		.post(`${Url.createProjectRelease}`, data)
		.then(response => {
			dispatch(getProjectParams());
			dispatch(getReleaseParams());
			dispatch({
				type: CREATE_PROJECT_RELEASE,
				payload: response
			});
		})
		.catch(error => {
			dispatch({
				type: ERROR_MSG,
				payload: error
			});
		});
};

export const searchProjectRelease = data => dispatch => {
	const params = JSON.stringify(data);
	axios
		.get(`${Url.searchProjectRelease}${params}`)
		.then(response => {
			dispatch({
				type: SEARCH_PROJECT_RELEASE,
				payload: response.data
			});
		})
		.catch(e => {
			dispatch({
				type: ERROR_MSG,
				payload: {}
			});
		});
};

export const editProjectRelease = data => dispatch => {
	dispatch(setSpinner());
	axios
		.put(`${Url.updateProjectRelease}`, data)
		.then(response => {
			dispatch(getProjectParams());
			dispatch(getReleaseParams());
			dispatch({
				type: EDIT_PROJECT_RELEASE,
				payload: response
			});
		})
		.catch(error => {
			dispatch({
				type: ERROR_MSG,
				payload: error
			});
		});
};

export const deleteProjectRelease = data => dispatch => {
	dispatch(setSpinner());
	axios({
		method: "DELETE",
		url: `${Url.deleteProjectRelease}`,
		data: data
	})
		.then(response => {
			dispatch(getProjectParams());
			dispatch(getReleaseParams());
			dispatch({
				type: DELETE_PROJECT_RELEASE,
				payload: response
			});
		})
		.catch(error => {
			dispatch({
				type: ERROR_MSG,
				payload: error
			});
		});
};

export const setModalOpen = data => dispatch => {
	dispatch({
		type: MODAL_OPEN,
		payload: data
	});
};
export const setModalClose = () => {
	return {
		type: MODAL_OPEN,
		payload: false
	};
};

export const setSpinner = () => {
	return {
		type: PRO_REL_SPINNER
	};
};


export const myJobsSearch = (data) => {
	return {
		type: LOGGEDIN_USER_JOBS,
		payload: data
	}
}

export const myJobsSearchWithJobName = (data) => {
	return {
		type: MY_JOBS_SEARCH_WITH_JOBNAME,
		payload: data
	}
}




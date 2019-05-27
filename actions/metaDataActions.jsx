import axios from 'axios';
import * as R from 'ramda';
import {
	GET_METADATA_SELENIUM,
	METADATA_SERVER,
	SEARCH_METADATA_SELENIUM,
	SELENIUM_TRIGGER_RESPONSE,
	SET_ITEMS_CURRENT_PAGE,
	GET_SOAP_CONFIGS,
	GET_SOAP_SEARCH,
	SOAP_METADATA_SERVER_ERROR,
	SOAP_METADATA_SERVER,
	SOAP_TRIGGER_RESPONSE,
	LOADING_PAGE_META_DATA,
	LOADING_PAGE_SEARCH_META,
	LOADING_PAGE_SOAP_META,
	LOADING_PAGE_PRE_TRIGGER,
	REMOVE_TRIGGER_DATA,
	ERROR_MSG,
	TAB_VALUE,
	GET_METADATA_SELENIUM_ADDON,
	GET_SELENIUM_SEARCH,
	SELENIUM_SEARCHED_VALUE,
	SEARCH_METADATA_SELENIUM_IDENTIFIER,
	SET_SEARCH_CURRENT_PAGE,
	STOP_SCROLLING,
	REMOVE_META_SEARCH_DATA,
	REMOVE_META_DATA,
	REMOVE_META_SEARCH,
	GET_META_LENGTH
} from './types';
import * as Url from '../constants';

const PAGE_SIZE = 2;
const TAG_SEARCH = 1;


//Retrieves selenium meta data based on user search
export const searchMetaDataTagsSelenium = (body) => {
	return axios.post(`${Url.searchMetaDataTagsSelenium}`, body)
		.then(response => response.data)
		.catch(e => []);
};

export const fetchSeleniumTags = (page) => (dispatch, getState) => {
	const state = getState();
	//console.log(state.searchMetaDataSeleniumReducer, ' sele')
	const rangeFrom = page * TAG_SEARCH;
	if (!R.isEmpty(state.searchMetaDataSeleniumReducer.searchedValue) && page === 0) {
		const { metaTags, type } = state.searchMetaDataSeleniumReducer.searchedValue;
		dispatch(setSearchItemsCurrentPage(page));
		dispatch(setSeleniumMetaDataSearchLoading());
		return searchMetaDataTagsSelenium({
			rangeFrom,
			rangeCount: 1,
			metaTags,
			type
		}).then((response) => {
			if (!R.isEmpty(response)) {
				dispatch({ type: SEARCH_METADATA_SELENIUM_IDENTIFIER, payload: response });
				dispatch({ type: SEARCH_METADATA_SELENIUM, payload: response });
			} else {
				dispatch({ type: STOP_SCROLLING, payload: [] })
			}
		});
	} else if (page >= 1 && state.searchMetaDataSeleniumReducer.triggerSearch === true && !state.searchMetaDataSeleniumReducer.stopScrolling) {
		const { metaTags, type } = state.searchMetaDataSeleniumReducer.searchedValue;
		const { createdAt, searchedBy, userid } = state.searchMetaDataSeleniumReducer.searchIdentifier;
		dispatch(setSearchItemsCurrentPage(page));
		return searchMetaDataTagsSelenium({
			rangeFrom,
			rangeCount: 1,
			metaTags,
			type,
			createdAt,
			searchedBy,
			userid
		}).then((response) => {
			if (!R.isEmpty(response)) {
				dispatch({
					type: SEARCH_METADATA_SELENIUM,
					payload: response
				});
			} else {
				dispatch({ type: STOP_SCROLLING, payload: [] })
			}
		});
	}
}

//SET_SEARCH_CURRENT_PAGE
const setSearchItemsCurrentPage = page => ({
	payload: page,
	type: SET_SEARCH_CURRENT_PAGE,
});

//Retrieves all the selenium meta data details
export const fetchSeleniumItems = (page) => (dispatch, getState) => {
	//const state = getState(); 
	const rangeFrom = page * PAGE_SIZE;
	dispatch(setItemsCurrentPage(page));
	dispatch(setMetaDataLoading());
	return getMetaDataSelenium({
		rangeFrom: rangeFrom.toString(),
		rangeTo: (rangeFrom + 1).toString()
	}).then((response) => {
		dispatch({
			type: GET_METADATA_SELENIUM,
			payload: response
		});
	})
};

const setItemsCurrentPage = page => ({
	payload: page,
	type: SET_ITEMS_CURRENT_PAGE,
});

export const getMetaDataSelenium = (data) => {
	const params = JSON.stringify(data);
	return axios.get(`${Url.getMetaDataSelenium}${params}`)
		.then(response => response.data);
};

/*
//Retrieves all the selenium meta data details

export const getMetaDataSelenium2 = data => dispatch => {
	dispatch(setMetaDataLoading());
	const params = JSON.stringify(data);
	console.log(params)
	axios
		.get(`${Url.getMetaDataSelenium}${params}`)
		.then(response => {
			dispatch({
				type: GET_METADATA_SELENIUM,
				payload: response.data
			});
		})
		.catch(e => {
			dispatch({
				type: ERROR_MSG,
				payload: e
			});
		});
};
*/

//Selenium Check
export const jenkinsPreTiggerCheck = () => dispatch => {
	dispatch(setSeleniumPreTriggerLoading());
	const getParams = ['branch', 'ENVJOBS'];
	// const params = `{jobName:CATJOB1, server:jenkins0, getParams : ${getParams}}`
	const jobUrl =
		Url.baseUrl +
		'/api/jenkins/{"jobName":"CATJOB1", "server":"jenkins0", "getParams" : "' +
		getParams +
		'"}';
	axios
		.get(`${jobUrl}`)
		.then(response => {
			dispatch({
				type: METADATA_SERVER,
				payload: response.data
			});
		})
		.catch(e => {
			dispatch({
				type: ERROR_MSG,
				payload: e
			});
		});
};

//Selenium Meta Trigger
export const seleniumMetaTrigger = data => dispatch => {
	dispatch(setMetaDataLoading());
	axios
		.post(`${Url.seleniumMetaTriggerUrl}`, data)
		.then(response => {
			dispatch({
				type: SELENIUM_TRIGGER_RESPONSE,
				payload: response.data
			});
		})
		.catch(e => {
			dispatch({
				type: ERROR_MSG,
				payload: e
			});
		});
};


//selenium addon search
export const getMetaDataSeleniumAddon = () => dispatch => {
	axios
		.get(`${Url.getMetaDataSeleniumAddon}`)
		.then(response => {
			dispatch({
				type: GET_METADATA_SELENIUM_ADDON,
				payload: response.data
			});
			dispatch({ type: GET_META_LENGTH, payload: Object.keys(response.data.searchResult).length })
		})
		.catch(e => {
			dispatch({
				type: ERROR_MSG,
				payload: e
			});
		});
};

//selenium workbook/feature response
export const getWorkbookSheetSearch = (data) => dispatch => {
	const param = JSON.stringify(data);
	axios
		.get(`${Url.getWorkbookSheetSearch}${param}`)
		.then(response => {
			dispatch({
				type: GET_SELENIUM_SEARCH,
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

//Retrieves all the soap config meta data details
export const getSoapConfigs = () => dispatch => {
	dispatch(setSoapLoading());
	axios
		.get(`${Url.getSoapConfigs}`)
		.then(response => {
			dispatch({
				type: GET_SOAP_CONFIGS,
				payload: response.data
			});
		})
		.catch(e => {
			dispatch({
				type: ERROR_MSG,
				payload: e
			});
		});
};

//Retrieves soap meta data details based on user search
export const searchMetaDataTagsSoap = params => dispatch => {
	dispatch(setSoapLoading());
	const param = JSON.stringify(params);
	axios
		.get(`${Url.getSoapConfigsSearch}${param}`)
		.then(response => {
			dispatch({
				type: GET_SOAP_SEARCH,
				payload: response.data
			});
		})
		.catch(e => {
			dispatch({
				type: ERROR_MSG,
				payload: e
			});
		});
};

//Soap job's check
export const soapJenkinsJobCheck = job => dispatch => {
	const getParams = ["branch", "ENVJOBS"];
	const jobUrl =
		Url.baseUrl +
		'/api/jenkins/{"jobName":"' +
		job +
		'", "server":"jenkins0", "getParams" : "' +
		getParams +
		'"}';

	axios
		.get(`${jobUrl}`)
		.then(response => {
			dispatch({
				type: SOAP_METADATA_SERVER,
				payload: response.data
			});
		})
		.catch(e => {
			dispatch({
				type: SOAP_METADATA_SERVER_ERROR,
				payload: "error"
			});
		});
};

//Soap Meta Trigger
export const soapMetaTrigger = data => dispatch => {
	dispatch(setSoapLoading());
	axios
		.post(`${Url.soapMetaTriggerUrl}`, data)
		.then(response => {
			dispatch({
				type: SOAP_TRIGGER_RESPONSE,
				payload: response.data
			});
		})

		.catch(e => {
			dispatch({
				type: ERROR_MSG,
				payload: e
			});
		});
};


//Dispatching spinner for Meta Data component 
export const setMetaDataLoading = () => {
	return {
		type: LOADING_PAGE_META_DATA
	};
};

//Dispatch spinner for Search Meta Data, since we have seperate reducer
export const setSeleniumMetaDataSearchLoading = () => {
	return {
		type: LOADING_PAGE_SEARCH_META
	};
};

//Dispatch spinner for Soap Meta Data 
export const setSoapLoading = () => {
	return {
		type: LOADING_PAGE_SOAP_META
	}
};

//Dispatch spinner for selenium pre trigger, since we have seperate reducer
export const setSeleniumPreTriggerLoading = () => {
	return {
		type: LOADING_PAGE_PRE_TRIGGER
	}
};


//flush out trigger response from the store
export const flushOutTriggerData = () => {
	return {
		type: REMOVE_TRIGGER_DATA
	}
};

//flush out searched meta data from the store before making search on next tag 
export const flushMetaSearchData = () => {
	return {
		type: REMOVE_META_SEARCH_DATA,
		payload: {}
	}
}

export const flushMetaData = () => {
	return {
		type: REMOVE_META_DATA,
	}
}

export const removeSearch = () => {
	return {
		type: REMOVE_META_SEARCH
	}
}

//Dispatch selected tab value
export const tabValue = (value) => {
	return {
		type: TAB_VALUE,
		payload: value
	}
};

//storing searched tag value for selenium Meta
export const seleniumTagValue = ({ ...tagDetails }) => {
	return {
		type: SELENIUM_SEARCHED_VALUE,
		payload: tagDetails
	}
};
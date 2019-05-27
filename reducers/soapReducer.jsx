import { GET_SOAP_JOBSCOUNT, LOADING_PAGE, SEARCH_DATE } from '../actions/types';

const INITIAL_STATE = {
	soapResults: [],
	loading: false
}

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOADING_PAGE:
			return {
				...state,
				loading: true
			}
		case GET_SOAP_JOBSCOUNT:
			return {
				...state,
				soapResults: action.payload,
				loading: false
			};
		case SEARCH_DATE:
			return {
				...state,
				searchDate: action.payload
			}
		default:
			return state;
	}
}
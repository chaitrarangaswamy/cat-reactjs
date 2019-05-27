import { GET_SElENIUM_JOBSCOUNT, LOADING_PAGE,SEARCH_DATE } from '../actions/types';
import moment from 'moment';

const INITIAL_STATE = {
	seleniumResults: [],
	loading: false,
	searchDate : moment()
}

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOADING_PAGE:
			return {
				...state,
				loading: true
			}
		case GET_SElENIUM_JOBSCOUNT:
			return {
				...state,
				seleniumResults: action.payload,
				loading: false
			}
			case SEARCH_DATE :
			return{
				...state,
				searchDate : action.payload
			}
		default:
			return state;
	}
}


import {
	SET_ITEMS_CURRENT_PAGE,
	GET_METADATA_SELENIUM,
	LOADING_PAGE_META_DATA,
	REMOVE_META_DATA,
	GET_META_LENGTH
} from '../actions/types';

const INITIAL_STATE = {
	currentPage: 0,
	lastPage: 3
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOADING_PAGE_META_DATA: {
			return {
				...state,
				loading: false
			};
		}
		case GET_METADATA_SELENIUM: {
			return {
				...state,
				...action.payload.searchResult,
				loading: false
			}
		}
		case SET_ITEMS_CURRENT_PAGE: {
			return {
				...state,
				currentPage: action.payload
			}
		}
		case REMOVE_META_DATA: {
			return {
				...INITIAL_STATE,
			}
		}
		case GET_META_LENGTH: {
			return {
				...state,
				lastPage: Math.ceil(action.payload / 2)
			}
		}
		default:
			return state;
	}
};

import {
	LOADING_PAGE_SEARCH_META,
	TAB_VALUE,
	SELENIUM_SEARCHED_VALUE,
	SET_SEARCH_CURRENT_PAGE,
	SEARCH_METADATA_SELENIUM_IDENTIFIER,
	STOP_SCROLLING,
	REMOVE_META_SEARCH,
	GET_META_LENGTH

} from '../actions/types';

const INITIAL_STATE = {
	searchIdentifier: {},
	loading: false,
	tabValue: 0,
	currentPage: 0,
	lastPage: 0,
	searchedValue: {},
	triggerSearch: false,
	stopScrolling: false,
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOADING_PAGE_SEARCH_META:
			return {
				...state,
				loading: true
			};
		case SEARCH_METADATA_SELENIUM_IDENTIFIER:
			return {
				...state,
				searchIdentifier: action.payload.searchIdentifier,
				loading: false,
				stopScrolling: false
			};
		case SET_SEARCH_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.payload
			}

		case TAB_VALUE: {
			return {
				...state,
				tabValue: action.payload
			}
		}
		case SELENIUM_SEARCHED_VALUE: {
			return {
				...state,
				searchedValue: action.payload,
				triggerSearch: true
			}
		}
		case STOP_SCROLLING: {
			return {
				...state,
				loading: false,
				stopScrolling: true
			}
		}
		case REMOVE_META_SEARCH: {
			return {
				...state,
				triggerSearch: false,
				stopScrolling: false
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

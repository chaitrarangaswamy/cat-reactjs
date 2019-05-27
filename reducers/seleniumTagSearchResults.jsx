import { SEARCH_METADATA_SELENIUM, REMOVE_META_SEARCH_DATA } from '../actions/types';

export default function (state = {}, action) {
	let entry = {};
	switch (action.type) {
		case SEARCH_METADATA_SELENIUM: {
			if (action.payload && action.payload.searchResult && action.payload.searchResult.length > 0) {
				for (let i = 0; i < action.payload.searchResult.length; i += 1) {
					const item = action.payload.searchResult[i];
					entry = { ...item };
				}
			} else {
				entry = {};
			}
			return {
				...state,
				...entry
			}
		}
		case REMOVE_META_SEARCH_DATA: {
			return {
				...action.payload,
			}
		}
		default:
			return state;
	}
};
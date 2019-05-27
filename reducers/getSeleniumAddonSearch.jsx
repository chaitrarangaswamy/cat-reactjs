import { GET_METADATA_SELENIUM_ADDON, GET_SELENIUM_SEARCH } from '../actions/types';

const INITIAL_STATE = {
    seleniumResponse: [],
    seleniumAddonResonse: []
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_METADATA_SELENIUM_ADDON: {
            return {
                ...state,
                seleniumResponse: action.payload,
                loading: false
            };
        }
        case GET_SELENIUM_SEARCH: {
            return {
                ...state,
                seleniumAddonResonse: action.payload,
                loading: false
            };
        }
        default:
            return state;
    }
};

import { SELENIUM_TRIGGER_RESPONSE, LOADING_PAGE_META_DATA, REMOVE_TRIGGER_DATA } from '../actions/types';

const INITIAL_STATE = {
    seleniumTriggerResponse: {},
    loading: false
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOADING_PAGE_META_DATA: {
            return {
                ...state,
                loading: false
            };
        }
        case SELENIUM_TRIGGER_RESPONSE: {
            return {
                ...state,
                seleniumTriggerResponse: action.payload,
                loading: false
            }
        }
        case REMOVE_TRIGGER_DATA: {
            return {
                ...state,
                seleniumTriggerResponse: {}
            }
        }
        default:
            return state;
    }
}
import { METADATA_SERVER, LOADING_PAGE_PRE_TRIGGER,  } from '../actions/types';

const INITIAL_STATE = {
    metaDetails: {},
    loading: false,
}


export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOADING_PAGE_PRE_TRIGGER: {
            return {
                ...state,
                loading: true
            }
        }
        case METADATA_SERVER: {
            return {
                ...state,
                metaDetails: action.payload,
                loading: false
            }
        }
        default:
            return state;
    }
}
import { SOAP_METADATA_SERVER, LOADING_PAGE_PRE_TRIGGER } from '../actions/types';

const INITIAL_STATE = {
    soapMetaDetails: {},
    loading: false
}


export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOADING_PAGE_PRE_TRIGGER: {
            return {
                ...state,
                loading: true
            }
        }
        case SOAP_METADATA_SERVER: {
            return {
                ...state,
                soapMetaDetails: action.payload,
                loading: false
            }
        }
        default:
            return state;
    }
}
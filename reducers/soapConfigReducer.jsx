import { GET_SOAP_CONFIGS, LOADING_PAGE_SOAP_META, GET_SOAP_SEARCH, SOAP_TRIGGER_RESPONSE,REMOVE_TRIGGER_DATA } from "../actions/types";

const INITIAL_STATE = {
    getSoapConfigs: {},
    soapTriggerResponse: {},
    loading: false
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOADING_PAGE_SOAP_META:
            return {
                ...state,
                loading: true
            };
        case GET_SOAP_CONFIGS: {
            return {
                ...state,
                getSoapConfigs: action.payload,
                loading: false
            };
        }
        case GET_SOAP_SEARCH: {
            return {
                ...state,
                getSoapConfigs: action.payload,
                loading: false
            }
        }
        case SOAP_TRIGGER_RESPONSE: {
            return {
                ...state,
                soapTriggerResponse: action.payload,
                loading: false
            }
        }
        case REMOVE_TRIGGER_DATA: {
            return{
                ...state,
                soapTriggerResponse: []
            }
        }
        default:
            return state;
    }
}

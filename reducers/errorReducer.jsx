import { ERROR_MSG } from '../actions/types';


const initialState = {
    crosError: false,
    apiError: {}

};

export default function (state = initialState, action) {
    switch (action.type) {
        case ERROR_MSG:
            if (action.payload.response) {
                return {
                    ...state,
                    apiError: action.payload.response.data
                }
            } else {
                return {
                    ...state,
                    crosError: true
                }
            }
        default:
            return state
    }
}
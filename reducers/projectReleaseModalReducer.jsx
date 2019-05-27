import { MODAL_OPEN } from '../actions/types';

const initialState = {
    modalResponse: null,
};

export default function (state = initialState, action) {
    switch (action.type) {  
        case MODAL_OPEN:        
            if (action.payload) {
                return {
                    ...state,
                    modalResponse: action.payload
                }
            } else if(action.payload === false){
                return {
                    ...state,
                    modalResponse: action.payload
                }
            }
            break;
        default:
            return state
    }
}
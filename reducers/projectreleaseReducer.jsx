import { CREATE_PROJECT_RELEASE,EDIT_PROJECT_RELEASE,DELETE_PROJECT_RELEASE,PRO_REL_SPINNER} from '../actions/types';

const INITIAL_STATE = {
      response : null,
      editResponse : {},
       loading: false
   
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
     case PRO_REL_SPINNER: 
      return{
        ...state,
        loading: true
      }
    case CREATE_PROJECT_RELEASE:
      return {
        ...state,
        response: action.payload,
        loading: false
      };
     case EDIT_PROJECT_RELEASE :
     return {
       ...state,
        editResponse : action.payload,
         loading: false
     }
      case DELETE_PROJECT_RELEASE : 
      return {
        ...state,
        deleteResponse : action.payload,
         loading: false
      }
    default:
      return state;
  }
}
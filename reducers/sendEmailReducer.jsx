import { GET_ALLREADYSENT_EMAIL,POST_EMAIL} from "../actions/types";

const InitialState = {
    user:"",
    postEmailResponse:""
  
}

export default function (state = InitialState, action) {
  switch (action.type) {
    case  GET_ALLREADYSENT_EMAIL:
       return {...state,user:action.payload};
    case POST_EMAIL:
       return {...state,postEmailResponse:action.payload};
    default:
      return state;
  }
    
}
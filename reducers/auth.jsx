import { AUTH_USER, GET_USER, GET_AVATAR } from "../actions/types";
import isEmpty from '../validation/is-Empty';
import  defaultImg from '../assets/img/placeholder.jpg';

const INITIAL_STATE = {
  isAuthenticated: false,
  user: '',
  avatar: defaultImg
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: action.payload ? true : false  
      };
    case AUTH_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload)
      };
    case GET_AVATAR:
    return {
      ...state,
      avatar: isEmpty(action.payload) ? defaultImg : action.payload
    }

    default:
      return state;
  }
}

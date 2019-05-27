import { GET_SOAP_BUILD_RESULT } from '../actions/types';

export default function (state = null, action) {
  switch (action.type) {
      case GET_SOAP_BUILD_RESULT:
        return action.payload;
      default:
        return state;
  }
}
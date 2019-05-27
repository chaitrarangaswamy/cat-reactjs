import { UPLOAD_METADATA, UPLOAD_META_DATA_SPINNER, UPLOAD_ERROR_MSG } from '../actions/types';

const INITIAL_STATE = {
  uploadResponse: {},
  loading: false,
   apiError: {}
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPLOAD_META_DATA_SPINNER:
      return {
        ...state,
        loading: true
      }
    case UPLOAD_METADATA:
      return {
        ...state,
        uploadResponse: action.payload,
        loading: false,
        check:action.check
      };
      case UPLOAD_ERROR_MSG:
      return {
        ...state,
        apiError: action.payload.response.data,
        loading:false
      }
    default:
      return state;
  }
}
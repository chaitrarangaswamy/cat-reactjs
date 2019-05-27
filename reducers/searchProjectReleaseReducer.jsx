import { SEARCH_PROJECT_RELEASE, LOADING_PAGE } from "../actions/types";

const INITIAL_STATE = {
  projectReleaseSearch: [],
  loading: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOADING_PAGE:
      return {
        ...state,
        loading: true
      };
    case SEARCH_PROJECT_RELEASE:
      return {
        ...state,
        projectReleaseSearch: action.payload,
        loading: false
      };
    default:
      return state;
  }
}

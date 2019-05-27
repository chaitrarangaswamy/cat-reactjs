import { LOGGEDIN_USER_JOBS, MY_JOBS_SEARCH_WITH_JOBNAME } from '../actions/types';

const INITIAL_STATE = {
  userToggleClick:false,
  myJobsWithJobname: {}
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGGEDIN_USER_JOBS:
      return {
        ...state,
       userToggleClick: action.payload
      }
    case MY_JOBS_SEARCH_WITH_JOBNAME:
      return {
        ...state,
        myJobsWithJobname: action.payload,
      }
    default:
      return state;
  }
}
import {
  GET_SERVER,
  GET_JOB_PARAMS,
  GET_TRIGGER_JOB_API,
  GET_PROJECT,
  GET_RELEASE
} from "../actions/types";

const INITIAL_STATE = {
  serverStatus: 'JENKINS SERVER IS UNAVAILABLE',
  statusColor: 'warning',
  jobName: '',
  jobParam: '',
  triggerJob: '',
  projectName: {},
  releaseName: {},
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_SERVER:
        return {
          ...state,
          serverStatus: 'JENKINS SERVER IS AVAILABLE',
          statusColor: 'success',
          jobName: action.payload,
          jobParam: '',
          triggerJob: '',
        };
    case GET_JOB_PARAMS:
        return {
          ...state,
          jobParam: action.payload,
          triggerJob: '',
        };
    case GET_TRIGGER_JOB_API:
        return {
          ...state,
          triggerJob: action.payload,
          jobName: '',
          jobParam: '',
        };
    case GET_RELEASE:
        return{
          ...state,
          releaseName: action.payload
        }
    case GET_PROJECT:
        return{
          ...state,
          projectName: action.payload
        }
    default:
      return state;
  }
}

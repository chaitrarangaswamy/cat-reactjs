import axios from "axios";
import * as Url from "../constants";
import {
  UPLOAD_METADATA,
  UPLOAD_META_DATA_SPINNER,
  UPLOAD_ERROR_MSG
} from "./types";

export const uploadMetadata = (data,selectedValue,check) => dispatch => {
  dispatch(setUploadMetaDataSpinner());
  if (selectedValue === 'selenium' && check === 'xlsx')
    var uploadUrl = Url.uploadMetaDataSelenium;
  else if (selectedValue === 'csv' && check === 'csv')
     uploadUrl = Url.uploadMetaDataCsv;
  axios
    .post(`${uploadUrl}`, data)
    .then(response => {
      dispatch({
        type: UPLOAD_METADATA,
        payload: response.data,
        check:check
      });
    })
    .catch(error => {
      dispatch({
        type: UPLOAD_ERROR_MSG,
        payload: error
      });
    });
}

export const setUploadMetaDataSpinner = () => {
  return {
    type: UPLOAD_META_DATA_SPINNER
  };
};

export const flushUploadResponse = () => dispatch =>{
  dispatch({
    type:UPLOAD_METADATA,
    payload:{}
  })
}

import axios from "axios";
import * as Url from "../constants";
import { GET_SELENIUM_BUILD_RESULT, GET_SOAP_BUILD_RESULT, ERROR_MSG } from "./types";

export const getSeleniumBuildResult = seleniumParams => dispatch => {
  const data = JSON.stringify(seleniumParams);

  axios
    .get(`${Url.seleniumBuildResult}${data}`)
    .then(response => {
      //  console.log(response, " selenium api response");
      dispatch({
        type: GET_SELENIUM_BUILD_RESULT,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: ERROR_MSG,
        payload: error
      });
    });
};


export const getSoapBuildResult = soapParams => dispatch => {
  const data = JSON.stringify(soapParams);

  axios
    .get(`${Url.soapBuildResult}${data}`)
    .then(response => {
      dispatch({
        type: GET_SOAP_BUILD_RESULT,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: ERROR_MSG,
        payload: error
      });
    });
};
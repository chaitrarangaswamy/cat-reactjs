import { combineReducers } from 'redux';
import seleniumReducer from './seleniumReducers';
import soapReducer from './soapReducer';
import seleniumBuildResultReducer from './seleniumBuildResultReducer';
import soapBuildResultReducer from './soapBuildResultReducer';
import auth from './auth';
import sendEmailReducer from './sendEmailReducer';
import jenkins from './jenkins';
import errorMsgs from './errorReducer';
import projectreleaseReducer from './projectreleaseReducer';
import getSeleniumAddonSearch from './getSeleniumAddonSearch'
import searchProjectReleaseReducer from './searchProjectReleaseReducer';
import projectReleaseModalReducer from './projectReleaseModalReducer';
import getMetaDataSeleniumReducer from './getMetaDataSeleniumReducer';
import seleniumMetaTrigger from './seleniumMetaTrigger';
import metaDataServerReducer from './metaDataServerReducer';
import searchMetaDataSeleniumReducer from "./searchMetaDataSeleniumReducer";
import getSoapConfigsReducer from './soapConfigReducer';
import uploadMetaDataReducer from './uploadMetaDataReducer';
import soapMetaDataServerReducer from './soapMetaDataServerReducer';
import seleniumTagSearchResults from './seleniumTagSearchResults';
import userJobsReducer from './userJobsReducer';

export default combineReducers({
    seleniumReducer,
    soapReducer,
    seleniumBuildResultReducer: seleniumBuildResultReducer,
    soapBuildResultReducer: soapBuildResultReducer,
    auth,
    sendEmailReducer: sendEmailReducer,
    jenkins,
    errorMsgs,
    projectreleaseReducer,
    searchProjectReleaseReducer,
    projectReleaseModalReducer,
    getSeleniumAddonSearch,
    getMetaDataSeleniumReducer,
    seleniumMetaTrigger,
    searchMetaDataSeleniumReducer,
    seleniumTagSearchResults,
    uploadMetaDataReducer,
    getSoapConfigsReducer,
    metaDataServerReducer,
    soapMetaDataServerReducer,
    userJobsReducer

});

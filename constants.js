export const baseUrl = "http://localhost:9000";
export const seleniumBaseUrl = `${baseUrl}/api/buildresults/search/jobs/summary/`;
export const soapBaseURL = `${baseUrl}/api/soapbuild/search/jobs/limit/`;

export const seleniumBuildResult = `${baseUrl}/api/buildresults/search/jobs/testcases/`;
export const soapBuildResult = `${baseUrl}/api/soapbuild/search/jobs/testcases/`;

export const logInUrl = `${baseUrl}/auth/local/`;
export const userUrl = `${baseUrl}/api/users/me/`;
export const getEmailNotificationUrl = `${baseUrl}/api/jenkins/notification/`;
export const postEmail = `${baseUrl}`;

export const serverUrl = `${baseUrl}/api/jenkins/{"server":"jenkins0"}`;
export const projectUrl = `${baseUrl}/api/project/projectNames`;
export const releaseUrl = `${baseUrl}/api/project/releases`;

export const jobParams = `${baseUrl}/api/jenkins/`;

export const triggerJobAPI = `${baseUrl}/api/jenkins/`;
export const avaterUrl = `${baseUrl}/api/users/avatar`;

export const createProjectRelease = `${baseUrl}/api/project`;
export const searchProjectRelease = `${baseUrl}/api/project/relations/`;
export const deleteProjectRelease = `${baseUrl}/api/project/delete`;
export const updateProjectRelease = `${baseUrl}/api/project/update`;


//Selenium Meta Tags
export const getMetaDataSelenium = `${baseUrl}/api/parser/limit/`;
export const searchMetaDataTagsSelenium = `${baseUrl}/api/parser/search/limit`;
export const getWorkbookSheetSearch = `${baseUrl}/api/parser/search/`;
export const seleniumMetaTriggerUrl = `${baseUrl}/api/jenkins/choose/`;
export const getMetaDataSeleniumAddon = `${baseUrl}/api/parser`;

//Soap config Meta Tags
export const getSoapConfigs = `${baseUrl}/api/soapconfigs/`;
export const getSoapConfigsSearch = `${baseUrl}/api/soapconfigs/search/`;
export const soapMetaTriggerUrl = `${baseUrl}/api/soapconfigs/trigger/`;

export const uploadMetaDataSelenium = `${baseUrl}/api/parser/`;
export const uploadMetaDataCsv = `${baseUrl}/api/soapconfigs/csv`;

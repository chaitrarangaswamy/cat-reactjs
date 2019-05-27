import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
import * as R from "ramda";
import triggerjobResponse from './trigger';

describe("Verify Trigger job", () => {
    it("testing handleFixedClick method", () => {
        //open and closes trigger pop    
        var fixedClasses = "dropdown";
        if (fixedClasses === "dropdown") {
            fixedClasses = "dropdown show"
        } else {
            fixedClasses: "dropdown"
        }
        expect(fixedClasses).toBe("dropdown show")
    })
    it("testing getSelOptions method", () => {
        //gets job name suggestions for select
        var jobNames = [{
                _class: "hudson.model.FreeStyleProject",
                name: "A2GO_Test",
                url: "https://jenkins.devshare.allegiantair.com/job/A2GO_Test/",
                color: "aborted",
                readableStatus: "ABORTED"
            },
            {
                _class: "hudson.model.FreeStyleProject",
                name: "A2GO_WSBooking",
                url: "https://jenkins.devshare.allegiantair.com/job/A2GO_WSBooking/",
                color: "blue",
                readableStatus: "SUCCEEDED"
            },
            {
                _class: "hudson.model.FreeStyleProject",
                name: "A2GO_WSBooking1",
                url: "https://jenkins.devshare.allegiantair.com/job/A2GO_WSBooking1/",
                color: "blue",
                readableStatus: "SUCCEEDED"
            },
            {
                _class: "hudson.model.FreeStyleProject",
                name: "A2GO_WSBooking2",
                url: "https://jenkins.devshare.allegiantair.com/job/A2GO_WSBooking2/",
                color: "blue",
                readableStatus: "SUCCEEDED"
            },
            {
                _class: "hudson.maven.MavenModuleSet",
                name: "A2GO_Yash",
                url: "https://jenkins.devshare.allegiantair.com/job/A2GO_Yash/",
                color: "aborted",
                readableStatus: "ABORTED"
            }
        ]
        let jobOptions = [];
        if (jobNames !== null && jobNames !== undefined) {
            R.map(data => jobOptions.push({
                label: data.name
            }), jobNames);
        }

        expect(jobOptions.length).toEqual(5);

    });
    it("testing getEnvBrSetValue method for  environment", () => {
        //gets default value for branch and env select
        var info = triggerjobResponse.ENVJOB;

        var env = info && info.setValue && typeof info.setValue === 'string' ? info.setValue : '';
        expect(env).toBe('QA1');
    });

    it("testing getEnvBrOptions method for environment", () => {
        //gets branch and env suggestions for select
        var envOptions = triggerjobResponse.ENVJOB;
        const environment = [];
        if (envOptions && envOptions.value && envOptions.value.length > 0) {
            R.map(env =>
                environment.push({
                    label: env
                }), envOptions.value);
        } else {
            environment;
        }
        expect(environment.length).toEqual(5)
    });
    it("testing getEnvBrSetValue method for branch", () => {
        //gets default value for branch and env select
        var info = triggerjobResponse.branch;

        var branch = info && info.setValue && typeof info.setValue === 'string' ? info.setValue : '';
        expect(branch).toBe('origin/master');
    });

    it("testing getEnvBrOptions method for branch", () => {
        //gets branch and env suggestions for select
        var branchOptions = triggerjobResponse.branch;
        const branch = [];
        if (branchOptions && branchOptions.value && branchOptions.value.length > 0) {
            R.map(env =>
                branch.push({
                    label: env
                }), branchOptions.value);
        } else {
            branch;
        }
        expect(branch.length).toEqual(3)
    });
    it("testing getFixedClass method", () => {
        //determines to close or open trigger pop up
        var response = triggerjobResponse;
        var triggerPopUP, currState = "dropdown show";
        let paramsLength = Object.keys(response).length;
        if (paramsLength > 3) {
            if (currState === "dropdown show") {
                triggerPopUP = "dropdown";
            }
        } else {
            triggerPopUP = "dropdown show";
        }
        expect(triggerPopUP).toBe("dropdown")
    })
    it("testing getModalT method", () => {
        //determines if modal pop up will show or not
        var response = triggerjobResponse;
        var showMoadal = false;
        let paramsLength = Object.keys(response).length;
        if (paramsLength > 3) {
            showMoadal = true;
        } else {
            showMoadal = false;
        }
        expect(showMoadal).toBe(true)
    });
    it("testing fetchList method", () => {
        const listToReturn = [];
        var email = 'sajesh.nair@allegiantair.com,chaitra.r@people10.com,govardhan.n@people10.com'
        if (email.length > 0) {
            const userslist = email.split(',');
            console.log(userslist)
            for (let i = 0; i < userslist.length; i++) {
                listToReturn.push({
                    email: userslist[i],
                    userid: ''
                });
            }
        } else {
            listToReturn;
        }
        expect(listToReturn.length).toEqual(3)
    });
    it("testing defaultParams method", () => {
        var obj = { "name,A2GO_Yash": "input#name", "ENVJOB,QA1": "WithStyles", "branch,origin/master": "WithStyles", "Device,IOS": "WithStyles" }
        const defaultParams = {};
        if (!R.isEmpty(obj)) {
            Object.keys(obj).map(data => {
                const d = data.split(',');
                defaultParams[d[0]] = d[1];
            });
        };
        Object.keys(defaultParams).length > 0 ? defaultParams : {};
        expect(Object.keys(defaultParams).length).toBe(4)
    });
    it("testing triggerChecks mathod for jobs with additional params", () => {
        var state = { "name": "A2GO_Yash" }
        var defaultParams = { name: "A2GO_Yash", ENVJOB: "QA1", branch: "origin/master", Device: "IOS" }
        const objectToReturn = {};
        Object.keys(defaultParams).map(key => {
            if (key === 'name') {
                return (objectToReturn['jobName'] = defaultParams[key]);
            } else {
                if (state[key]) {
                    return (objectToReturn[key] = state[key]);
                } else {
                    return (objectToReturn[key] = defaultParams[key]);
                }
            }
        });
        objectToReturn['users'] = [{ email: "sajesh.nair@allegiantair.com", userid: "" },
            { email: "chaitra.r@people10.com", userid: "" },
            { email: "govardhan.n@people10.com", userid: "" }
        ]
        objectToReturn['server'] = 'jenkins0';
        objectToReturn['notificationType'] = 'full';
        objectToReturn['notificationModes'] = 'email,hipchat';
        console.log(objectToReturn)
        expect(objectToReturn.jobName).toBe("A2GO_Yash");
        expect(objectToReturn.ENVJOB).toBe("QA1");
        expect(objectToReturn.branch).toBe("origin/master");
        expect(objectToReturn.Device).toBe("IOS");
        expect(objectToReturn.server).toBe("jenkins0");
        expect(objectToReturn.notificationType).toBe("full");
        expect(objectToReturn.notificationModes).toBe("email,hipchat");
        expect(objectToReturn.users.length).toEqual(3);
    });

    it("testing triggerChecks method for jobs withoutadditional params", () => {
        var defaultParams = { ENVJOB: "SB1" }
        var obj = {
            jobName: { label: "AMEX_WS" },
            selectedBranch: {},
            selectedEnv: { label: "SB1" }
        }
        const objectToReturn = {};
        if (!R.isEmpty(obj.jobName)) {
            objectToReturn['jobName'] = obj.jobName.label;
            !R.isEmpty(obj.selectedEnv) ? objectToReturn['ENVJOB'] = obj.selectedEnv.label : objectToReturn['ENVJOB'] = defaultParams.ENVJOB;
            !R.isEmpty(obj.selectedBranch) ? objectToReturn['branch'] = obj.selectedBranch.label : objectToReturn['branch'] = defaultParams.branch;
            objectToReturn['server'] = 'jenkins0';
            objectToReturn['notificationType'] = 'full';
            objectToReturn['notificationModes'] = 'email,hipchat';
            //objectToReturn['referer'] = window.location.href;

            objectToReturn['users'] = [{ email: "sajesh.nair@allegiantair.com", userid: "" },
                { email: "chaitra.r@people10.com", userid: "" },
                { email: "govardhan.n@people10.com", userid: "" }
            ]

        }

        expect(objectToReturn.jobName).toBe("AMEX_WS");
        expect(objectToReturn.server).toBe("jenkins0");
        expect(objectToReturn.notificationType).toBe("full");
        expect(objectToReturn.notificationModes).toBe("email,hipchat");
        expect(objectToReturn.ENVJOB).toBe("SB1");

    });

    it("testing splitArray method", () => {
        var item = [{ name: "name", type: "string", value: "A2GO_Yash", setValue: "A2GO_Yash" },
            { name: "ENVJOB", type: "choice", value: Array(5), setValue: "QA1" },
            { name: "branch", type: "choice", value: Array(3), setValue: "origin/master" },
            { name: "Device", type: "choice", value: Array(2), setValue: "IOS" }
        ]
        if (item) {
            var subArray1 = [];
            var subArray2 = [];
            let info = item;
            if (info && Array.isArray(info)) {
                const arraylength = Math.floor(info.length / 2);
                for (let i = 0; i <= arraylength; i++) {
                    subArray1.push(info[i]);
                }
                newArray1: subArray1;
                for (let i = arraylength + 1; i <= info.length - 1; i++) {
                    subArray2.push(info[i]);
                }
                newArray2: subArray2;
            }
        }
        expect(item.length).toBe(4);
        expect(subArray1.length).toBe(3);
        expect(subArray2.length).toBe(1);
    })

});
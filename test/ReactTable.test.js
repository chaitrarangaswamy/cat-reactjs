import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
import * as R from "ramda";
import seleniumResult from './seleniumJobDetails';
import soapResult from './soapJobDetails';

describe("Verify React Table", () => {
    it("testing renderContent methods", () => {

        const combinedData = R.concat(seleniumResult.searchResult, soapResult);
        let dataArray = combinedData.map((prop, key) => {
            return {
                id: key,
                name: prop.jobName,
                env: prop.environment,
                build: prop.buildReference,
                jobType: prop.jobType,
                trigger: prop.triggeredBy ? prop.triggeredBy.userName : null,
                status: prop.jobStatus,
                totalcount: prop.allCount,
                passcount: prop.passedCount,
                failcount: prop.failedCount,
                skip: prop.notRunCount
            };
        });
        // console.log(dataArray, "dataArray")
        var jobName = dataArray[0].hasOwnProperty("name");
        var environment = dataArray[0].hasOwnProperty("env");
        var buildNumber = dataArray[0].hasOwnProperty("build");
        var jobType = dataArray[0].hasOwnProperty("jobType");
        var trigger = dataArray[0].hasOwnProperty("trigger");
        var totalCount = dataArray[0].hasOwnProperty("totalcount");
        var failCount = dataArray[0].hasOwnProperty("failcount");
        var skip = dataArray[0].hasOwnProperty("skip");

        expect(jobName).toEqual(true);
        expect(environment).toEqual(true);
        expect(buildNumber).toEqual(true);
        expect(jobType).toEqual(true);
        expect(trigger).toEqual(true);
        expect(totalCount).toEqual(true);
        expect(failCount).toEqual(true);
        expect(skip).toEqual(true);

    });
});
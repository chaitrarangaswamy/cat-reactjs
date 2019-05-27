import React from "react";
import buildetailsJson from "./buildDetails.json";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
import _ from "underscore";

describe("Build Details based on the job details", () => {
  it("card section of highlevel info of the job", () => {
    var jobName,
      buildReference,
      environment,
      startTime,
      endTime,
      duration,
      jobStatus;
    var result = buildetailsJson;
    jobName = result.searchResult[0].jobDetails.jobName;
    buildReference = result.searchResult[0].jobDetails.buildReference;
    environment = result.searchResult[0].jobDetails.environment;
    startTime = result.searchResult[0].jobDetails.startDateTime;
    endTime = result.searchResult[0].jobDetails.endDateTime;
    duration = result.searchResult[0].jobDetails.duration;
    jobStatus = result.searchResult[0].jobDetails.jobStatus;

    expect(jobName).toEqual("UI_BAT_Booking");
    expect(buildReference).toEqual("1073");
    expect(environment).toEqual("in2");
    expect(startTime).toEqual("2018-10-19T12:12:21Z");
    expect(jobStatus).toEqual("COMPLETED");
  });

  it("line graph params in the buildetails page", () => {
    const data = [];
    const labelData = [];
    let a = 1;
    var testDetails =
      buildetailsJson.searchResult[0].testcaseDetails[0].testcases;
    if (testDetails !== null) {
      _.each(testDetails, obj => {
        data.push(obj.testcaseResult);
      });
      for (let i = 0; i < testDetails.length; i++) {
        labelData[i] = a;
        a++;
      }
    }
    expect(
      buildetailsJson.searchResult[0].testcaseDetails[0].testCollectionName
    ).toEqual("Booking_Suite");
    expect(testDetails.length).toEqual(7);
    expect(labelData).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(data).toEqual([
      "FAIL",
      "PASS",
      "PASS",
      "PASS",
      "PASS",
      "PASS",
      "PASS"
    ]);
  });

  it("Test cases details in the buildetails page", () => {
    var id = [],
      testId = [],
      testDescription = [],
      confirmationNumber = [],
      testcaseResult = [],
      duration = [],
      comments = [];
    var testDetails =
      buildetailsJson.searchResult[0].testcaseDetails[0].testcases;
    _.each(testDetails, obj => {
      id.push(obj._id);
      testId.push(obj.testId);
      testDescription.push(obj.testDescription.scenarioLabel);
      confirmationNumber.push(obj._id);
      testcaseResult.push(obj.confirmationNumber);
      duration.push(obj.duration);
      comments.push(obj.comments);
    });
    expect(testDetails.length).toEqual(7);
    expect(testDetails[0].testDescription.scenarioDescription).toEqual(
      "TA Booking - silo1 - One Way - 1 Pax - Hotel - Car"
    );
    expect(id).toHaveLength(7);
    expect(confirmationNumber[1]).toBe("5bc9ca2766ae38425a56691b");
  });
});

import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
import _ from "underscore";
const data = [
  {
    _id: "5bb678e8705926dae1a48090",
    projectName: "ccmod",
    release: "com1910",
    jobName: "job1",
    buildReference: "1",
    jobType: "selenium",
    startDateTime: "2018-11-09T05:41:35Z"
  },
  {
    _id: "5bb67915705926dae1a48091",
    projectName: "ccmod",
    release: "com1910",
    jobName: "job2",
    buildReference: "2",
    jobType: "selenium",
    startDateTime: "2018-11-10T05:41:35Z"
  },
  {
    _id: "5bb67977705926dae1a48093",
    projectName: "ccmod",
    release: "com1911",
    jobName: "job4",
    buildReference: "4",
    jobType: "selenium",
    startDateTime: "2018-11-12T05:41:35Z"
  },
  {
    _id: "5bb6799c705926dae1a48094",
    projectName: "ccmod",
    release: "com1910",
    jobName: "job5",
    buildReference: "5",
    jobType: "soapui"
  }
];

describe("Project dashboard", () => {
  it("Project details counts, Verify cartSection", () => {
    const seleniumArray = [],
      soapuiArray = [];
    let release;
    if (data !== null) {
      _.each(data, obj => {
        if (obj.jobType === "selenium") {
          seleniumArray.push(obj.jobType);
        }
        if (obj.jobType === "soapui") {
          soapuiArray.push(obj.jobType);
        }
      });
      release = _.uniq(data, "release");
    }
    expect(data.length).toEqual(4);
    expect(seleniumArray.length).toEqual(3);
    expect(soapuiArray.length).toEqual(1);
    expect(release.length).toEqual(2);
  });

  it("Verify barchart section", () => {
    const sliceSize = 10;
    let result;
    let arrayChunk = data;
    arrayChunk.map(data => {
      if (data.projectName) {
        result = _.chain(arrayChunk)
          .groupBy("release")
          .map(function(value, key) {
            return {
              release: key,
              jobs: _.pluck(value, "jobName")
            };
          })
          .value();
      } else {
        return (
          (jobName = [...jobName, data.jobName]),
          (buildReference = [...buildReference, data.buildReference]),
          (valuePassed = [...valuePassed, data.passedCount]),
          (failedCount = [...failedCount, data.failedCount])
        );
      }
      return null;
    });
    expect(result).toEqual([
      { jobs: ["job1", "job2", "job5"], release: "com1910" },
      { jobs: ["job4"], release: "com1911" }
    ]);
  });

  it("Verify piechart section", () => {
    let finalSeleniumSearchData = [],
      finalSoapuiSearchData = [],
      totalData = [];
    let projectData = data;
    if (projectData.length > 0) {
      projectData.map(data => {
        if (data.jobType === "selenium") {
          finalSeleniumSearchData.push(data);
        } else if (data.jobType === "soapui") {
          finalSoapuiSearchData.push(data);
        }
      });
      totalData = finalSeleniumSearchData.length + finalSoapuiSearchData.length;

      if (finalSeleniumSearchData.length !== null) {
        finalSeleniumSearchData = Math.round(
          (finalSeleniumSearchData.length / totalData) * 100
        );
      } else {
        finalSeleniumSearchData = 0;
      }

      if (finalSoapuiSearchData.length !== null) {
        finalSoapuiSearchData = Math.round(
          (finalSoapuiSearchData.length / totalData) * 100
        );
      } else {
        finalSoapuiSearchData = 0;
      }
    }
    expect(finalSeleniumSearchData).toEqual(75);
    expect(finalSoapuiSearchData).toEqual(25);
  });

  it("Verify table section", () => {
    let tableData = data;
    let release = [],
      Project = [],
      jobName = [];
    tableData.map(data => {
      release.push(data.release);
      Project.push(data.projectName);
      jobName.push(data.jobName);
    });
    expect(release).toBeTruthy();
    expect(Project).toBeTruthy();
    expect(jobName).toBeTruthy();
  });
});

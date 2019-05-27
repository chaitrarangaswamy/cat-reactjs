import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })
import soapMetaDataResponse from "./soapMetaData";
import * as R from "ramda";

describe("Verify MetaData Management for functional testing", () => {
    var arrayToReturn = [];
    var checkedValueArray = [];
    var uncheckedValueArray = [];
    var projectData = [];
    it("testing renderProjectContent of SoapMetaData", () => {
        // console.log(soapMetaDataResponse)
        for (var prop in soapMetaDataResponse) {
            var obj = {
                "key": prop,
                "projectName": prop,
                "value": soapMetaDataResponse[prop].testSuites
            }
            arrayToReturn.push(obj);
        }
        // console.log(arrayToReturn, "arrayToReturn")
        expect(arrayToReturn[0].projectName).toEqual("A2GO_Test");
        expect(arrayToReturn[0].value.length).toBe(1);
        expect(arrayToReturn[1].projectName).toEqual("SoapUI CAT Print_Manifest");
        expect(arrayToReturn[1].value.length).toBe(3);
        expect(arrayToReturn[2].projectName).toEqual("WS_Sample1");
        expect(arrayToReturn[2].value.length).toBe(3);
        expect(arrayToReturn[3].projectName).toEqual("WS_Sample3");
        expect(arrayToReturn[3].value.length).toBe(1);

    });
    it("testing renderContent of SoapTable", () => {
        let arrayOfEachTableValue;
        var projectName = arrayToReturn[1].projectName;
        arrayOfEachTableValue = arrayToReturn[1].value.map(each => {
            return {
                testSuite: each.testSuite,
                metatags: each.metatags,
            }
        });
        expect(arrayOfEachTableValue[0].testSuite).toEqual("Test1,booking");
        expect(arrayOfEachTableValue[0].metatags.length).toBe(2);
        expect(arrayOfEachTableValue[1].testSuite).toEqual("Test");
        expect(arrayOfEachTableValue[1].metatags.length).toBe(1);
        expect(arrayOfEachTableValue[2].testSuite).toEqual("car");
        expect(arrayOfEachTableValue[2].metatags.length).toBe(3);


    })
    it("testing handleTrigger method to obtain  all the  testcases to review and execute", () => {
        var testCaseObjs = [{
                "projectName": "WS_Sample1",
                "metatags": ["@cc,@WWW"],
                "testSuite": "cc"
            }, {
                "projectName": "SoapUI CAT Print_Manifest",
                "metatags": ["@Booking,@test1"],
                "testSuite": "Test1,booking"
            },
            {
                "projectName": "SoapUI CAT Print_Manifest",
                "metatags": ["@test"],
                "testSuite": "Test"
            },
            {
                "projectName": "WS_Sample3",
                "metatags": ["@cc, @WWW"],
                "testSuite": "cc"
            },
            {
                "projectName": "SoapUI CAT Print_Manifest",
                "testSuite": "Test"
            }
        ]

        testCaseObjs.map(each => {
            if (Object.keys(each).length > 2) {
                checkedValueArray.push(each)
            } else {
                uncheckedValueArray.push(each)
            }
        })
        expect(testCaseObjs.length).toBe(5);
        expect(checkedValueArray.length).toBe(4);
        expect(uncheckedValueArray.length).toBe(1);
    });
    it("testing filterUnchecked method to filter out the testcases that where unchecked", () => {
        var data = uncheckedValueArray[0];
        for (var i = checkedValueArray - 1; i >= 0; --i) {
            if (checkedValueArray[i].sheet == data.sheet && checkedValueArray[i].id == data.id) {
                checkedValueArray.splice(i, 1);
            }
        }
        expect(checkedValueArray.length).toBe(4);
    });
    it("soap meta data search", () => {
        var metaSearch = "@cc,@WWW",
            type = "or",
            search = 1;
        const searchObj = {}
        if (!R.isEmpty(metaSearch)) {
            var tags = metaSearch.split(',');
            var metaTags = R.filter(tag => tag.startsWith('@'), tags);
            if (search === 1) {
                searchObj['metaTags'] = metaSearch;
                searchObj['type'] = type;
            } else {
                searchObj['metaTags'] = metaTags;
                searchObj['rangeCount'] = 3;
                searchObj['rangeFrom'] = 0;
                searchObj['type'] = type;
            }
        }
        expect(tags.length).toEqual(2);
        expect(metaTags.length).toEqual(2);
        expect(searchObj.type).toEqual("or");
        expect(searchObj.metaTags.length).toEqual(8);
    })
    it("soap meta data search", () => {
        var metaSearch = "@cc,@WWW",
            type = "and",
            search = 1;
        const searchObj = {}
        if (!R.isEmpty(metaSearch)) {
            var tags = metaSearch.split(',');
            var metaTags = R.filter(tag => tag.startsWith('@'), tags);
            if (search === 1) {
                searchObj['metaTags'] = metaSearch;
                searchObj['type'] = type;
            } else {
                searchObj['metaTags'] = metaTags;
                searchObj['rangeCount'] = 3;
                searchObj['rangeFrom'] = 0;
                searchObj['type'] = type;
            }
        }
        expect(tags.length).toEqual(2);
        expect(metaTags.length).toEqual(2);
        expect(searchObj.type).toEqual("and");
        expect(searchObj.metaTags.length).toEqual(8);
    });
    it("testing preTrigger method", () => {
        var checkedItems = [{
                "projectName": "WS_Sample1",
                "metatags": ["@cc,@WWW"],
                "testSuite": "cc"
            }, {
                "projectName": "SoapUI CAT Print_Manifest",
                "metatags": ["@Booking,@test1"],
                "testSuite": "Test1,booking"
            },
            {
                "projectName": "SoapUI CAT Print_Manifest",
                "metatags": ["@test"],
                "testSuite": "Test"
            },
            {
                "projectName": "WS_Sample3",
                "metatags": ["@cc, @WWW"],
                "testSuite": "cc"
            }
        ]
        R.forEach(item => {
            let project = R.find(R.propEq('projectName', item.projectName))(projectData);
            if (project) {
                project.testSuites.push(item);
            } else {
                project = { projectName: item.projectName, testSuites: [item] };
                projectData.push(project);

            }
        }, checkedItems);
    })
    it("testing format method", function() {
        const toReturn = {};
        toReturn['Projects'] = projectData;
        toReturn['jobParameters'] = {}
        expect(projectData.length).toEqual(3);
        expect(projectData[0].projectName).toEqual("WS_Sample1");
        expect(projectData[0].testSuites.length).toEqual(1);
        expect(projectData[1].projectName).toEqual("SoapUI CAT Print_Manifest");
        expect(projectData[1].testSuites.length).toEqual(2);
        expect(projectData[2].projectName).toEqual("WS_Sample3");
        expect(projectData[2].testSuites.length).toEqual(1);
    });

})
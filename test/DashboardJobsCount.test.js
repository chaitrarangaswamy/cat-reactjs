import React from 'react';
import DashboardJobsCount from '../views/Dashboard/DashboardJobsCount';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })
import _ from "underscore";
import * as R from "ramda";
import seleniumResult from './seleniumJobDetails';
import soapResult from './soapJobDetails';

describe('Job runs details,Verify cartSection', () => {
    it("testing datacalc method", () => {
        const wrapper = shallow( < DashboardJobsCount / > )

        const totaljob = seleniumResult.searchResult.length + soapResult.length;
        const passedArray = [];
        const failedArray = [];
        var passedCount, failedCount, inProgress = 0;
        let combinedData = R.concat(seleniumResult.searchResult, soapResult);
        _.each(combinedData, obj => {
            obj.passedCount ?
                passedArray.push(obj.passedCount) :
                passedArray.push(0);
            passedCount = passedArray.reduce((a, b) => a + b, 0);
            obj.failedCount ?
                failedArray.push(obj.failedCount) :
                failedArray.push(0);
            failedCount = failedArray.reduce((a, b) => a + b, 0);
            if (obj.jobStatus && obj.jobStatus === "INPROGRESS") {
                inProgress = inProgress + 1;
            }
        })


        expect(totaljob).toEqual(4)
        expect(passedCount).toEqual(74);
        expect(failedCount).toEqual(10);
        expect(inProgress).toEqual(0);

    });
})
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })
import seleniumResult from './seleniumJobDetails';
import soapResult from './soapJobDetails';
import * as R from "ramda";

describe('Verify BarCharts', () => {
    it("testing slicing method", () => {

        let combinedData = R.concat(seleniumResult.searchResult, soapResult);
        const sliceSize = 2;
        let arrayToReturn = [];
        for (let i = 0; i < combinedData.length; i += sliceSize) {
            arrayToReturn.push(combinedData.slice(i, i + sliceSize));
        }

        expect(arrayToReturn.length).toEqual(2)
    });

})
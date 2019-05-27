import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })
import seleniumResult from './seleniumJobDetails';
import soapResult from './soapJobDetails';

describe("Verify pie chart", () => {
    it("testing total,seleniumPercent and soapPercent methods", () => {

        var totalSearchData = seleniumResult.searchResult.length + soapResult.length;
        expect(totalSearchData).toEqual(4);
        var seleniumPercent = Math.round(
            (seleniumResult.searchResult.length / totalSearchData) * 100
        );
        expect(seleniumPercent).toEqual(50)
        var soapPercent = Math.round(
            (soapResult.length / totalSearchData) * 100
        );
        expect(soapPercent).toEqual(50)
    });

})
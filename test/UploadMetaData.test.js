import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });


describe("Verify Upload Meta Data", () => {
    it("testing filetype to be csv", () => {
        var selectedValue = "csv",
            xlsxFileTypeError = false,
            csvFileTypeError = false
        var files = {
                0: {
                    "lastModified": 1541396725204,
                    "lastModifiedDate": "Mon Nov 05 2018 11:15:25 GMT+0530 (India Standard Time) {}",
                    "name": "metadatacsvformat.csv",
                    "size": 85,
                    "type": "text/csv",
                    "webkitRelativePath": ""
                },
                length: 1

            }
            // console.log(files[0])
        var check = files[0].name.split('.').pop();
        if (check !== 'xlsx' && selectedValue === "selenium") {
            xlsxFileTypeError = true
        } else if (check !== 'csv' && selectedValue === "csv") {
            csvFileTypeError = true
            expect(csvFileTypeError).toEqual(true)
        } else {
            csvFileTypeError = false;
            xlsxFileTypeError = false
        }
    });
    it("testing filetype to be xlsx", () => {
        var selectedValue = "selenium",
            xlsxFileTypeError = false,
            csvFileTypeError = false
        var files = {
                0: {
                    "lastModified": 1537872442263,
                    "lastModifiedDate": "Tue Sep 25 2018 16:17:22 GMT+0530 (India Standard Time) {}",
                    "name": "metadataxlsxformat.xlsx",
                    "size": 32520,
                    "type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "webkitRelativePath": ""
                },
                length: 1

            }
            // console.log(files[0])
        var check = files[0].name.split('.').pop();
        if (check !== 'xlsx' && selectedValue === "selenium") {
            xlsxFileTypeError = true
            expect(xlsxFileTypeError).toEqual(true)
        } else if (check !== 'csv' && selectedValue === "csv") {
            csvFileTypeError = true
            expect(csvFileTypeError).toEqual(true)
        } else {
            csvFileTypeError = false;
            xlsxFileTypeError = false
        }

    });
    it("testing canBeSubmitted", () => {
        var submit = function() {
            const refName = "ref",
                selectedValue = "csv",
                file = {
                    0: {
                        "lastModified": 1541396725204,
                        "lastModifiedDate": "Mon Nov 05 2018 11:15:25 GMT+0530 (India Standard Time) {}",
                        "name": "metadatacsvformat.csv",
                        "size": 85,
                        "type": "text/csv",
                        "webkitRelativePath": ""
                    },
                    length: 1

                },
                xlsxFileTypeError = false,
                csvFileTypeError = false

            return refName.length > 0 && selectedValue.length > 0 && Object.keys(file).length > 0 && xlsxFileTypeError === false && csvFileTypeError === false
        }
        expect(submit()).toEqual(true);
    })
    it("testing upload", () => {
        var obj = {
            "refName": "ref",
            "selectedValue": "csv",
            "file": {
                0: {
                    "lastModified": 1541396725204,
                    "lastModifiedDate": "Mon Nov 05 2018 11:15:25 GMT+0530 (India Standard Time) {}",
                    "name": "metadatacsvformat.csv",
                    "size": 85,
                    "type": "text/csv",
                    "webkitRelativePath": ""
                },
                length: 1

            }
        }
        var check = obj.file[0].name.split('.').pop();
        expect(check).toEqual("csv");
        expect(obj.refName).toEqual("ref");
        expect(obj.file[0].name).toEqual("metadatacsvformat.csv");
    });
})
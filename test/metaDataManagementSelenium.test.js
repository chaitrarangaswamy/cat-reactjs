import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })
import seleniumMetaDataResponse from "./seleniumMetaData";
import * as R from "ramda";

describe("Verify MetaData Management for functional testing", () => {
    var arrayToReturn = [];
    var checkedValueArray = [];
    var uncheckedValueArray = [];
    var sheetsArray = [];
    var params;
    it("testing renderProjectContent method of MetaDataTable", () => {
        // console.log(seleniumMetaDataResponse, "seleniumMetaDataResponse")
        for (var prop in seleniumMetaDataResponse) {
            // console.log(prop, "prop")
            // console.log(seleniumMetaDataResponse[prop], "+++")
            for (var sheet in seleniumMetaDataResponse[prop]) {
                // console.log(sheet, "sheet")
                var obj = {
                    "value": seleniumMetaDataResponse[prop][sheet],
                    "workbook": prop,
                    "sheet": sheet
                }
                arrayToReturn.push(obj);
            }
        }

        // console.log(arrayToReturn, "arrayToReturn")
        expect(arrayToReturn[0].sheet).toEqual("AC_web");
        expect(arrayToReturn[0].value.length).toBe(3);
        expect(arrayToReturn[0].workbook).toEqual("AU_Reg_Set3_Flight_Car (1).xlsx");
        expect(arrayToReturn[1].sheet).toEqual("FC_Web");
        expect(arrayToReturn[1].value.length).toBe(3);
        expect(arrayToReturn[1].workbook).toEqual("AU_Reg_Set3_Flight_Car (1).xlsx");
        expect(arrayToReturn[2].sheet).toEqual("SAC_web");
        expect(arrayToReturn[2].value.length).toBe(2);
        expect(arrayToReturn[2].workbook).toEqual("AU_Reg_Test.xlsx");

    });
    it("testing renderContent method of SeleniumTable", () => {
        // console.log(arrayToReturn, "arrayToReturn")
        let arrayOfEachTableValue;
        arrayOfEachTableValue = arrayToReturn[0].value.map(eachParameter => {
            return {
                id: eachParameter.testParameters['Iteraions'],
                iteration: eachParameter.testParameters['Iteraions'],
                scenario: eachParameter.testParameters['Scenario'],
                scenarioDesc: eachParameter.testParameters['Scenario Description'],
                metaDataTags: eachParameter.testParameters['MetaDataTags']
            }
        });
        // console.log(arrayOfEachTableValue, "arrayOfEachTableValue")  //each table content
        expect(arrayOfEachTableValue[0].iteration).toEqual('1'); //testing each row content of a initial table
        expect(arrayOfEachTableValue[0].scenario).toEqual('F+C - 1 Adult no bags and Seats with sign in (Visa Debit)');
        expect(arrayOfEachTableValue[0].scenarioDesc).toEqual('F+C - 1 Adult no bags and Seats with sign in');
        expect(arrayOfEachTableValue[0].metaDataTags).toEqual('@Booking,@Car,@WWW');
        expect(arrayOfEachTableValue[1].iteration).toEqual('2'); //testing each row content of a initial table
        expect(arrayOfEachTableValue[1].scenario).toEqual('F+C - booking within 24 hrs (Visa Debit)');
        expect(arrayOfEachTableValue[1].scenarioDesc).toEqual('F+C - booking within 24 hrs');
        expect(arrayOfEachTableValue[1].metaDataTags).toEqual('@Booking,@test');
        expect(arrayOfEachTableValue[2].iteration).toEqual('3'); //testing each row content of a initial table
        expect(arrayOfEachTableValue[2].scenario).toEqual('F+C, OW, 1 Adult - price per person (Visa Credit)');
        expect(arrayOfEachTableValue[2].scenarioDesc).toEqual('F+C, OW, 1 Adult - price per person');
        expect(arrayOfEachTableValue[2].metaDataTags).toEqual('@Booking,@test1');

    });
    it("testing handleTrigger method to obtain  all the  testcases to review and execute", () => {
        var testCaseObjs = [{
                "checked": true,
                "id": { "Iteraions": "1", "Run Mode": "Y", "Scenario": "F+C - 1 Adult no bags and Seats with sign in (Visa Debit)", "Scenario Description": " F+C - 1 Adult no bags and Seats with sign in", "Results": "PASS", "Confirmation Number": null, "SignIn": "Y", "Display Name": "test", "Departure City": "CVG", "Destination City": "SFB", "Trip Type": "One way", "Dep Date": "15", "Return Date": null, "Adults": "1", "Childs": "0", "Child Month": null, "Child Date": null, "Child Year": null, "Hotel": "No", "ViaHotel": "No", "Changeloc": null, "Checkindate": null, "Checkoutdate": null, "Car": "Yes", "ViaCar": null, "Shuttle": "No", "Specials": "No", "Adults Fname": "Imthi", "Adults Lname": "Yosuf", "Adults_DOB": "3/3/1980", "Adults Gender": "male", "SSR": "No", "Child Fname": null, "Child Lname": null, "Child Gender": null, "Dep Seats": "No", "Ret Seats": null, "Adults Bags": "No|No|No", "Child Bags": null, "TripFlex": "Yes", "CardType": "Visa Debit", "CardNo": "4000229995830814", "expMonth": "04 April", "expYear": "2026", "cvv": "123", "cardName": "Automation", "Comments": null, "ModifyPath": null, "ModifyBags": null, "NewBags": null, "ModifySeats": null, "New_depSeats": null, "New_retSeats": null, "MetaDataTags": "@Booking,@Car,@WWW", "UNKNOWN 54": null, "UNKNOWN 55": null },
                "scenario": "F+C - 1 Adult no bags and Seats with sign in (Visa Debit)",
                "scenariodescription": " F+C - 1 Adult no bags and Seats with sign in",
                "sheet": "FC_Web",
                "workbook": "AU_Reg_Set3_Flight_Car (1).xlsx"
            },
            {
                "checked": true,
                "id": { "Iteraions": "2", "Run Mode": "Y", "Scenario": "F+C - booking within 24 hrs (Visa Debit)", "Scenario Description": " F+C - booking within 24 hrs", "Results": "PASS", "Confirmation Number": null, "SignIn": "N", "Display Name": "test", "Departure City": "BLI", "Destination City": "LAS", "Trip Type": "Round Trip", "Dep Date": "0", "Return Date": "9", "Adults": "2", "Childs": "0", "Child Month": null, "Child Date": null, "Child Year": null, "Hotel": "No", "ViaHotel": "No", "Changeloc": null, "Checkindate": null, "Checkoutdate": null, "Car": "Yes", "ViaCar": null, "Shuttle": "No", "Specials": "No", "Adults Fname": "Imthi|john", "Adults Lname": "Yosuf|will", "Adults_DOB": "03/03/1980|06/06/1986", "Adults Gender": "male|male", "SSR": "No|No", "Child Fname": null, "Child Lname": null, "Child Gender": null, "Dep Seats": "No|No", "Ret Seats": "No|No", "Adults Bags": "No|No|No||No|No|No", "Child Bags": null, "TripFlex": "Yes", "CardType": "Visa Debit", "CardNo": "4000229995830814", "expMonth": "04 April", "expYear": "2026", "cvv": "123", "cardName": "Automation", "Comments": null, "ModifyPath": null, "ModifyBags": null, "NewBags": null, "ModifySeats": null, "New_depSeats": null, "New_retSeats": null, "MetaDataTags": "@Booking,@Car,@WWW,@24hrsBooking", "UNKNOWN 54": null, "UNKNOWN 55": null },
                "scenario": "F+C - booking within 24 hrs (Visa Debit)",
                "scenariodescription": " F+C - booking within 24 hrs",
                "sheet": "FC_Web",
                "workbook": "AU_Reg_Set3_Flight_Car (1).xlsx"
            }, {
                "checked": true,
                "id": { "Iteraions": "1", "Run Mode": "Y", "Scenario": "F+C - 1 Adult no bags and Seats with sign in (Visa Debit)", "Scenario Description": " F+C - 1 Adult no bags and Seats with sign in", "Results": "PASS", "Confirmation Number": null, "SignIn": "Y", "Display Name": "test", "Departure City": "CVG", "Destination City": "SFB", "Trip Type": "One way", "Dep Date": "15", "Return Date": null, "Adults": "1", "Childs": "0", "Child Month": null, "Child Date": null, "Child Year": null, "Hotel": "No", "ViaHotel": "No", "Changeloc": null, "Checkindate": null, "Checkoutdate": null, "Car": "Yes", "ViaCar": null, "Shuttle": "No", "Specials": "No", "Adults Fname": "Imthi", "Adults Lname": "Yosuf", "Adults_DOB": "3/3/1980", "Adults Gender": "male", "SSR": "No", "Child Fname": null, "Child Lname": null, "Child Gender": null, "Dep Seats": "No", "Ret Seats": null, "Adults Bags": "No|No|No", "Child Bags": null, "TripFlex": "Yes", "CardType": "Visa Debit", "CardNo": "4000229995830814", "expMonth": "04 April", "expYear": "2026", "cvv": "123", "cardName": "Automation", "Comments": null, "ModifyPath": null, "ModifyBags": null, "NewBags": null, "ModifySeats": null, "New_depSeats": null, "New_retSeats": null, "MetaDataTags": "@Booking,@Car,@WWW", "UNKNOWN 54": null, "UNKNOWN 55": null },
                "scenario": "F+C - 1 Adult no bags and Seats with sign in (Visa Debit)",
                "scenariodescription": " F+C - 1 Adult no bags and Seats with sign in",
                "sheet": "AC_web",
                "workbook": "AU_Reg_Set3_Flight_Car (1).xlsx"
            }, {
                "checked": true,
                "id": { "Iteraions": "1", "Run Mode": "Y", "Scenario": "F+C - 1 Adult no bags and Seats with sign in (Visa Debit)", "Scenario Description": " F+C - 1 Adult no bags and Seats with sign in", "Results": "PASS", "Confirmation Number": null, "SignIn": "Y", "Display Name": "test", "Departure City": "CVG", "Destination City": "SFB", "Trip Type": "One way", "Dep Date": "15", "Return Date": null, "Adults": "1", "Childs": "0", "Child Month": null, "Child Date": null, "Child Year": null, "Hotel": "No", "ViaHotel": "No", "Changeloc": null, "Checkindate": null, "Checkoutdate": null, "Car": "Yes", "ViaCar": null, "Shuttle": "No", "Specials": "No", "Adults Fname": "Imthi", "Adults Lname": "Yosuf", "Adults_DOB": "3/3/1980", "Adults Gender": "male", "SSR": "No", "Child Fname": null, "Child Lname": null, "Child Gender": null, "Dep Seats": "No", "Ret Seats": null, "Adults Bags": "No|No|No", "Child Bags": null, "TripFlex": "Yes", "CardType": "Visa Debit", "CardNo": "4000229995830814", "expMonth": "04 April", "expYear": "2026", "cvv": "123", "cardName": "Automation", "Comments": null, "ModifyPath": null, "ModifyBags": null, "NewBags": null, "ModifySeats": null, "New_depSeats": null, "New_retSeats": null, "MetaDataTags": "@Booking,@Car,@WWW", "UNKNOWN 54": null, "UNKNOWN 55": null },
                "scenario": "F+C - 1 Adult no bags and Seats with sign in (Visa Debit)",
                "scenariodescription": " F+C - 1 Adult no bags and Seats with sign in",
                "sheet": "SAC_web",
                "workbook": "AU_Reg_Test.xlsx"
            }, {
                "id": "2",
                "sheet": "AC_web"
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
    it("selenium meta data search", () => {
        var metaSearch = "@Booking,@Car",
            type = "or",
            search = 0;
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
        expect(searchObj.metaTags.length).toEqual(2);
    })
    it("selenium meta data search", () => {
        var metaSearch = "@Booking,@Car",
            type = "and",
            search = 0;
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
        expect(searchObj.metaTags.length).toEqual(2);
    });
    it("testing trigger method", () => {
        var serverValues = {
            "Datasheet.xlsx": { type: "file" },
            "ENVJOB": {
                setValue: "STG:silo1:FullRegression",
                type: "choice",
                value: ["STG:silo1:FullRegression", "QA1:silo1:FullRegression", "QA2:silo1:FullRegression"]
            },
            "branch": {
                setValue: "origin/master",
                type: "choice",
                value: ["origin/master"]
            }

        }

        var checkedData = [{
                "checked": true,
                "id": { "Iteraions": "1", "Run Mode": "Y", "Scenario": "F+C - 1 Adult no bags and Seats with sign in (Visa Debit)", "Scenario Description": " F+C - 1 Adult no bags and Seats with sign in", "Results": "PASS", "Confirmation Number": null, "SignIn": "Y", "Display Name": "test", "Departure City": "CVG", "Destination City": "SFB", "Trip Type": "One way", "Dep Date": "15", "Return Date": null, "Adults": "1", "Childs": "0", "Child Month": null, "Child Date": null, "Child Year": null, "Hotel": "No", "ViaHotel": "No", "Changeloc": null, "Checkindate": null, "Checkoutdate": null, "Car": "Yes", "ViaCar": null, "Shuttle": "No", "Specials": "No", "Adults Fname": "Imthi", "Adults Lname": "Yosuf", "Adults_DOB": "3/3/1980", "Adults Gender": "male", "SSR": "No", "Child Fname": null, "Child Lname": null, "Child Gender": null, "Dep Seats": "No", "Ret Seats": null, "Adults Bags": "No|No|No", "Child Bags": null, "TripFlex": "Yes", "CardType": "Visa Debit", "CardNo": "4000229995830814", "expMonth": "04 April", "expYear": "2026", "cvv": "123", "cardName": "Automation", "Comments": null, "ModifyPath": null, "ModifyBags": null, "NewBags": null, "ModifySeats": null, "New_depSeats": null, "New_retSeats": null, "MetaDataTags": "@Booking,@Car,@WWW", "UNKNOWN 54": null, "UNKNOWN 55": null },
                "scenario": "F+C - 1 Adult no bags and Seats with sign in (Visa Debit)",
                "scenariodescription": " F+C - 1 Adult no bags and Seats with sign in",
                "sheet": "FC_Web",
                "workbook": "AU_Reg_Set3_Flight_Car (1).xlsx"
            },
            {
                "checked": true,
                "id": { "Iteraions": "2", "Run Mode": "Y", "Scenario": "F+C - booking within 24 hrs (Visa Debit)", "Scenario Description": " F+C - booking within 24 hrs", "Results": "PASS", "Confirmation Number": null, "SignIn": "N", "Display Name": "test", "Departure City": "BLI", "Destination City": "LAS", "Trip Type": "Round Trip", "Dep Date": "0", "Return Date": "9", "Adults": "2", "Childs": "0", "Child Month": null, "Child Date": null, "Child Year": null, "Hotel": "No", "ViaHotel": "No", "Changeloc": null, "Checkindate": null, "Checkoutdate": null, "Car": "Yes", "ViaCar": null, "Shuttle": "No", "Specials": "No", "Adults Fname": "Imthi|john", "Adults Lname": "Yosuf|will", "Adults_DOB": "03/03/1980|06/06/1986", "Adults Gender": "male|male", "SSR": "No|No", "Child Fname": null, "Child Lname": null, "Child Gender": null, "Dep Seats": "No|No", "Ret Seats": "No|No", "Adults Bags": "No|No|No||No|No|No", "Child Bags": null, "TripFlex": "Yes", "CardType": "Visa Debit", "CardNo": "4000229995830814", "expMonth": "04 April", "expYear": "2026", "cvv": "123", "cardName": "Automation", "Comments": null, "ModifyPath": null, "ModifyBags": null, "NewBags": null, "ModifySeats": null, "New_depSeats": null, "New_retSeats": null, "MetaDataTags": "@Booking,@Car,@WWW,@24hrsBooking", "UNKNOWN 54": null, "UNKNOWN 55": null },
                "scenario": "F+C - booking within 24 hrs (Visa Debit)",
                "scenariodescription": " F+C - booking within 24 hrs",
                "sheet": "FC_Web",
                "workbook": "AU_Reg_Set3_Flight_Car (1).xlsx"
            }, {
                "checked": true,
                "id": { "Iteraions": "1", "Run Mode": "Y", "Scenario": "F+C - 1 Adult no bags and Seats with sign in (Visa Debit)", "Scenario Description": " F+C - 1 Adult no bags and Seats with sign in", "Results": "PASS", "Confirmation Number": null, "SignIn": "Y", "Display Name": "test", "Departure City": "CVG", "Destination City": "SFB", "Trip Type": "One way", "Dep Date": "15", "Return Date": null, "Adults": "1", "Childs": "0", "Child Month": null, "Child Date": null, "Child Year": null, "Hotel": "No", "ViaHotel": "No", "Changeloc": null, "Checkindate": null, "Checkoutdate": null, "Car": "Yes", "ViaCar": null, "Shuttle": "No", "Specials": "No", "Adults Fname": "Imthi", "Adults Lname": "Yosuf", "Adults_DOB": "3/3/1980", "Adults Gender": "male", "SSR": "No", "Child Fname": null, "Child Lname": null, "Child Gender": null, "Dep Seats": "No", "Ret Seats": null, "Adults Bags": "No|No|No", "Child Bags": null, "TripFlex": "Yes", "CardType": "Visa Debit", "CardNo": "4000229995830814", "expMonth": "04 April", "expYear": "2026", "cvv": "123", "cardName": "Automation", "Comments": null, "ModifyPath": null, "ModifyBags": null, "NewBags": null, "ModifySeats": null, "New_depSeats": null, "New_retSeats": null, "MetaDataTags": "@Booking,@Car,@WWW", "UNKNOWN 54": null, "UNKNOWN 55": null },
                "scenario": "F+C - 1 Adult no bags and Seats with sign in (Visa Debit)",
                "scenariodescription": " F+C - 1 Adult no bags and Seats with sign in",
                "sheet": "AC_web",
                "workbook": "AU_Reg_Set3_Flight_Car (1).xlsx"
            }, {
                "checked": true,
                "id": { "Iteraions": "1", "Run Mode": "Y", "Scenario": "F+C - 1 Adult no bags and Seats with sign in (Visa Debit)", "Scenario Description": " F+C - 1 Adult no bags and Seats with sign in", "Results": "PASS", "Confirmation Number": null, "SignIn": "Y", "Display Name": "test", "Departure City": "CVG", "Destination City": "SFB", "Trip Type": "One way", "Dep Date": "15", "Return Date": null, "Adults": "1", "Childs": "0", "Child Month": null, "Child Date": null, "Child Year": null, "Hotel": "No", "ViaHotel": "No", "Changeloc": null, "Checkindate": null, "Checkoutdate": null, "Car": "Yes", "ViaCar": null, "Shuttle": "No", "Specials": "No", "Adults Fname": "Imthi", "Adults Lname": "Yosuf", "Adults_DOB": "3/3/1980", "Adults Gender": "male", "SSR": "No", "Child Fname": null, "Child Lname": null, "Child Gender": null, "Dep Seats": "No", "Ret Seats": null, "Adults Bags": "No|No|No", "Child Bags": null, "TripFlex": "Yes", "CardType": "Visa Debit", "CardNo": "4000229995830814", "expMonth": "04 April", "expYear": "2026", "cvv": "123", "cardName": "Automation", "Comments": null, "ModifyPath": null, "ModifyBags": null, "NewBags": null, "ModifySeats": null, "New_depSeats": null, "New_retSeats": null, "MetaDataTags": "@Booking,@Car,@WWW", "UNKNOWN 54": null, "UNKNOWN 55": null },
                "scenario": "F+C - 1 Adult no bags and Seats with sign in (Visa Debit)",
                "scenariodescription": " F+C - 1 Adult no bags and Seats with sign in",
                "sheet": "SAC_web",
                "workbook": "AU_Reg_Test.xlsx"
            },
        ]
        params = { ENVJOB: serverValues.ENVJOB.setValue, branch: serverValues.branch.setValue };
        for (let i = 0; i < checkedData.length; i++) {
            checkedData[i].id = new Array(checkedData[i].id);
            sheetsArray.push(checkedData[i])
        }
    });
    it("testing postDataCalc method", () => {
        const data = [];
        const toReturn = {};
        R.forEach(item => {
            let testCase = R.find(R.propEq('sheetName', item.sheet))(data);
            if (testCase) {
                R.forEach(test => {
                    testCase.testcases.push(test);
                }, item.id);
            } else {
                testCase = { jobName: item.sheet, sheetName: item.sheet, testcases: item.id };
                data.push(testCase);
            }
        }, sheetsArray);
        toReturn['jobParameters'] = params;
        toReturn['testcases'] = data;
        expect(data.length).toEqual(3);
        expect(data[0].jobName).toEqual("FC_Web");
        expect(data[0].sheetName).toEqual("FC_Web");
        expect(data[0].testcases.length).toEqual(2);
        expect(data[1].jobName).toEqual("AC_web");
        expect(data[1].sheetName).toEqual("AC_web");
        expect(data[1].testcases.length).toEqual(1);
        expect(data[2].jobName).toEqual("SAC_web");
        expect(data[2].sheetName).toEqual("SAC_web");
        expect(data[2].testcases.length).toEqual(1);
    })


})
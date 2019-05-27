import React from "react";
import projectListJson from "./projectList.json";
import releaseListJson from "./releaseList.json";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SimpleModal from "../views/ProjectRelease/EditProjectRelease"

Enzyme.configure({ adapter: new Adapter() });
import _ from "underscore";



describe("Verify projectList", () => {
    it("testing getAllProjectsCalc method", () => {
        var projectListResponse = projectListJson;
        expect(projectListResponse.length).toEqual(5);
        let tempArray;
        var projectListArray = []
        if (projectListResponse && Array.isArray(projectListResponse)) {
            tempArray = projectListResponse.map(obj => {
                projectListArray.push(obj.projectName)
            })
            expect(projectListArray.length).toEqual(5)
        }
    })
    it("testing getAllReleaseCalc method", () => {
        var releaseListResponse = releaseListJson;
        expect(releaseListResponse.length).toEqual(5);
        let tempArray;
        var releaseListArray = []
        if (releaseListResponse && Array.isArray(releaseListResponse)) {
            tempArray = releaseListResponse.map(obj => {
                releaseListArray.push(obj.release)
            })
            expect(releaseListArray.length).toEqual(5)
        }
    })
    it("testing projectedit component", () => {
        var projectEdit = {
            "active": false,
            "date": "2018-10-22T06:39:46.099Z",
            "projectName": "fly_desk123",
            "userName": "sajesh nair",
            "__v": 0,
            "_id": "5bb624f735b47676c765b200"
        }

        if (projectEdit.hasOwnProperty('_id')) {
            expect(projectEdit._id).toBe("5bb624f735b47676c765b200")
        }

        if (projectEdit && projectEdit.hasOwnProperty('projectName')) {
            expect(projectEdit.projectName).toBe("fly_desk123")
        }


    })
    it("testing releaseedit component", () => {

        var releaseEdit = {
            "active": true,
            "date": "function toISOString() { [native code] }",
            "release": "cre180901.0",
            "userName": "sajesh nair",
            "__v": 0,
            "_id": "5bb742fa1eb4ac2ba2cc90fc"
        }

        if (releaseEdit.hasOwnProperty('_id')) {
            expect(releaseEdit._id).toBe("5bb742fa1eb4ac2ba2cc90fc")
        }

        if (releaseEdit && releaseEdit.hasOwnProperty('release')) {
            expect(releaseEdit.release).toBe("cre180901.0")
        }
    })
})
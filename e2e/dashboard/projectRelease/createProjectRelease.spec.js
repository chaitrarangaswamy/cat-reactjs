// "use strict";

// var config = require("../../configUrl.json");
// var baseUrl = config.url;


// describe("Project Release feature ", function() {
//     beforeEach(function() {
//         browser.driver.manage().window().maximize();
//         browser.waitForAngularEnabled(false);
//         browser.get(baseUrl + "/projectrelease");
//     });
//     it("should navigate to project/release page", function() {
//         browser.waitForAngularEnabled(false);
//         expect(browser.getCurrentUrl()).toEqual(baseUrl + "/projectrelease");
//         browser.sleep(2000);
//         console.log("Should navigate to project/release page");
//     });


//     it("should create project", function() {
//         browser.waitForAngularEnabled(false);
//         browser.sleep(5000);

//         var projectRadioButton = element(by.id("projectid"));
//         projectRadioButton.click()

//         element(by.id('projectRelease')).sendKeys('project1');
//         browser.sleep(3000);

//         var projectbtn = element(by.id("create"));
//         projectbtn.click()

//         browser.sleep(5000);
//     });
//     it("should create release", function() {
//         browser.waitForAngularEnabled(false);
//         browser.sleep(5000);

//         var releaseRadioButton = element(by.id('releaseid'));
//         releaseRadioButton.click();

//         element(by.id('projectRelease')).sendKeys('release1');
//         browser.sleep(3000);

//         var releasebtn = element(by.id("create"))
//         releasebtn.click();

//         browser.sleep(5000);
//     });

//     it("edit project/release", function() {
//         browser.waitForAngularEnabled(false);
//         browser.sleep(5000);
//         browser.findElement(by.xpath("//*[@id='root']/div/div[2]/div[1]/div/div/div[3]/div[1]/div/div[1]/div[2]/table/tbody/tr[1]/td[3]/button[1]")).click();
//         browser.sleep(5000);
//         browser.findElement(by.xpath("/html/body/div[3]/div[2]/div[1]/div[2]")).click();
//         browser.sleep(5000);
//         browser.findElement(by.xpath("/html/body/div[3]/div[2]/div[2]/div[1]/button")).click()
//         browser.sleep(5000);
//     });
//     it("delete project", function() {
//         browser.waitForAngularEnabled(false);
//         browser.sleep(5000);
//         browser
//             .findElement(
//                 by.xpath("(//table)[3]/tbody/tr[position()=last()]/td[3]/button[2]")
//             )
//             .click();
//         browser.sleep(5000);

//     });
//     it("delete release", function() {
//         browser.waitForAngularEnabled(false);
//         browser.sleep(5000);
//         browser
//             .findElement(
//                 by.xpath("(//table)[4]/tbody/tr[position()=last()]/td[3]/button[2]")
//             )
//             .click();
//         browser.sleep(5000);

//     });


// });
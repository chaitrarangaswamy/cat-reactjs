"use strict";

var config = require("../../configUrl.json");
var baseUrl = config.url;

describe("Dashboard table details for current date: ", function() {
    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.get(baseUrl + "/dashboard");
        browser.driver.manage().window().maximize();
    });

    it("should navigate to dashboard page", function() {
        browser.waitForAngularEnabled(false);
        expect(browser.getCurrentUrl()).toEqual(baseUrl + "/dashboard");
        browser.sleep(2000);
        console.log("Should navigate to dashboard page");
    });

    it("should get the data in the dashboard table", function() {
        browser.waitForAngularEnabled(false);
        browser.sleep(5000);
        const EC = protractor.ExpectedConditions;
        var target = element(By.xpath("(//div[@class='rt-td'])[1]/div/div[1]"));
        browser.wait(EC.presenceOf(target));
        target.getText().then(function(txt) {
            console.log("Should load the data in the dashboard table");
        });
    });

    it("should navigate to buildreference page", function() {
        browser.waitForAngularEnabled(false);
        browser.sleep(5000);
        var jobName;
        var build;
        var jobType;
        var EC = protractor.ExpectedConditions;
        var targetjobName = element(
            By.xpath("(//div[@class='rt-td'])[1]/div/div[1]")
        );
        browser.wait(EC.presenceOf(targetjobName));
        targetjobName.getText().then(function(job) {
            jobName = job;
            console.log("jobName " + job);
            var targetbuild = element(By.xpath("(//div[@class='rt-td'])[3]"));
            browser.wait(EC.presenceOf(targetbuild));
            targetbuild.getText().then(function(buildNo) {
                build = buildNo;
                console.log("BuildNo " + buildNo);
            });
            var targetjobType = element(By.xpath("(//div[@class='rt-td'])[4]"));
            browser.wait(EC.presenceOf(targetjobType));
            targetjobType.getText().then(function(jobtype) {
                jobType = jobtype;
                console.log("jobType " + jobtype);
                browser.sleep(3000);
                browser.findElement(by.xpath("(//*[name()='path'])[23]")).click();
                browser.sleep(3000);
                // browser.wait(EC.urlContains(baseUrl + "/builddetails/"), 5000);
                console.log(
                    "Once click on the action button, it should navigate to buildreference page"
                );
            });
        });
    });

    // it("should navigate to Project dashboard page", function() {
    //   browser.sleep(3000);
    //   element(
    //     by.xpath("//div[@id='root']/div/div/div/div/div[2]/ul/li[2]")
    //   ).click();
    //   browser.sleep(3000);
    //   expect(browser.getCurrentUrl()).toEqual(baseUrl + "/projectdashboard");
    //   browser.sleep(3000);
    //   console.log("Route into the Project dashboard page");
    // });

    // it("should navigate to Project/Release", function() {
    //   browser.sleep(3000);
    //   element(
    //     by.xpath("//div[@id='root']/div/div/div/div/div[2]/ul/li[3]")
    //   ).click();
    //   browser.sleep(3000);
    //   expect(browser.getCurrentUrl()).toEqual(baseUrl + "/projectrelease");
    //   browser.sleep(3000);
    //   console.log("Route into the Project/Release page");
    // });
});
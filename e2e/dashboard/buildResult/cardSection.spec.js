"use strict";
var config = require("../../configUrl.json");
var baseUrl = config.url;
var result;

describe("should navigate to buildResults page and verify card section", function() {
    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.get(baseUrl + "/dashboard");
    });
    it("should navigate to dashboard page", function() {
        browser.waitForAngularEnabled(false);
        expect(browser.getCurrentUrl()).toEqual(baseUrl + "/dashboard");
        browser.sleep(2000);
    });
    // it("should click on action button to navigate to buildResult page", function() {
    //     browser.waitForAngularEnabled(false);
    //     browser.sleep(5000);
    //     browser
    //         .findElement(by.xpath("(//div[@class='actions-left']/a)[1]"))
    //         .click();
    //     browser.sleep(3000);
    //     browser.getCurrentUrl().then((url) => {
    //         result = url;
    //         console.log("navigated to buildDetails page and the url is:", url);
    //     });
    // });
    it("should navigate to buildreference page", function() {
        browser.waitForAngularEnabled(false);
        expect(browser.getCurrentUrl()).toEqual(baseUrl + "/dashboard");
        browser.sleep(2000);
        browser.findElement(by.xpath("(//*[name()='path'])[23]")).click();
        browser.sleep(3000);
        browser.getCurrentUrl().then((url) => {
            result = url;
            console.log("navigated to buildDetails page and the url is:", url);
        });
        var EC = protractor.ExpectedConditions;
        var target = element(By.id("bRInCartSection"));
        browser.wait(EC.presenceOf(target));
        target.getText().then(function(txt) {
            console.log('buildreference of a specific job: ' + txt);
        });

        var target = element(By.id("envInCartSection"));
        browser.wait(EC.presenceOf(target));
        target.getText().then(function(txt) {
            console.log('environment of a specific job: ' + txt);
        });

        var target = element(By.id("startTime"));
        browser.wait(EC.presenceOf(target));
        target.getText().then(function(txt) {
            console.log('startTime of a specific job: ' + txt);
        });

        var target = element(By.id("endTime"));
        browser.wait(EC.presenceOf(target));
        target.getText().then(function(txt) {
            console.log('endTime of a specific job: ' + txt);
        });

        var target = element(By.id("duration"));
        browser.wait(EC.presenceOf(target));
        target.getText().then(function(txt) {
            console.log('duration of a specific job: ' + txt);
        });

        var target = element(By.id("jobStatus"));
        browser.wait(EC.presenceOf(target));
        target.getText().then(function(txt) {
            console.log('jobStatus of a specific job: ' + txt);
        });
    });
});
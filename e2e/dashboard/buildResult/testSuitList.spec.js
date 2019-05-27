"use strict";

var config = require("../../configUrl.json");
var baseUrl = config.url;

var result;

describe("should navigate to buildResults page to see list of test suits", function() {
    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.get(baseUrl + "/dashboard");
    });
    it("should navigate to dashboard page", function() {
        browser.waitForAngularEnabled(false);
        expect(browser.getCurrentUrl()).toEqual(baseUrl + "/dashboard");
        browser.sleep(2000);
    });

    it("should click on action button to navigate to buildResult page and see list of test suits", function() {
        browser.waitForAngularEnabled(false);
        browser.sleep(5000);
        browser.findElement(by.xpath("(//*[name()='path'])[23]")).click();
        browser.sleep(3000);
        browser.getCurrentUrl().then((url) => {
            result = url;
            console.log("navigated to buildDetails page and the url is:123", url);
            browser.sleep(3000);
            let list = element.all(by.css('.ct-legend li'));
            expect(list.count()).toBeGreaterThan(0);


        });
    });
    // it("list of test suits", function() {
    //     browser.waitForAngularEnabled(false);
    //     browser
    //         .findElement(by.xpath("(//div[@class='actions-left']/a)[1]"))
    //         .click();
    //     browser.sleep(3000);
    //     browser.getCurrentUrl().then((url) => {
    //         result = url;
    //         console.log("navigated to buildDetails page and the url is:", url);
    //     });
    //     browser.sleep(3000);
    //     let list = element.all(by.css('.ct-legend li'));
    //     expect(list.count()).toBeGreaterThan(0);
    // })
});
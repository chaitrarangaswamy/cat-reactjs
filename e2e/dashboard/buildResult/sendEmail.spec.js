var config = require("../../configUrl.json");
var baseUrl = config.url;

var result;

describe("should navigate to buildResults page to send email", function() {
    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.get(baseUrl + "/dashboard");
    });
    it("should navigate to dashboard page", function() {
        browser.waitForAngularEnabled(false);
        expect(browser.getCurrentUrl()).toEqual(baseUrl + "/dashboard");
        browser.sleep(2000);
    });

    it("should send email users", function() {
        browser.waitForAngularEnabled(false);
        browser.sleep(5000);
        browser.findElement(by.xpath("(//*[name()='path'])[23]")).click();
        browser.sleep(3000);
        browser.getCurrentUrl().then((url) => {
            result = url;
            console.log("navigated to buildDetails page and the url is:", url);
        });

        browser.findElement(by.id("sendEmailIcon"))
            .click();
        browser.sleep(5000);
        browser.findElement(by.id("defaultEmailListButton")).click()
            // browser.sleep(5000);
            // var noMachingJob = browser
            //     .findElement(by.xpath("(//p[@class='noMachingJob'])")).getText()
            // console.log("no maching job found");

        var list = browser.findElement(by.id("sendEmail"));
        list.sendKeys("sajesh.nair@people10.com");
        browser.sleep(5000);
        browser.findElement(by.id("sendEmailTitle"))
            .click();
        browser.sleep(2000);
        browser.findElement(by.id("sendEmailButton"))
            .click();
    });
});
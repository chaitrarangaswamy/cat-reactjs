"use strict";

var config = require("../../configUrl.json");
var baseUrl = config.url;

describe("Piechart details for current date: ", function() {
  beforeEach(function() {
    browser.waitForAngularEnabled(false);
    browser.get(baseUrl + "/dashboard");
  });
  it("should navigate to dashboard page", function() {
    browser.waitForAngularEnabled(false);
    expect(browser.getCurrentUrl()).toEqual(baseUrl + "/dashboard");
    browser.sleep(2000);
    console.log("Should navigate to dashboard page");
  });

  it("should give total count", function() {
    browser.waitForAngularEnabled(false);
    browser.get(baseUrl + "/dashboard");
    browser.sleep(5000);

    var EC = protractor.ExpectedConditions;
    var seleniumPercentage = element(
      By.xpath("(//*[name()='text' and @class])[1]")
    );
    browser.wait(EC.presenceOf(seleniumPercentage));
    seleniumPercentage.getText().then(function(txt) {
      console.log("Validated Selenium percentage");
    });

    var soapPercentage = element(
      By.xpath("(//*[name()='text' and @class])[2]")
    );
    browser.wait(EC.presenceOf(soapPercentage));
    soapPercentage.getText().then(function(txt) {
      console.log("Validated Soapui percentage");
    });
    console.log(
      "Should validating the piechart percentage of Selenium and SoapUI"
    );
  });
});

"use strict";

var config = require("../../configUrl.json");
var baseUrl = config.url;

describe("Barchart details for current date: ", function() {
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

  it("should get the data in the bar-chart", function() {
    browser.waitForAngularEnabled(false);
    browser.sleep(5000);
    const EC = protractor.ExpectedConditions;
    var target = element(
      By.xpath("(//span[@class='ct-label ct-horizontal ct-end'])[1]")
    );
    browser.wait(EC.presenceOf(target));
    target.getText().then(function(txt) {
      console.log("should load the data in the bar-chart UI");
    });
  });
});

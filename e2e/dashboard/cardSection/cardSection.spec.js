"use strict";

var config = require("../../configUrl.json");
var baseUrl = config.url;

describe("verify cart section of dashboard", function() {
  beforeEach(function() {
    browser.waitForAngularEnabled(false);
    browser.get(baseUrl + "/dashboard");
  });
  it("should give the job run details for current day", function() {
    browser.waitForAngularEnabled(false);
    expect(browser.getCurrentUrl()).toEqual(baseUrl + "/dashboard");
    browser.sleep(2000);
    var EC = protractor.ExpectedConditions;
    var target = element(By.id("numberOfJobs"));

    browser.wait(EC.presenceOf(target));

    target.getText().then(function(txt) {
      console.log("total jobs executed on current date: " + txt);
    });

    var target = element(By.id("inProgress"));

    browser.wait(EC.presenceOf(target));

    target.getText().then(function(txt) {
      console.log("total jobs in progress for current date: " + txt);
    });

    var target = element(By.id("passedCount"));

    browser.wait(EC.presenceOf(target));

    target.getText().then(function(txt) {
      console.log("number of testcases passed for current day: " + txt);
    });

    var target = element(By.id("failedCount"));

    browser.wait(EC.presenceOf(target));

    target.getText().then(function(txt) {
      console.log("number of testcases failed for current day: " + txt);
    });
    browser.sleep(5000);
  });
});

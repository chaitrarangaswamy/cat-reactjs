"use strict";

var config = require("../../configUrl.json");
var baseUrl = config.url;

describe("Login UI: ", function() {
  beforeEach(function() {
    browser.waitForAngularEnabled(false);
    browser.get(baseUrl + "/pages/login-page");
  });

  it("Should navigate to login page", function() {
    browser.waitForAngularEnabled(false);
    expect(browser.getCurrentUrl()).toEqual(baseUrl + "/pages/login-page");
    browser.sleep(2000);
    console.log("Should navigate to login page");
  });

  it("Using invalid crendentials for login to expect error message", function() {
    browser.waitForAngularEnabled(false);
    var EC = protractor.ExpectedConditions;
    browser.sleep(3000);
    element(by.xpath("//input[@id = 'email']")).sendKeys(
      "email@allegiantair.com"
    );
    browser.sleep(3000);
    element(by.xpath("//input[@id = 'password']")).sendKeys("*****");
    browser.sleep(4000);
    element(by.xpath("//button[@type='submit']")).click();
    browser.sleep(5000);
    var target = element(by.xpath("//div[@class= 'invalid-feedback']"));
    browser.sleep(3000);
    browser.wait(EC.presenceOf(target));
    target.getText().then(function(txt) {
      console.log(
        "Using invalid crendentials for login to expect error message: " + txt
      );
    });
    browser.sleep(5000);
  });

  it("should navigate to dashboard page without using login", function() {
    browser.sleep(3000);
    element(by.xpath("//li/a[1]")).click();
    browser.sleep(3000);
    expect(browser.getCurrentUrl()).toEqual(baseUrl + "/dashboard");
    browser.sleep(3000);
    console.log("Successfully landed into the dashboard page");
  });

  it("should click the trigger icon", function() {
    var EC = protractor.ExpectedConditions;
    browser.sleep(3000);
    element(by.xpath("//li/a[1]")).click();
    browser.sleep(3000);
    expect(browser.getCurrentUrl()).toEqual(baseUrl + "/dashboard");
    browser.sleep(3000);
    element(by.xpath("//img[@alt='Trigger Jenkins Jobs']")).click();
    browser.sleep(3000);
    var target = element(
      by.xpath("(//button[@tabindex='0' and @type='button'])[6]/span[1]")
    );
    browser.sleep(3000);
    browser.wait(EC.presenceOf(target));
    target.getText().then(function(txt) {
      console.log(
        "Able to open the trigger popup modal, due to invalid credential it is showing login option"
      );
    });
  });
});

"use strict";

var config = require("../../configUrl.json");
var baseUrl = config.url;
describe("Advance search:", function() {
  beforeEach(function() {
    browser.waitForAngularEnabled(false);
    browser.get(baseUrl + "/dashboard");
  });
  it("should need to check the search functionality", function() {
    browser.sleep(10000);
    var seleniumPercentage = browser
      .findElement(by.xpath("(//span[@class='MuiButton-label-145'])[4]"))
      .click();
    browser.sleep(5000);
    browser.findElement(by.xpath("//input[@id='buildReference']")).click();
    browser.sleep(2000);
    browser
      .findElement(by.xpath("//input[@id='buildReference']"))
      .sendKeys(100);
    browser.sleep(3000);
    browser
      .findElement(by.xpath("(//span[contains(text(),'Search')])[2]"))
      .click();
    browser.sleep(3000);
    var actualBuildReference = browser
      .findElement(by.xpath("(//div[contains(text(),'100')])[1]"))
      .getText();

    expect(actualBuildReference).toEqual("100");
    console.log("Advance search functionality");
  });
});

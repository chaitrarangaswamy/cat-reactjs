"use strict";

var config = require("../../configUrl.json");
var baseUrl = config.url;
var path = require('path');
// var remote = require('../../node_modules/protractor/node_modules/selenium-webdriver/remote');

describe("upload metadata UI", function() {
    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.driver.manage().window().maximize();
        // browser.get(baseUrl + "/uploadmetadata");
        browser.sleep(3000);
    });
    it("Should navigate to login page", function() {
        browser.get(baseUrl + "/pages/login-page");
        expect(browser.getCurrentUrl()).toEqual(baseUrl + "/pages/login-page");
        browser.sleep(2000);
        console.log("Should navigate to login page");
    });
    it("Using valid crendentials for login", function() {
        browser.waitForAngularEnabled(false);
        var EC = protractor.ExpectedConditions;
        browser.sleep(3000);
        element(by.xpath("//input[@id = 'email']")).sendKeys(browser.params.login.email);
        browser.sleep(3000);
        element(by.xpath("//input[@id = 'password']")).sendKeys(browser.params.login.password);
        browser.sleep(4000);
        element(by.xpath("//button[@type='submit']")).click();
        EC = protractor.ExpectedConditions;
        var targetElement = element(by.xpath('//*[@id="root"]/div/div[1]/div/div/div[2]/ul/li[2]'));
        browser.wait(function() {
            return EC.visibilityOf(targetElement).call().then(function(present) {
                // console.log('\n' + 'looking for element')
                if (present) {
                    //do what would you like to do
                    return true;
                } else {
                    //do what would  you like to do
                    return false;
                }
            });
        }, 500000);
        browser.sleep(4000);
    });

    it("should navigate to dashboard page after login", function() {
        //console.log("login")
        var EC = protractor.ExpectedConditions;
        browser.get(baseUrl + "/dashboard");
        browser.waitForAngularEnabled(false);
        expect(browser.getCurrentUrl()).toEqual(baseUrl + "/dashboard");
        browser.sleep(5000);
        var target = element(by.xpath('//*[@id="root"]/div/div[2]/div/div[1]/div/div/div'));
        browser.wait(function() {
            return EC.visibilityOf(target).call().then(function(present) {
                if (present) {
                    return true;
                } else {
                    return false;
                }
            })
        }, 300000);
        browser.sleep(4000);

    });

    it("should click on myjobs button", function() {
        //console.log("myjobs")
        browser.sleep(2000);
        browser
            .findElement(by.xpath("//*[@id='root']/div/div[2]/div/header/div[1]/div[1]/button")).click();
        browser.sleep(3000);
        browser
            .findElement(by.xpath("//*[@id='root']/div/div[1]/div/div/div[2]/ul/li[1]")).click();
        browser.sleep(3000);
        browser
            .findElement(by.xpath("//*[@id='root']/div/div[2]/div/header/div[2]/div/div/span/span[1]/span[1]/input")).click();
        browser.sleep(3000);
        var EC = protractor.ExpectedConditions;
        var targetUsername = element(
            By.xpath("//*[@role='rowgroup'][1]/div/*[@role='gridcell'][5]")
        );

        browser.sleep(3000);
        browser.executeScript('window.scrollTo(0,10000);').then(function() {
            browser.wait(EC.presenceOf(targetUsername));
            targetUsername.getText().then(function(Name) {
                var userName = Name;
                console.log("userName " + userName);
            });
        });
        browser.sleep(3000);

    });

    it("should display previous day data", function() {
        browser.sleep(1000);
        browser.executeScript('window.scrollTo(0,10000);').then(function() {
            browser
                .findElement(by.xpath("//*[@id='root']/div/div[2]/div/div[1]/div/div/div/div[5]/div[2]/div/button")).click();
            browser.sleep(3000);
            var EC = protractor.ExpectedConditions;
            var targetPreviousDate = element(By.xpath("//*[@id='root']/div/div[2]/div/div[1]/div/div/div/div[1]/div/div/div/div[1]/div/div[2]/div/strong"));
            browser.wait(EC.presenceOf(targetPreviousDate));
            targetPreviousDate.getText().then(function(previousDate) {
                var previousDate = previousDate;
                console.log("previous date:" + previousDate);
            });
            browser.sleep(3000);
        });
    })

})
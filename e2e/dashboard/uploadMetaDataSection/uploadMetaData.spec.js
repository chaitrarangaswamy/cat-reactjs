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
    // it("should navigate to upload metadata page", function() {
    //     browser.waitForAngularEnabled(false);
    //     browser.get(baseUrl + "/uploadmetadata");
    //     browser.sleep(3000);
    // })
    it("Should navigate to login page", function() {
        browser.get(baseUrl + "/pages/login-page");
        // browser.waitForAngularEnabled(false);
        // browser.findElement(by.xpath("//*[@id='root']/div/div[2]/header/div/div[1]/button")).click();
        // browser.sleep(3000);
        // browser.findElement(by.xpath("//*[@id='root']/div/div[1]/div/div/div[2]/div/ul/li")).click();
        // browser.sleep(2000);
        // browser.findElement(by.xpath("//*[@id='root']/div/div[1]/div/div/div[2]/div/ul/li/div/div/div/ul/li")).click();
        // browser.sleep(3000);
        //browser.get(baseUrl + "/pages/login-page");
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

    it("should navigate to upload metadata after login", function() {
        browser.get(baseUrl + "/dashboard");
        browser.waitForAngularEnabled(false);
        expect(browser.getCurrentUrl()).toEqual(baseUrl + "/dashboard");
        browser.sleep(5000);
        browser.findElement(by.xpath("//*[@id='root']/div/div[2]/div/header/div/div[1]/button")).click();
        browser.sleep(3000);
        browser
            .findElement(by.xpath("//*[@id='root']/div/div[1]/div/div/div[2]/ul/li[2]")).click();
        browser.sleep(3000);
        browser.findElement(by.xpath("//*[@id='root']/div/div[1]/div/div/div[2]/ul/li[2]/div/div/div/ul/li[2]")).click();
        browser.sleep(3000);
        browser
            .findElement(by.xpath("//input[@id='refno']"))
            .sendKeys("ref name");
        browser.sleep(3000);
        browser
            .findElement(by.xpath("//input[@id='csvid']"))
            .click();
        browser.sleep(3000);

        // browser.setFileDetector(new remote.FileDetector());
        var fileToUpload = './metadatacsvformat.csv';
        var __dirname = '/home/ubuntu/Desktop/REACTPRO/cat-reactui/src/e2e/dashboard'
        var absolutePath = path.resolve(__dirname, fileToUpload);

        var fileElem = element(by.css('input[type="file"]'));
        fileElem.sendKeys(absolutePath);
        browser.driver.sleep(5000);
        browser.findElement(by.xpath("//*[@id='upload']")).click();
        // browser.driver.sleep(5000);
    });

})
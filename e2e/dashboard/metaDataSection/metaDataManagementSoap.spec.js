var config = require("../../configUrl.json");
var baseUrl = config.url;
var path = require('path');

// var remote = require('../../node_modules/protractor/node_modules/selenium-webdriver/remote');

describe("Metadata management soap UI", function() {
    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.driver.manage().window().maximize();
        // browser.get(baseUrl + "/uploadmetadata");
        browser.sleep(3000);
    });

    it("Should navigate to login page", function() {
        browser.get(baseUrl + "/pages/login-page");
        browser.sleep(3000);
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
                console.log('\n' + 'looking for element')
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
    it("should navigate to metadata management page after login", function() {
        browser.get(baseUrl + "/dashboard");
        browser.waitForAngularEnabled(false);
        expect(browser.getCurrentUrl()).toEqual(baseUrl + "/dashboard");
        browser.sleep(5000);
        browser
            .findElement(by.xpath("//*[@id='root']/div/div[2]/div/header/div/div[1]/button")).click();
        browser.sleep(3000);
        browser
            .findElement(by.xpath("//*[@id='root']/div/div[1]/div/div/div[2]/ul/li[2]")).click();
        browser.sleep(3000);
        browser
            .findElement(by.xpath("//*[@id='root']/div/div[1]/div/div/div[2]/ul/li[2]/div/div/div/ul/li[1]")).click();
        browser.sleep(3000);

    });

    it("should navigate to API testing page and load data", function() {
        var EC = protractor.ExpectedConditions;
        browser
            .findElement(by.xpath("(//button)[6]")).click();
        browser.sleep(3000);
        var tableDatajobName = element(By.xpath("(((//table)[1]/tbody/tr)[1]/th)[2]"));
        browser.wait(EC.presenceOf(tableDatajobName));
        tableDatajobName.getText().then(function(data) {
            console.log("jobname : ", data)
        });
        var tableDatatestSuitName = element(By.xpath("(((//table)[1]/tbody/tr)[1]/th)[3]"));
        browser.wait(EC.presenceOf(tableDatatestSuitName));
        tableDatatestSuitName.getText().then(function(data) {
            console.log("test suit  : ", data)
        });
        var tableDataMetatags = element(By.xpath("(((//table)[1]/tbody/tr)[1]/th)[4]"));
        browser.wait(EC.presenceOf(tableDataMetatags));
        tableDataMetatags.getText().then(function(data) {
            console.log("meta tags  : ", data)
        });
    });

    it("should search soap meta data with OR search", function() {
        browser
            .findElement(by.xpath("(//button)[3]")).click();
        browser.sleep(5000);
        browser
            .findElement(by.xpath("(//button)[6]")).click();
        browser.sleep(3000);
        var EC = protractor.ExpectedConditions;
        var searchElementOR
        browser
            .findElement(by.xpath("//*[@id='root']/div/div[2]/div/header/div/div[3]/div/div/div/div/form/div/div[2]")).click();
        browser.sleep(5000);
        browser
            .findElement(by.xpath("//div[@id='menu-type']/div[2]/ul/li[1]")).click();
        browser.sleep(5000);
        browser
            .findElement(by.xpath("//*[@id='standard-name']")).sendKeys("@cc,@WWW");
        browser.sleep(3000);
        browser
            .findElement(by.xpath("(//button)[2]")).click();
        browser.sleep(3000);
        searchElementOR = element(By.xpath("(((//table)[1]/tbody/tr)[1]/th)[4]"));
        searchElementOR.isPresent().then(function(item) {
            if (item) {
                console.log("soap OR search meta tags : ", item)
            } else {
                browser.sleep(2000);
            }

        })
    });

    it("should search soap meta data with AND search", function() {
        browser
            .findElement(by.xpath("(//button)[3]")).click();
        browser.sleep(5000);
        browser
            .findElement(by.xpath("(//button)[6]")).click();
        browser.sleep(3000);
        var EC = protractor.ExpectedConditions;
        var searchElementAND
        browser
            .findElement(by.xpath("//*[@id='root']/div/div[2]/div/header/div/div[3]/div/div/div/div/form/div/div[2]")).click();
        browser.sleep(5000);
        browser
            .findElement(by.xpath("//div[@id='menu-type']/div[2]/ul/li[2]")).click();
        browser.sleep(5000);
        browser
            .findElement(by.xpath("//*[@id='standard-name']")).sendKeys("@WWW1");
        browser.sleep(3000);
        browser
            .findElement(by.xpath("(//button)[2]")).click();
        browser.sleep(3000);
        var searchElementAND = element(By.xpath("(((//table)[1]/tbody/tr)[1]/th)[4]"));
        searchElementAND.isPresent().then(function(item) {
            if (item) {
                console.log("soap AND search meta tags : ", item)
            } else {
                browser.sleep(2000);
            }
        })
    });

    it("should search soap meta data with NOT search", function() {
        browser
            .findElement(by.xpath("(//button)[3]")).click();
        browser.sleep(5000);
        browser
            .findElement(by.xpath("(//button)[6]")).click();
        browser.sleep(3000);
        var EC = protractor.ExpectedConditions;
        var searchElementAND
        browser
            .findElement(by.xpath("//*[@id='root']/div/div[2]/div/header/div/div[3]/div/div/div/div/form/div/div[2]")).click();
        browser.sleep(5000);
        browser
            .findElement(by.xpath("//div[@id='menu-type']/div[2]/ul/li[3]")).click();
        browser.sleep(5000);
        browser
            .findElement(by.xpath("//*[@id='standard-name']")).sendKeys("@WWW1");
        browser.sleep(3000);
        browser
            .findElement(by.xpath("(//button)[2]")).click();
        browser.sleep(3000);
        var searchElementAND = element(By.xpath("(((//table)[1]/tbody/tr)[1]/th)[4]"));
        searchElementAND.isPresent().then(function(item) {
            if (item) {
                console.log("soap NOT search meta tags : ", item)
            } else {
                browser.sleep(2000);
            }
        })
    });

    it("should search soap meta data with Starts With search", function() {
        browser
            .findElement(by.xpath("(//button)[3]")).click();
        browser.sleep(5000);
        browser
            .findElement(by.xpath("(//button)[6]")).click();
        browser.sleep(3000);
        var EC = protractor.ExpectedConditions;
        var searchElementAND
        browser
            .findElement(by.xpath("//*[@id='root']/div/div[2]/div/header/div/div[3]/div/div/div/div/form/div/div[2]")).click();
        browser.sleep(5000);
        browser
            .findElement(by.xpath("//div[@id='menu-type']/div[2]/ul/li[4]")).click();
        browser.sleep(5000);
        browser
            .findElement(by.xpath("//*[@id='standard-name']")).sendKeys("@test");
        browser.sleep(3000);
        browser
            .findElement(by.xpath("(//button)[2]")).click();
        browser.sleep(3000);
        var searchElementAND = element(By.xpath("(((//table)[1]/tbody/tr)[1]/th)[4]"));
        searchElementAND.isPresent().then(function(item) {
            if (item) {
                console.log("soap Starts With search meta tags : ", item)
            } else {
                browser.sleep(2000);
            }
        })
    });

    it("should search soap meta data with Ends With search", function() {
        browser
            .findElement(by.xpath("(//button)[3]")).click();
        browser.sleep(5000);
        browser
            .findElement(by.xpath("(//button)[6]")).click();
        browser.sleep(3000);
        var EC = protractor.ExpectedConditions;
        var searchElementAND
        browser
            .findElement(by.xpath("//*[@id='root']/div/div[2]/div/header/div/div[3]/div/div/div/div/form/div/div[2]")).click();
        browser.sleep(5000);
        browser
            .findElement(by.xpath("//div[@id='menu-type']/div[2]/ul/li[5]")).click();
        browser.sleep(5000);
        browser
            .findElement(by.xpath("//*[@id='standard-name']")).sendKeys("@ing");
        browser.sleep(3000);
        browser
            .findElement(by.xpath("(//button)[2]")).click();
        browser.sleep(3000);
        var searchElementAND = element(By.xpath("(((//table)[1]/tbody/tr)[1]/th)[4]"));
        searchElementAND.isPresent().then(function(item) {
            if (item) {
                console.log("soap Ends With search meta tags : ", item)
            } else {
                browser.sleep(2000);
            }
        })
    });

    it("should select and review and trigger jobs", function() {
        browser
            .findElement(by.xpath("(//button)[3]")).click();
        browser.sleep(5000);
        browser
            .findElement(by.xpath("(//button)[6]")).click();
        browser.sleep(3000);
        var EC = protractor.ExpectedConditions;
        var Element1 = element(By.xpath("(((//table)[1]/tbody/tr)[1]/th)[1]/span"));
        Element1.isPresent().then(function(item) {
            if (item) {
                Element1.click();
                browser.sleep(1000);
            } else {}
        })
        var Element2 = element(By.xpath("(((//table)[1]/tbody/tr)[2]/th)[1]/span"));
        Element2.isPresent().then(function(item) {
            if (item) {
                Element2.click();
                browser.sleep(1000);
            } else {}
        })
        var Element3 = element(By.xpath("(((//table)[2]/tbody/tr)[1]/th)[1]/span"));
        Element3.isPresent().then(function(item) {
            if (item) {
                Element3.click();
                browser.sleep(1000);
            } else {}
        })
        var UnselectElement3 = element(By.xpath("(((//table)[2]/tbody/tr)[1]/th)[1]/span"));
        UnselectElement3.isPresent().then(function(item) {
            if (item) {
                UnselectElement3.click();
                browser.sleep(1000);
            } else {}
        })
        browser
            .findElement(by.xpath("(//button)[6]")).click();
        browser.sleep(3000);
        var triggerModal = element(By.xpath("(//h5)[1]"));
        browser.wait(EC.presenceOf(triggerModal));
        triggerModal.getText().then(function(item) {
            var No_ofTestsiut_Selected = item;
            var split = No_ofTestsiut_Selected.split(":");
            console.log("Number of testsuite selected:", split)
        });
        element(by.xpath("//*[@id='react-select-8-input']")).sendKeys('SB1');
        browser.sleep(1000);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.sleep(3000);
        browser
            .findElement(by.xpath("(//button)[9]")).click();
    });

})
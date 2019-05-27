"use strict";

var config = require("../../configUrl.json");
var baseUrl = config.url;
var path = require('path');

// var remote = require('../../node_modules/protractor/node_modules/selenium-webdriver/remote');

describe("Metadata managementselenium UI", function() {
    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.driver.manage().window().maximize();
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

    it("should load meta data in tables", function() {
        var EC = protractor.ExpectedConditions;
        var _1WorkBook_SheetName;
        var _1targetWorkbook_sheetName = element(By.xpath("(//h4)[1] "));
        browser.wait(EC.presenceOf(_1targetWorkbook_sheetName));
        _1targetWorkbook_sheetName.getText().then(function(_1workbook_sheetname) {
            _1WorkBook_SheetName = _1workbook_sheetname;
            console.log("First workbook and sheet name : ", _1WorkBook_SheetName)
            browser.sleep(3000);
        });
        browser.executeScript('window.scrollTo(0,10000);').then(function() {
            console.log('++++++SCROLLED Down+++++');
            EC = protractor.ExpectedConditions;
            var _2WorkBook_SheetName;
            var _2targetWorkbook_sheetName = element(By.xpath("(//h4)[2] "));
            browser.wait(function() {
                return EC.visibilityOf(_2targetWorkbook_sheetName).call().then(function(present) {
                    if (present) {
                        browser.wait(EC.presenceOf(_2targetWorkbook_sheetName));
                        _2targetWorkbook_sheetName.getText().then(function(_2workbook_sheetname) {
                            _2WorkBook_SheetName = _2workbook_sheetname;
                            console.log("Second workbook and sheet name : ", _2WorkBook_SheetName)
                            browser.sleep(3000);
                        });
                        return true;
                    } else {
                        //do what would  you like to do
                        return false;
                    }
                });
            }, 500000);
        });
        browser.executeScript('window.scrollTo(0,20000);').then(function() {
            console.log('++++++SCROLLED Down+++++');
            EC = protractor.ExpectedConditions;
            var _3WorkBook_SheetName;
            var _3targetWorkbook_sheetName = element(By.xpath("(//h4)[3] "));
            browser.wait(function() {
                return EC.visibilityOf(_3targetWorkbook_sheetName).call().then(function(present) {
                    if (present) {
                        browser.wait(EC.presenceOf(_3targetWorkbook_sheetName));
                        _3targetWorkbook_sheetName.getText().then(function(_3workbook_sheetname) {
                            _3workbook_sheetname = _3workbook_sheetname;
                            console.log("Third workbook and sheet name : ", _3workbook_sheetname)
                            browser.sleep(3000);
                        });
                        return true;
                    } else {
                        //do what would  you like to do
                        return false;
                    }
                });
            }, 500000);
        });
        // var target = element(By.xpath("(//div[@class='rt-td'])[5]/div/div"));
        // browser.wait(EC.presenceOf(target));
        // target.getText().then(function(metadataObj) {
        //     var metadata = metadataObj;
        //     console.log(metadata, "metadata")
        // })
    });

    it("should search selenium meta data with workbook search", function() {
        browser.findElement(by.xpath("(//button)[3]")).click();
        browser.sleep(5000);
        var EC = protractor.ExpectedConditions;
        var searchElementOR
        browser
            .findElement(by.xpath("//*[@id='root']/div/div[2]/div/div[1]/div/div/div/div/div/div[1]/form/div/div[1]/div/div[1]/div/div/div/div[2]")).click();
        browser.sleep(5000);
        element(by.xpath("//*[@id='react-select-6-input']")).sendKeys("workBook");
        // browser.findElement(By.id("react-select-11-input")).sendKeys("sdfsd");
        browser.sleep(1000);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.sleep(3000);
        //*[@id="root"]/div/div[2]/div[1]/div/div/div/div/div/div[2]/div/div/div/div/div[1]/div/div/div[1]/h4/text()[1]
        browser
            .findElement(by.xpath("//*[@id='root']/div/div[2]/div/div[1]/div/div/div/div/div/div[1]/form/div/div[2]/div/div[1]/div/div/div/div[2]/div")).click();
        browser.sleep(3000);
        var elementName = browser
            .findElement(by.xpath("//*[@id='root']/div/div[2]/div/div[1]/div/div/div/div/div/div[2]/div/div/div/div/div[1]/div/div/div[1]/h4/span[1"))
        elementName.getText().then(function(text) {
            console.log(text, "++++");
            element(by.xpath("//*[@id='react-select-7-input']")).sendKeys(text);
            browser.sleep(2000);
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            browser.sleep(3000);
            browser.findElement(by.xpath("(//button)[4]")).click();
            browser.sleep(5000);
        });
    });

    it("should search selenium meta data with feature name search", function() {
        browser.findElement(by.xpath("(//button)[3]")).click();
        browser.sleep(5000);
        var EC = protractor.ExpectedConditions;
        var searchElementOR
        browser
            .findElement(by.xpath("//*[@id='root']/div/div[2]/div/div[1]/div/div/div/div/div/div[1]/form/div/div[1]/div/div[1]/div/div/div/div[2]")).click();
        browser.sleep(5000);
        element(by.xpath("//*[@id='react-select-6-input']")).sendKeys("featureName");
        // browser.findElement(By.id("react-select-11-input")).sendKeys("sdfsd");
        browser.sleep(1000);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.sleep(3000);
        //*[@id="root"]/div/div[2]/div[1]/div/div/div/div/div/div[2]/div/div/div/div/div[1]/div/div/div[1]/h4/text()[1]
        browser
            .findElement(by.xpath("//*[@id='root']/div/div[2]/div/div[1]/div/div/div/div/div/div[1]/form/div/div[2]/div/div[1]/div/div/div/div[2]/div")).click();
        browser.sleep(3000);
        var elementName = browser
            .findElement(by.xpath("//*[@id='root']/div/div[2]/div/div[1]/div/div/div/div/div/div[2]/div/div/div/div/div[1]/div/div/div[1]/h4/span[2]"))
        elementName.getText().then(function(text) {
            console.log(text, "++++");
            element(by.xpath("//*[@id='react-select-7-input']")).sendKeys(text);
            browser.sleep(2000);
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            browser.sleep(3000);
            browser.findElement(by.xpath("(//button)[4]")).click();
            browser.sleep(5000);
        })
    });



    it("should search selenium meta data with OR search", function() {
        browser.findElement(by.xpath("(//button)[3]")).click();
        browser.sleep(5000);
        var EC = protractor.ExpectedConditions;
        var searchElementOR
        browser
            .findElement(by.xpath("//*[@id='root']/div/div[2]/div/header/div/div[3]/div/div/div/div/form/div/div[2]")).click();
        browser.sleep(5000);
        browser
            .findElement(by.xpath("//div[@id='menu-type']/div[2]/ul/li[1]")).click();
        browser.sleep(5000);
        browser
            .findElement(by.xpath("//*[@id='standard-name']")).sendKeys("@Booking,@WWW");
        browser.sleep(3000);
        browser
            .findElement(by.xpath("(//button)[2]")).click();
        browser.sleep(3000);
        EC = protractor.ExpectedConditions;
        var targetElement = element(By.xpath("((((//div[@class='ReactTable -striped -highlight'])[1]/div)[2]/div[@class='rt-tbody']/div)[1]/div/div)[5]/div"));
        browser.wait(function() {
            return EC.visibilityOf(targetElement).call().then(function(present) {
                if (present) {
                    searchElementOR = element(By.xpath("((((//div[@class='ReactTable -striped -highlight'])[1]/div)[2]/div[@class='rt-tbody']/div)[1]/div/div)[5]/div"));
                    searchElementOR.isPresent().then(function(item) {
                        if (item) {
                            console.log("selenium OR search meta tags : ", item)
                        } else {
                            browser.sleep(2000);
                        }
                    })
                    return true;
                } else {
                    return false;
                }
            })
        })
    });

    it("should search selenium meta data with AND search", function() {
        browser.findElement(by.xpath("(//button)[3]")).click();
        browser.sleep(5000);
        var EC = protractor.ExpectedConditions;
        var searchElementAND
        browser
            .findElement(by.xpath("//*[@id='root']/div/div[2]/div/header/div/div[3]/div/div/div/div/form/div/div[2]")).click();
        browser.sleep(5000);
        browser
            .findElement(by.xpath("//div[@id='menu-type']/div[2]/ul/li[2]")).click();
        browser.sleep(5000);
        browser
            .findElement(by.xpath("//*[@id='standard-name']")).sendKeys("@Booking,@24hrsBooking");
        browser.sleep(3000);
        browser
            .findElement(by.xpath("(//button)[2]")).click();
        browser.sleep(3000);
        EC = protractor.ExpectedConditions;
        var targetElement = element(By.xpath("((((//div[@class='ReactTable -striped -highlight'])[1]/div)[2]/div[@class='rt-tbody']/div)[1]/div/div)[5]/div"));
        browser.wait(function() {
            return EC.visibilityOf(targetElement).call().then(function(present) {
                if (present) {
                    searchElementAND = element(By.xpath("((((//div[@class='ReactTable -striped -highlight'])[1]/div)[2]/div[@class='rt-tbody']/div)[1]/div/div)[5]/div"));
                    searchElementAND.isPresent().then(function(item) {
                        if (item) {
                            console.log("selenium AND search meta tags : ", item)
                        } else {
                            browser.sleep(2000);
                        }
                    })
                    return true
                } else {
                    return false
                }
            })
        })
    });

    it("should search selenium meta data with NOT search", function() {
        browser.findElement(by.xpath("(//button)[3]")).click();
        browser.sleep(5000);
        var EC = protractor.ExpectedConditions;
        var searchElementAND
        browser
            .findElement(by.xpath("//*[@id='root']/div/div[2]/div/header/div/div[3]/div/div/div/div/form/div/div[2]")).click();
        browser.sleep(5000);
        browser
            .findElement(by.xpath("//div[@id='menu-type']/div[2]/ul/li[3]")).click();
        browser.sleep(5000);
        browser
            .findElement(by.xpath("//*[@id='standard-name']")).sendKeys("@Booking");
        browser.sleep(3000);
        browser
            .findElement(by.xpath("(//button)[2]")).click();
        browser.sleep(3000);
        EC = protractor.ExpectedConditions;
        var targetElement = element(By.xpath("((((//div[@class='ReactTable -striped -highlight'])[1]/div)[2]/div[@class='rt-tbody']/div)[1]/div/div)[5]/div"));
        browser.wait(function() {
            return EC.visibilityOf(targetElement).call().then(function(present) {
                if (present) {
                    searchElementAND = element(By.xpath("((((//div[@class='ReactTable -striped -highlight'])[1]/div)[2]/div[@class='rt-tbody']/div)[1]/div/div)[5]/div"));
                    searchElementAND.isPresent().then(function(item) {
                        if (item) {
                            console.log("selenium NOT search meta tags : ", item)
                        } else {
                            browser.sleep(2000);
                        }
                    })
                    return true
                } else {
                    return false
                }
            })
        })
    });

    it("should search selenium meta data with Starts With search", function() {
        browser.findElement(by.xpath("(//button)[3]")).click();
        browser.sleep(5000);
        var EC = protractor.ExpectedConditions;
        var searchElementAND
        browser
            .findElement(by.xpath("//*[@id='root']/div/div[2]/div/header/div/div[3]/div/div/div/div/form/div/div[2]")).click();
        browser.sleep(5000);
        browser
            .findElement(by.xpath("//div[@id='menu-type']/div[2]/ul/li[4]")).click();
        browser.sleep(5000);
        browser
            .findElement(by.xpath("//*[@id='standard-name']")).sendKeys("@Book");
        browser.sleep(3000);
        browser
            .findElement(by.xpath("(//button)[2]")).click();
        browser.sleep(3000);
        EC = protractor.ExpectedConditions;
        var targetElement = element(By.xpath("((((//div[@class='ReactTable -striped -highlight'])[1]/div)[2]/div[@class='rt-tbody']/div)[1]/div/div)[5]/div"));
        browser.wait(function() {
            return EC.visibilityOf(targetElement).call().then(function(present) {
                if (present) {
                    searchElementAND = element(By.xpath("((((//div[@class='ReactTable -striped -highlight'])[1]/div)[2]/div[@class='rt-tbody']/div)[1]/div/div)[5]/div"));
                    searchElementAND.isPresent().then(function(item) {
                        if (item) {
                            console.log("selenium Starts With search meta tags : ", item)
                        } else {
                            browser.sleep(2000);
                        }
                    })
                    return true
                } else {
                    return false
                }
            })
        })
    });

    it("should search selenium meta data with Ends With search", function() {
        browser.findElement(by.xpath("(//button)[3]")).click();
        browser.sleep(5000);
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
        EC = protractor.ExpectedConditions;
        var targetElement = element(By.xpath("((((//div[@class='ReactTable -striped -highlight'])[1]/div)[2]/div[@class='rt-tbody']/div)[1]/div/div)[5]/div"));
        browser.wait(function() {
            return EC.visibilityOf(targetElement).call().then(function(present) {
                if (present) {
                    searchElementAND = element(By.xpath("((((//div[@class='ReactTable -striped -highlight'])[1]/div)[2]/div[@class='rt-tbody']/div)[1]/div/div)[5]/div"));
                    searchElementAND.isPresent().then(function(item) {
                        if (item) {
                            console.log("selenium Ends With search meta tags : ", item)
                        } else {
                            browser.sleep(2000);
                        }
                    })
                    return true
                } else {
                    return false
                }
            })
        })
    });

    it("should select and review and trigger job", function() {
        // browser.findElement(by.xpath("(//button)[2]")).click();
        // browser.sleep(5000);
        var EC = protractor.ExpectedConditions;
        var Element1 = element(By.xpath("(((//div[@class='ReactTable -striped -highlight'])[1]/div[@role='grid']/div[@class='rt-tbody']/div[@role='rowgroup'])[1]/div/div)[1]"));
        Element1.isPresent().then(function(item) {
            if (item) {
                Element1.click();
                browser.sleep(1000);
            } else {}
        })
        browser.executeScript('window.scrollTo(0,5000);').then(function() {
            console.log('++++++SCROLLED Down+++++');
            var Element2 = element(By.xpath("(((//div[@class='ReactTable -striped -highlight'])[1]/div[@role='grid']/div[@class='rt-tbody']/div[@role='rowgroup'])[2]/div/div)[1]"));
            Element2.isPresent().then(function(item) {
                if (item) {
                    Element2.click();
                    browser.sleep(1000);
                } else {}
            });
            var Element3 = element(By.xpath("(((//div[@class='ReactTable -striped -highlight'])[2]/div[@role='grid']/div[@class='rt-tbody']/div[@role='rowgroup'])[1]/div/div)[1]"));
            Element3.isPresent().then(function(item) {
                if (item) {
                    Element3.click();
                    browser.sleep(1000);
                } else {}
            });
            var UnselectElement3 = element(By.xpath("(((//div[@class='ReactTable -striped -highlight'])[2]/div[@role='grid']/div[@class='rt-tbody']/div[@role='rowgroup'])[1]/div/div)[1]"));
            UnselectElement3.isPresent().then(function(item) {
                if (item) {
                    UnselectElement3.click();
                    browser.sleep(1000);
                } else {}
            })
        });
        browser.sleep(5000);
        // browser.executeScript('window.scrollTo(0,10000)').then(function() {
        //     browser
        //         .findElement(by.xpath("//*[@id='review-execute']")).click();
        //     browser.sleep(3000);
        //     var triggerModal = element(By.xpath("(//h5)[1]"));
        //     browser.wait(EC.presenceOf(triggerModal));
        //     triggerModal.getText().then(function(item) {
        //         var No_ofTestCases_Selected = item;
        //         var split = No_ofTestCases_Selected.split(":");
        //         console.log("Number of testcases selected:", split[1]);
        //         browser
        //             .findElement(by.xpath("//*[@id='Modal-trigger']")).click();
        //         browser.sleep(3000);
        //     });
        // });
    })

})
exports.config = {
    framework: "jasmine",
    specs: ["**/*.spec.js"],
    capabilities: { browserName: "chrome" },
    resultJsonOutputFile: "reactresults.json",
    jasmineNodeOpts: {
        defaultTimeoutInterval: 2500000
    },
    params: {
        login: {
            email: 'default',
            password: 'default'
        }
    }
};
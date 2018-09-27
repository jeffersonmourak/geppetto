const puppeteer = require('puppeteer');
const runner = require('./runner');
const { errorLog, message } = require('./logger');
const enums = require('./enums');

global.geppetto = {};

module.exports = async function run(suite, options) {    
    global.geppetto = {
        options,
        suite
    };

    message(`Initializing Geppetto and his Puppeteer`);

    const browser = await puppeteer.launch(options);
    let errors = [];

    for ( let pageSuite of suite ) {
        message(`Opening: ${pageSuite.url}`);

        const page = await browser.newPage();

        if (pageSuite.credentials) {
            await page.authenticate(pageSuite.credentials)
        }

        await page.goto(pageSuite.url);

        let suiteErrors = await runner(page, pageSuite, options);

        await page.close();

        if (suiteErrors.length > 0) {
            errors.push({
                suite: pageSuite,
                result: suiteErrors.length === 0,
                data: suiteErrors
            });
        }
    }
    
    await browser.close();
    
    options.report(enums.report.batteryResult, {
        suite,
        result: errors.length === 0,
        errors
    });

    return errorLog(`All Tests Passed!`, errors.length > 0 ? `${errors.length} tests failed!` : false);
}


const enums = require('../enums');
const { value, action, navigation, display } = require('./automators');
const { message } = require('../logger');

async function peformAction(step, page) {
    switch(step.type) {
        case `${enums.stepType.value}`: return await value(step, page);
        case `${enums.stepType.action}`: return await action(step, page);
        case `${enums.stepType.navigation}`: return await navigation(step, page);
        case `${enums.stepType.display}`: return await display(step, page);
        default: console.log(step); break;
    };
}

async function walkThrough(steps, page, options) {
    let errors = [];
    for( let step of steps ) {
        let result = await peformAction(step, page);

        let reportData = {
            suite: step,
            result: result === true
        }

        if (result !== true) {
            errors.push(result);
            reportData.errors = result;
        }

        options.report(enums.report.stepResult, reportData);
    }

    return errors;
}

module.exports = async (page, pageSuite, options) => {
    let errors = [];

    for (let suite of pageSuite.suite) {        
        if (pageSuite.noSession) {
            await page.evaluate(() => { localStorage.clear(); });
            await page.goto(pageSuite.url);
        } else {
            await page.reload();
        }

        message(`Running: ${suite.name}`, 1);

        let result = await walkThrough(suite.steps, page, options),
            resultReport = {
                suite,
                result: result.length === 0
            }

        if (result.length > 0) {
            errors.push({
                name: suite.name,
                result: result.length === 0,
                data: result
            });

            resultReport.errors = result;
        }

        options.report(enums.report.suiteResult, resultReport);
    }

    return errors;
}
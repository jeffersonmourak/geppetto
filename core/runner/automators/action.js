const { errorLog } = require('../../logger');

module.exports = async (step, page) => {
    const element = await page.$(step.selector);

    let errMsg = `Element ${step.selector} not found!`;

    if (element !== null) {
        errMsg = false;
        await element[step.action]();
    }
    
    return errorLog(`${step.action} on ${step.selector}`, errMsg, 3);
}
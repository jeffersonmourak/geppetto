const { errorLog } = require('../../logger');

module.exports = async (step, page) => {
    await page.waitFor(step.selector);

    const element = await page.$(step.selector);

    let errMsg = `Element ${step.selector} not found!`;

    if (element !== null) {
        errMsg = false;
    }
    
    return errorLog(`${step.selector} is visible`, errMsg, 3);
}
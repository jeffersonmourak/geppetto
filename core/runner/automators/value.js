const { errorLog } = require('../../logger');

module.exports = async (step, page) => {
    const element = await page.$(step.selector);
    
    let errMsg = `Element ${step.selector} not found!`;

    if (element !== null) {
        await element.focus();
        await page.keyboard.type(step.value);

        let elementValue = await page.$eval( step.selector, el => el.value );
        
        errMsg = elementValue !== step.value ? `Expected ${step.value} but got ${elementValue}` : false;
    }

    return errorLog(`Set value ${step.value} at ${step.selector}`, errMsg, 3);
}
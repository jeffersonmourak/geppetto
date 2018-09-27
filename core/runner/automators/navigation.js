const { errorLog } = require('../../logger');

module.exports = async (step, page) => {
    await page.waitForNavigation({
        timeout: step.timeout || 10000
    });
    
    let errMsg = step.url !== page.url() ? `Page navigated to ${page.url()}` : false;

    return errorLog(`Navigate to ${step.url}`, errMsg, 3);
}
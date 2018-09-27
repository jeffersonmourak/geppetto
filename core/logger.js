const { padStart } = require('lodash');
const chalk = require('chalk');

const message = (msg, column = 0) => {
    if (global.geppetto.options.verbose) {
        console.log(padStart(msg, msg.length + column));
    }
}

const errorLog = (msg, errorMsg = null, column = 0) => {
    message(`${ errorMsg === false ? chalk.green(`✓`) : chalk.red(`✗`) }  ${msg}`, column);

    if (errorMsg) {
        message(`${chalk.red(`➜`)} ${errorMsg}`, column + 1);
        
        return errorMsg;
    }

    return true;
}

module.exports = {
    errorLog,
    message
}
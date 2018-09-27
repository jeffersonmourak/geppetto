const geppetto = require('./core/geppetto');
const { isString, startsWith, noop } = require('lodash');
const path = require('path');
const fs = require('fs');

const args = require('minimist')(process.argv.slice(2));

let file = args._[0] || args.f || args.file;
let headless = !args.graphic;
let verbose = !args.silent;
let devtools = args.devtools || false;

if (!isString(file)) {
    console.log(`${file} is not a valid file`)
    process.exit(1);
}

if (!startsWith(file, '~') && !startsWith(file, '/')) {
    file = path.join(process.cwd(), file);
}

let suite = JSON.parse(fs.readFileSync(file, 'utf-8'));

geppetto(suite, { headless, verbose, devtools, report: noop })
    .then( r => r === true ? process.exit(0) : process.exit(1) )
    .catch( () => process.exit(1) );
const geppetto = require('./core/geppetto');
const enums = require('./core/enums');
const { omit, get, isUndefined } = require('lodash');
const md5 = require('crypto-js/md5');

class Geppetto {
    constructor(suite, options) {
        this.suite = suite;
        this.options = omit(options, ['report']);
        this.listeners = {};
        
        this.options.report = (event, data) => {
            this.emit(event, data)
        }
    }

    static get enums() {
        return enums;
    }

    emit(event, data) {
        let events = this.listeners[event];
        if (events) {
            let keys = Object.keys(events);

            for (let k of keys) {
                events[k](data);
            }
        }
    }

    _signatureFunction(fn) {
        return md5(fn.toString()).toString();
    }

    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = {};
        }

        let listenerSignature = this._signatureFunction(callback);

        if (isUndefined(get(this.listeners, `${event}.${listenerSignature}`))) {
            this.listeners[event][listenerSignature] = callback
        } else {
            throw new Error(`${callback.toString()} already listening for ${event}`);
        }

        return () => this.off(event, callback);
    }

    off(event, callback) {
        let listenerSignature = this._signatureFunction(callback);

        if (!isUndefined(get(this.listeners, `${event}.${listenerSignature}`))) {
            this.listeners[event][listenerSignature] = null;
            delete this.listeners[event][listenerSignature];
        }
    }

    onSuiteEnd(callback) {
        return this.on(enums.report.suiteResult, callback);
    }

    offSuiteEnd(callback) {
        return this.off(enums.report.suiteResult, callback);
    }

    onStepEnd(callback) {
        return this.on(enums.report.stepResult, callback);
    }

    offStepEnd(callback) {
        return this.off(enums.report.stepResult, callback);
    }

    onBatteryEnd(callback) {
        return this.on(enums.report.batteryResult, callback);
    }

    offBatteryEnd(callback) {
        return this.off(enums.report.batteryResult, callback);
    }
    
    async run() {
        await geppetto(this.suite, this.options);
    }
}

module.exports = Geppetto;
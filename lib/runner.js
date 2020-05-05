'use strict';


const fs = require('fs');
const Mocha = require('mocha');
const NrpeReporter = require('./reporters.js');


class Runner {
    constructor(config) {
        this.config = config;
        this.mocha = new Mocha();
    }
    
    run(label, done) {
        const p = this.config[label].path;
        this.mocha.addFile(p);
        
        let reporter = this.config[label].reporter || 'list';
        reporter = reporter.toLowerCase() === 'nrpe' ? NrpeReporter : reporter;

        this.mocha
            .reporter(reporter)
            .run(failures => done(failures));
    }
}

module.exports = Runner;

'use strict';

import { Logger, transports } from 'winston';

var logger = new Logger({
    transports: [
        new transports.Console({
            level: "silly",
            handleExceptions: false,
            json: false,
            colorize: true
        })
    ]
});

module.exports = logger;

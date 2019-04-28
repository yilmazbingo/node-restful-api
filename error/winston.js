const winston = require("winston");
const appRoot = require("app-root-path");
require("winston-mongodb");

let options = {
  file: {
    level: "info",
    filename: `${appRoot}/logs/winston.log`,
    handleExceptions: true,
    handleRejections: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 4,
    colorize: true
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true
  },
  database: {
    db: "mongodb://localhost/bingobookstore",
    level: "info",
    collection: "errors",
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 4,
    colorize: true
  }
};

//If an error is thrown outside express, this middleware function cannot be called
module.exports = function(err, req, res, next) {
  const logger = winston.createLogger({
    

    trasports: [
      winston.add(new winston.transports.File(options.file)),
      winston.add(new winston.transports.Console(options.console)),
      winston.add(new winston.transports.MongoDB(options.database))
    ],
    exitOnError: false
  });

  logger.stream = {
    write: function(message, encoding) {
      logger.info(message);
    }
  };
  winston.error(res.status(500).send("something failed"), err);
  // res.status(500).send("something failed");
  next();
};
// const logger = winston.createLogger({
//   trasports: [
//     winston.add(new winston.transports.File(options.file)),
//     winston.add(new winston.transports.Console(options.console)),
//     winston.add(new winston.transports.MongoDB(options.database))
//   ],
//   exitOnError: false
// });

// logger.stream = {
//   write: function(message, encoding) {
//     logger.info(message);
//   }
// };
// module.exports = logger;

//in winston a transporter is essentially a storage device
//two core transports are: console and file

//summary of setting for each trasport
//** LEVEL:level of messages to log
//** FILENAME:
//** HANDLEEXCEPTIONS:catch and handle unhandled exceptions
//** JSON:records log data in a json file
//** MAXSIZE
//** MAXFILES:number of files created when the size of logfile is exceeded
//** COLORIZE

//logging levels indicate the priority and are denoted by an integer.0-5(highest to lowest)
//** 0: error
//** 1: warn
//** 2: info
//** 3: verbose
//** 4: debug
//** 5: silly

//when specifying a logging level for a trasport, anything at that level and higher will be logged.

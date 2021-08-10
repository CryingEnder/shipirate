const winston = require("winston");
//TODO: logging errors in the database

module.exports = function () {
  winston.configure({
    format: winston.format.simple(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "combined.log" }),
    ],
    exceptionHandlers: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "exceptions.log" }),
    ],
    rejectionHandlers: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "rejections.log" }),
    ],
  });
};

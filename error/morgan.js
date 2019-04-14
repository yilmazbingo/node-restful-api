const fs = require("fs");
const appRoot = require("app-root-path");

const morganLogStream = fs.createWriteStream(`${appRoot}/logs/morgan.log`, {
  flags: "a"
});

module.exports = morganLogStream;

const cors = require("cors");
const config = require("config");

let corsOptions = {
  origin: config.get("origin"),
  credentials: true,
};

module.exports = function (app) {
  app.use(cors(corsOptions));
};

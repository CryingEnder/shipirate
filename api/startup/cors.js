const cors = require("cors");

let corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
};

module.exports = function (app) {
  app.use(cors(corsOptions));
};

const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
};

module.exports = function (app) {
  app.use(cors(corsOptions));
};

const predictions = require("./predictions/predictions.service.js");
const parameters = require("./parameters/parameters.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(predictions);
  app.configure(parameters);
    // ~cb-add-configure-service-name~
};

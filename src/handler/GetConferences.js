require("aws-xray-sdk");
const lambda = require("../helper/callLambda");

class GetConferencesHandler {
  canHandle(event) {
    return event.resource === "/conferences" && event.httpMethod === "GET";
  }

  handle() {
    return lambda("getConferences")
      .then(result => {
        return {
          statusCode: 200,
          headers: {},
          body: result
        };
      })
      .catch(e => {
        return {
          statusCode: 500,
          headers: {},
          body: JSON.stringify(e)
        };
      });
  }
}

module.exports = GetConferencesHandler;

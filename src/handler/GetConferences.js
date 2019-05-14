require("aws-xray-sdk");
const lambda = require("../helper/callLambda");

class GetConferencesHandler {
  canHandle(event) {
    return event.resource === "/conferences" && event.httpMethod === "GET";
  }

  handle(event) {
    return lambda("getConferencesByYear", {year: Number.parseInt(event.queryStringParameters.year)})
      .then(result => {
        return {
          statusCode: 200,
          headers: {},
          body: JSON.stringify(JSON.parse(result).payload)
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

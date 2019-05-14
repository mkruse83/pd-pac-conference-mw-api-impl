require("aws-xray-sdk");
const lambda = require("../helper/callLambda");

class GetConferencesHandler {
  canHandle(event) {
    return event.resource === "/conferences/{year}" && event.httpMethod === "GET";
  }

  handle(event) {
    return lambda("getConferencesByYear", {year: Number.parseInt(event.pathParameters.year)})
      .then(result => {
        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify({conferences: JSON.parse(result).payload})
        };
      })
      .catch(e => {
        return {
          statusCode: 500,
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify(e)
        };
      });
  }
}

module.exports = GetConferencesHandler;

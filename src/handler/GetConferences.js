require("aws-xray-sdk");
const lambda = require("../helper/callLambda");
const handleResult = require("../helper/handleResult");

class GetConferencesHandler {
    canHandle(event) {
        return event.resource === "/conferences/{year}" && event.httpMethod === "GET";
    }

    handle(event) {
        return handleResult(
            lambda("getConferencesByYear", {
                year: Number.parseInt(event.pathParameters.year)
            }),
            (data) => ({conferences: data}));
    }
}

module.exports = GetConferencesHandler;

require("aws-xray-sdk");
const lambda = require("../helper/callLambda");
const handleResult = require("../helper/handleResult");

class GetTalks {
    canHandle(event) {
        return event.resource === "/conference/{id}/{sortkey}/talks";
    }

    handle(event) {
        return handleResult(
            lambda("getConferenceById", {
                id: unescape(event.pathParameters.id),
                sortkey: unescape(event.pathParameters.sortkey)
            }),
            (data) => ({talks: data.talks}));
    }
}

module.exports = GetTalks;

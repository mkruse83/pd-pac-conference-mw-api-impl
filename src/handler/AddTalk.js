require("aws-xray-sdk");
const lambda = require("../helper/callLambda");
const handleResult = require("../helper/handleResult");

class GetTalks {
    canHandle(event) {
        return event.resource === "/admin/conference/{id}/{sortkey}/talk" && event.httpMethod === "POST";
    }

    handle(event) {
        return handleResult(lambda("addTalkToConference", {
            id: unescape(event.pathParameters.id),
            sortkey: unescape(event.pathParameters.sortkey),
            talk: JSON.parse(event.body),
        }), (data) => ({talks: data.conference.talks}));
    }
}

module.exports = GetTalks;

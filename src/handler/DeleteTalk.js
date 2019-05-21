require("aws-xray-sdk");
const lambda = require("../helper/callLambda");
const handleResult = require("../helper/handleResult");

class DeleteTalk {
    canHandle(event) {
        return event.resource === "/admin/conference/{id}/{sortkey}/talk" && event.httpMethod === "DELETE";
    }

    handle(event) {
        return handleResult(lambda("deleteTalkFromConference", {
            id: unescape(event.pathParameters.id),
            sortkey: unescape(event.pathParameters.sortkey),
            talk: JSON.parse(event.body),
        }), () => ({}));
    }
}

module.exports = DeleteTalk;

require("aws-xray-sdk");
const lambda = require("../helper/callLambda");
const handleResult = require("../helper/handleResult");

class ToggleFavorites {
    canHandle(event) {
        return event.resource === "/admin/favorites/{id}/{sortkey}/talk";
    }

    handle(event) {
        return handleResult(
            lambda("toggleFavorite", {
                id: unescape(event.pathParameters.id),
                sortkey: unescape(event.pathParameters.sortkey),
                userId: event.requestContext.authorizer.userId,
                talk: event.body,
            }),
            (data) => (data));
    }
}

module.exports = ToggleFavorites;

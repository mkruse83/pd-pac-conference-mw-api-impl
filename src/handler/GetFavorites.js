require("aws-xray-sdk");
const lambda = require("../helper/callLambda");
const handleResult = require("../helper/handleResult");

class GetFavorites {
    canHandle(event) {
        return event.resource === "/admin/favorites";
    }

    handle(event) {
        return handleResult(
            lambda("getFavorites", {
                userId: event.requestContext.authorizer.userId,
            }),
            (data) => ({favorites: data}));
    }
}

module.exports = GetFavorites;

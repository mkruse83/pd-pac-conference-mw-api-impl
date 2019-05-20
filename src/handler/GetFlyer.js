require("aws-xray-sdk");
const lambda = require("../helper/callLambda");
const handleResult = require("../helper/handleResult");

class GetFlyerHandler {
    canHandle(event) {
        return event.resource === "/conference/{id}/{sortkey}/room/{roomId}/flyer";
    }

    handle(event) {
        return handleResult(
            lambda("getConferenceById", {
                id: unescape(event.pathParameters.id),
                sortkey: unescape(event.pathParameters.sortkey)
            }),
            (data) => {
                const conference = data.payload;
                const talks = conference.talks.filter(talk => talk.room.nameInLocation)
                    .sort((a, b) => (a.from > b.from) ? 1 : ((b.from > a.from) ? -1 : 0));
                return ({talks: talks});
            });
    }
}

module.exports = GetFlyerHandler;

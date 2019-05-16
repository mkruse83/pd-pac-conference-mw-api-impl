require("aws-xray-sdk");
const lambda = require("../helper/callLambda");

class GetFlyerHandler {
    canHandle(event) {
        return event.resource === "/conference/{id}/{sortkey}/room/{roomId}/flyer";
    }

    handle(event) {
        return lambda("getConferenceById", {
            id: event.pathParameters.id,
            sortkey: unescape(event.pathParameters.sortkey)
        })
            .then(result => {
                const conference = JSON.parse(result).payload;
                const talks = conference.talks.filter(talk => talk.room.nameInLocation)
                    .sort((a,b) => (a.from > b.from) ? 1 : ((b.from > a.from) ? -1 : 0));
                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify({talks: talks})
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

module.exports = GetFlyerHandler;

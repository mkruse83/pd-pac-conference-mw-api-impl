require("aws-xray-sdk");
const lambda = require("../helper/callLambda");

class GetTalks {
    canHandle(event) {
        return event.resource === "/admin/conference/{id}/{sortkey}/talk";
    }

    handle(event) {
        return lambda("addTalkToConference", {
            id: unescape(event.pathParameters.id),
            sortkey: unescape(event.pathParameters.sortkey),
            talk: JSON.parse(event.body),
        })
            .then(result => {
                const conference = JSON.parse(result).payload;
                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify({talks: conference.talks})
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

module.exports = GetTalks;

require("aws-xray-sdk");
const lambda = require("../helper/callLambda");

class GetTalks {
    canHandle(event) {
        return event.resource === "/conference/{id}/{sortkey}/talks";
    }

    handle(event) {
        return lambda("getConferenceById", {
            id: event.pathParameters.id,
            sortkey: unescape(event.pathParameters.sortkey)
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

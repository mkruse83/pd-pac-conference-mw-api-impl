require("aws-xray-sdk");
const lambda = require("../helper/callLambda");

class GetRoomsHandler {
    canHandle(event) {
        return event.resource === "/conference/{id}/{sortkey}/rooms";
    }

    handle(event) {
        return lambda("getConferenceById", {
            id: unescape(event.pathParameters.id),
            sortkey: unescape(event.pathParameters.sortkey)
        })
            .then(result => {
                const conference = JSON.parse(result).payload;
                const rooms = conference.talks.map(talk => talk.room);
                const roomsMap = {};
                rooms.forEach((room) => {
                    roomsMap[room.name] = room;
                });
                const res = Object.values(roomsMap);
                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify({rooms: res})
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

module.exports = GetRoomsHandler;

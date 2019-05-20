require("aws-xray-sdk");
const lambda = require("../helper/callLambda");
const handleResult = require("../helper/handleResult");

class GetRoomsHandler {
    canHandle(event) {
        return event.resource === "/conference/{id}/{sortkey}/rooms";
    }

    handle(event) {
        return handleResult(
            lambda("getConferenceById", {
                id: unescape(event.pathParameters.id),
                sortkey: unescape(event.pathParameters.sortkey)
            }),
            (data) => {
                const rooms = data.talks.map(talk => talk.room);
                const roomsMap = {};
                rooms.forEach((room) => {
                    roomsMap[room.name] = room;
                });
                const res = Object.values(roomsMap);

                return ({rooms: res})
            });
    }
}

module.exports = GetRoomsHandler;

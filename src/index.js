require("aws-xray-sdk");
const GetConferencesHandler = require("./handler/GetConferences");
const GetRoomsHandler = require("./handler/GetRooms");
const GetFylerHandler = require("./handler/GetFlyer");

exports.handler = async (event, context) => {
    console.log(
        "START pd-pac-conference-mw-api-impl; event:",
        JSON.stringify(event, null, 2),
        "context: ",
        JSON.stringify(context, null, 2),
        "env:",
        JSON.stringify(process.env, null, 2),
    );

    const handler = [];
    handler.push(new GetConferencesHandler());
    handler.push(new GetRoomsHandler());
    handler.push(new GetFylerHandler());
    const foundHandler = handler.find(handler =>
        handler.canHandle(event, context)
    );
    if (foundHandler) {
        return foundHandler.handle(event, context);
    } else {
        console.log("ERROR: could not handle");
    }
};

require("aws-xray-sdk");
const GetConferencesHandler = require("./handler/GetConferences");

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
    const foundHandler = handler.find(handler =>
        handler.canHandle(event, context)
    );
    if (foundHandler) {
        return foundHandler.handle(event, context);
    }
};

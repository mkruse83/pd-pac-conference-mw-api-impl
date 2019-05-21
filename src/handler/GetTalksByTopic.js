require("aws-xray-sdk");
const lambda = require("../helper/callLambda");
const handleResult = require("../helper/handleResult");

class GetTalksByTopic {
    canHandle(event) {
        return event.resource === "/topics/{yearAndMonth}/topic/{topic}";
    }

    handle(event) {
        return handleResult(
            lambda("getTalksByTopic", {
                yearAndMonth: event.pathParameters.yearAndMonth,
                topic: event.pathParameters.topic,
            }),
            (data) => ({talks: data}));
    }
}

module.exports = GetTalksByTopic;

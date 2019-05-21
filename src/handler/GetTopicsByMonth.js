require("aws-xray-sdk");
const lambda = require("../helper/callLambda");
const handleResult = require("../helper/handleResult");

class GetTopicsByMonth {
    canHandle(event) {
        return event.resource === "/topics/{yearAndMonth}";
    }

    handle(event) {
        return handleResult(
            lambda("getTopicsByMonth", {
                yearAndMonth: event.pathParameters.yearAndMonth,
            }),
            (data) => ({topics: data}));
    }
}

module.exports = GetTopicsByMonth;

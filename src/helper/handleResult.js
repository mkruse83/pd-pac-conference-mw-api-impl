const handleResult = (promise, createBody) => {
    return promise.then((data) => {

        const result = JSON.parse(data);
        if (result.statusCode !== 200) {
            throw new Error('ERROR: DAL invokation failed');
        }
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(createBody(result.payload))
        };
    }).catch(e => {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(e.message)
        };
    });

};

module.exports = handleResult;

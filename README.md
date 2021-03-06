# AWS Lambda function to call another Lambda function

This is a Lambda function that is used to call another Lambda function that itself accesses DynamoDB. So this Lambda function functions as a middleware to aggregate data relevant for the api gateway.

## NPM scripts

If you want to use node-lambda to test and deploy the Lambda function, you need to copy the file ".env-template" to ".env" and fill out the respective fields (Access Key, Secret, Role, Region etc.pp.).

- test: run jest for unit tests
- package: create zip that can be uploaded using AWS Console
- deployDev: create AWS Lambda function with "dev"-suffix and upload packaged zip
- deployProd: create AWS Lambda function with "prod"-suffix and upload packaged zip
- debugLambda: debug lambda function on port 9229 (see Chrome inspector or VS Code debugger)
- testLambda: run lamda function locally

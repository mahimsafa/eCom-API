const {
    DynamoDB
} = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");

const db = new DynamoDB();
const client = DynamoDBDocument.from(db, {
    marshallOptions: {
        removeUndefinedValues: true
    }
})


module.exports = client
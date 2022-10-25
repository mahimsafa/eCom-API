const {
    GetCommand,
    PutCommand,
    UpdateCommand,
    ScanCommand,
} = require("@aws-sdk/lib-dynamodb")
const client = require('../lib/dynamodb')


async function getOrders() {
    const params = {
        TableName: "orders",
        // ProjectionExpression: 'img,price'
    };
    const command = new ScanCommand(params)
    try {
        const results = await client.send(command);
        return results
    } catch (err) {
        console.log(err)
        return err
    }
}

async function getOrder(payload) {
    const params = {
        TableName: "orders",
        Key: payload
        // ProjectionExpression: 'img,price'
    };
    const command = new GetCommand(params)
    try {
        const results = await client.send(command);
        return results
    } catch (err) {
        console.log(err)
        return err
    }
}

async function newOrder(payload) {
    const params = {
        TableName: "orders",
        Item: payload
    }
    const command = new PutCommand(params)
    try {
        const results = await client.send(command);
        return results
    } catch (err) {
        console.log(err)
        return err
    }
}

async function updateOrder(payload) {
    const updatedAt = new Date().getTime()
    const params = {
        TableName: "orders",
        Key: { id: payload.orderId },
        UpdateExpression: 'set delivered = :d, updatedAt = :u',
        ExpressionAttributeValues: {
            ':d': payload.action,
            ':u': updatedAt.toString()
        }
    };
    const command = new UpdateCommand(params)
    try {
        const result = await client.send(command);
        return result
    } catch (err) {
        console.log(err)
        return err
    }
}


module.exports = { getOrders, getOrder, newOrder, updateOrder }
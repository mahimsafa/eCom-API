const { PutCommand, ScanCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb")

const client = require('../lib/dynamodb')

async function getProducts() {
    const params = {
        TableName: "products",
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

async function newProduct(payload) {
    const params = {
        TableName: "products",
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

async function deleteProduct(payload) {
    const params = {
        TableName: "products",
        Key: payload
    };
    const command = new DeleteCommand(params)
    try {
        const results = await client.send(command);
        return results
    } catch (err) {
        console.log(err)
        return err
    }
}


module.exports = { getProducts, newProduct, deleteProduct }
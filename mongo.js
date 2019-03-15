const {MongoClient} = require('mongodb');

async function test(mongoUrl) {
    const client = new MongoClient(mongoUrl);
    return client.connect();
}

module.exports = test;

const amqp = require('amqplib');

async function test(url) {
    await amqp.connect(url);
}

module.exports = test;

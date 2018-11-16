const amqp = require('amqplib');

async function test(url) {
    console.log('Testing rabbit');

    await amqp.connect(url);
}



module.exports = test;
const redisURL = process.env.REDIS_URL || 'redis://localhost:6379';
const psqlURL = process.env.PSQL_URL || 'postgres://localhost/signalive-dev';
const rabbitURL = process.env.RABBIT_URL || 'amqp://localhost';

const testRedis = require('./redis');
const testPsql = require('./psql');
const testRabbit = require('./rabbit');

const tests = [];

if (!process.env.DISABLE_REDIS)
    tests.push(testRedis(redisURL));

if (!process.env.DISABLE_PSQL)
    tests.push(testPsql(psqlURL));

if (!process.env.DISABLE_RABBIT)
    tests.push(testRabbit(rabbitURL));

Promise.all(tests)
    .then(() => {
        console.info('All tests were successful.');
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(-1);
    });

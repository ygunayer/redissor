const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const psqlURL = process.env.PSQL_URL || 'postgres://localhost/signalive-dev';

const testRedis = require('./redis');
const testPsql = require('./psql');

const tests = [
    // testRedis(redisUrl),
    testPsql(psqlURL),
];

Promise.all(tests)
    .then(() => {
        console.info('All tests were successful.');
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(-1);
    });

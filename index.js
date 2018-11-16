const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const testRedis = require('./redis');

const tests = [
    testRedis(redisUrl)
];

Promise.all(tests)
    .then(() => {
        console.info('All tests were successful.');
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(-1);
    })

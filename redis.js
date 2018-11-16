const redis = require('redis');

async function test(redisUrl) {
    return new Promise((resolve, reject) => {
        console.log(`Connecting to redis at ${redisUrl}`);

        const client = redis.createClient({ url: redisUrl });

        client.on('connect', () => console.info('Connected to Redis'));

        client.on('error', err => {
            console.error('Failed to connect to Redis', err);
            reject(err);
        });

        client.keys('*', (err, keys) => {
            if (err) {
                console.error('Failed to execute command', err);
                reject(err);
                return;
            }

            console.info(`Successfully retrieved ${keys.length} keys from Redis`);
            resolve();
        });
    });
}

module.exports = test;

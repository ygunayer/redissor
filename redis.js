const redis = require('redis');

async function test(redisUrl) {
    return new Promise((resolve, reject) => {
        const client = redis.createClient({ url: redisUrl });

        client.on('error', err => reject(err));

        client.keys('*', (err, keys) => {
            if (err) {
                reject(err);
                return;
            }

            resolve();
        });
    });
}

module.exports = test;

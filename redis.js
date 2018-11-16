const redis = require('redis');

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

console.log(`Connecting to redis at ${redisUrl}`);

const client = redis.createClient({ url: redisUrl });

client.on('connect', () => console.info('Connected to Redis'));

client.on('error', err => {
    console.error('Failed to connect to Redis', err);
    process.exit(1);
});

client.keys('*', (err, keys) => {
    if (err) {
        console.error('Failed to execute command', err);
        return process.exit(1);
    }

    console.info(`Successfully retrieved ${keys.length} keys from Redis`);
    client.quit(() => process.exit(0));
});

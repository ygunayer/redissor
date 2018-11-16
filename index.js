const redisURL = process.env.REDIS_URL || 'redis://localhost:6379';
const psqlURL = process.env.PSQL_URL || 'postgres://localhost/signalive-dev';
const rabbitURL = process.env.RABBIT_URL || 'amqp://localhost';

const testRedis = require('./redis');
const testPsql = require('./psql');
const testRabbit = require('./rabbit');

async function watch(name, doTest, interval = 3000) {
    async function tick() {
        try {
            await doTest();
            console.log(`${name} connection is OK`);
        } catch (err) {
            console.error(`${name} connection failed due to`, err);
        } finally {
            setTimeout(tick, interval);
        }
    }

    tick();
}

if (!process.env.DISABLE_REDIS)
    watch('Redis', () => testRedis(redisURL));

if (!process.env.DISABLE_PSQL)
    watch('Postgres', () => testPsql(psqlURL));

if (!process.env.DISABLE_RABBIT)
    watch('RabbitMQ', () => testRabbit(rabbitURL));

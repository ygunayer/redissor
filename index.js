const redisURL = process.env.REDIS_URL || 'redis://localhost:6379';
const rabbitURL = process.env.RABBIT_URL || 'amqp://localhost';

const psqlConfig = {
    url: process.env.POSTGRES_URL,
    host: process.env.POSTGRES_HOST || 'localhost',
    username: process.env.POSTGRES_DB_USER || 'postgres',
    password: process.env.POSTGRES_DB_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB_NAME || 'signalive-dev',
    port: isNaN(process.env.POSTGRES_DB_PORT) ? 5432 : parseInt(process.env.POSTGRES_DB_PORT),
};

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
    watch('Postgres', () => testPsql(psqlConfig));

if (!process.env.DISABLE_RABBIT)
    watch('RabbitMQ', () => testRabbit(rabbitURL));

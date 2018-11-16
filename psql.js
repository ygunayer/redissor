const Sequelize = require('sequelize');

async function test(url) {
    const db = new Sequelize(url, {
        dialect: 'postgres',
        pool: {maxConnections: 10},
        isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
    });

    await db.authenticate();
}


module.exports = test;
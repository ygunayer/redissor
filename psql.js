const Sequelize = require('sequelize');

async function test({host, username, password, database, port = 5432}) {
    const db = new Sequelize({
        host,
        username,
        password,
        database,
        dialect: 'postgres',
        pool: {maxConnections: 10},
        isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        logging: false
    });

    await db.authenticate();
}


module.exports = test;

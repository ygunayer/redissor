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

    const accounts = await db.query('select id, name from "Accounts" where id = 1', { type: Sequelize.QueryTypes.SELECT });
    const account = accounts && accounts[0];

    if (account) {
        console.log(`Got account #${account.id} - ${account.name}`)
    } else {
        console.log('Account #1 not found');
    }
}


module.exports = test;

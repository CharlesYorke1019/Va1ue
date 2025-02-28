const Sequelize = require("sequelize");
const config = require('../config/config');

const mySql = require('mysql2')

const dbName = 'Value';
const dbUser = 'root';
const dbPassword = 'clyde';
const dbHost = 'localhost';
const dbPort = '3306';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {

    host: dbHost,
    dialect: 'mysql',
    logging: false,


})

async function createDatabaseIfNotExists() {
    const client = mySql.createConnection({
        user: dbUser,
        host: dbHost,
        password: dbPassword,
        port: dbPort,
    });

    try {

        client.connect();

    } catch (error) {

        console.log('Error creating database');

    } finally {

        client.end();

    }
}
  
createDatabaseIfNotExists().then(() => {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });
});

// const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
//     host: config.HOST,
//     dialect: config.dialect,
//     logging: false,
//     pool: {
//         max: config.pool.max,
//         min: config.pool.min,
//         acquire: config.pool.acquire,
//         idle: config.pool.idle
//     }
// });

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.odds = require('./Odds')(sequelize, Sequelize);
db.user = require('./User')(sequelize, Sequelize);
db.notifications = require('./Notifications')(sequelize, Sequelize);

module.exports = db;
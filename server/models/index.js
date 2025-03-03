const Sequelize = require("sequelize");
const config = require('../config/config');

const test = new Sequelize('mysql', config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    logging: false,
});

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    logging: false,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.odds = require('./Odds')(sequelize, Sequelize);
db.user = require('./User')(sequelize, Sequelize);
db.notifications = require('./Notifications')(sequelize, Sequelize);

async function createDatabaseIfNotExists() {

    try {

        const databases = await test.query('SHOW DATABASES;');

        const databaseExists = databases[0].some(el => el.Database === 'value');

        if (!databaseExists) {

            await test.query(`CREATE DATABASE value`);

        } 

        db.sequelize.sync({
            force: true
        });

    } catch (error) {

        console.log('error')

    } finally {

        console.log('finally');

    }

}

module.exports = { db, createDatabaseIfNotExists };
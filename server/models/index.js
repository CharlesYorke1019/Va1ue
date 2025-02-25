const Sequelize = require("sequelize");
const config = require('../config/config');

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

module.exports = db;
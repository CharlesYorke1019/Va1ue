module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "clyde",
    DB: "value",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};
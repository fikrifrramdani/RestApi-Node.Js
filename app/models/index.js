const dbConf = require("../config/db.conf.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConf.DB, dbConf.USER, dbConf.PASSWORD, {
    host: dbConf.HOST,
    dialect: dbConf.dialect,
    operatorAliases: false,

    pool: {
        max: dbConf.pool.max,
        min: dbConf.pool.min,
        accuire: dbConf.pool.min,
        idle: dbConf.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.posts = require("./post.model.js")(sequelize, Sequelize);

module.exports = db;
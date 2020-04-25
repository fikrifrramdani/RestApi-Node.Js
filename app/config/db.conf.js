module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "node_mysql",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    accuire: 30000,
    idle: 10000,
  }
};

const config = require('../config')
const {Sequelize} = require("sequelize")


module.exports = new Sequelize({
        database: config.name,
        username: config.user,
        password: config.password,
        host: config.host,
        port: config.database_port,
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true, 
            rejectUnauthorized: false 
          }
        },
});

    
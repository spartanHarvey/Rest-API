const config = require('../config')
const {Client} = require("pg")
const {Sequelize} = require("sequelize")

async function connect (){

    const sequelize = new Sequelize({
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

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }


}

module.exports = {connect};
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../connection')


const User = db.define('User', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
      type: Sequelize.STRING,
      allowNull: false

  }
},{initialAutoIncrement: 1000});
User.sync({force: true});
module.exports = User;
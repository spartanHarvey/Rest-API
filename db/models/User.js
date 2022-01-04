const { Sequelize, DataTypes } = require('sequelize');
const db = require('../connection')
const { v4: uuidv4 } = require('uuid');


const User = db.define('User', {

    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue:  uuidv4()

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
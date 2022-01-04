const { Sequelize, DataTypes, models } = require('sequelize');
const db = require('../connection')
const { v4: uuidv4 } = require('uuid');


const User =  db.define('User', {

    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true

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

User.associate = ()=> {
  User.hasMany(models.Post,{
    onDelete: "cascade"
  })
}
User.sync({force: true});
module.exports = User;
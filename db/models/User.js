const { Sequelize, DataTypes} = require('sequelize');
const db = require('../connection')
const Post = require('./Post.js')
const Comment = require('./Comment.js')

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
  username:{
    type: DataTypes.STRING,
    unique:true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
      type: Sequelize.STRING,
      allowNull: false

  }
});

(async () => {
  await User.sync({force: true});
  User.hasMany(Post,{foreignKey:"owner",onDelete: 'cascade',onUpdate:'cascade', hooks: 'true' })
  User.hasMany(Comment,{foreignKey:"owner",onDelete: 'cascade',onUpdate:'cascade', hooks: 'true' })

})()
// start()
module.exports = User;
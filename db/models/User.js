const {  DataTypes} = require('sequelize');
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
    type: DataTypes.STRING,
    allowNull: false
  },
  username:{
    type: DataTypes.STRING,
    unique:true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false

  }
});

(async () => {
  await User.sync({force: true});
  User.hasMany(Post,{foreignKey:"ownerId",onDelete: 'cascade',onUpdate:'cascade', hooks: 'true' })
  User.hasMany(Comment,{foreignKey:"ownerId",onDelete: 'cascade',onUpdate:'cascade', hooks: 'true' })

})();

module.exports = User;
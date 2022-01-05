const { Sequelize, DataTypes} = require('sequelize');
const db = require('../connection')
const User = require('./User');


const Comment = db.define('Comment', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true

},
  comment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  postId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  owner: {
    type: DataTypes.UUID,
  }
});



const start = async () => {
  await Comment.sync({force: true});
  Comment.belongsTo(db.models.User,{foreignKey:"owner",onDelete: 'cascade',onUpdate:'cascade' , hooks: 'true' })
  Comment.belongsTo(db.models.Post,{foreignKey:"postId",onDelete: 'cascade',onUpdate:'cascade' , hooks: 'true' })

}
start()

module.exports = Comment;
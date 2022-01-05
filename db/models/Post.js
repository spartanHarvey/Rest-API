const { Sequelize, DataTypes} = require('sequelize');
const db = require('../connection')
const User = require('./User');


const Post = db.define('Post', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true

},
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo: {
      type: DataTypes.ARRAY(DataTypes.BLOB)
  },
  owner: {
    type: DataTypes.UUID,
  }
});




const start = async () => {
  await Post.sync({force: true});
  Post.belongsTo(db.models.User,{foreignKey:"owner",onDelete: 'cascade', onUpdate:'cascade' ,hooks: 'true' })
  Post.hasMany(db.models.Comment,{foreignKey:"postId",onDelete: 'cascade',onUpdate:'cascade' ,hooks: 'true' })

}
start()

module.exports = Post;
const { DataTypes} = require('sequelize');
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
  ownerId: {
    type: DataTypes.UUID,
  }
});


(async () => {
  await Post.sync({force: true});
  Post.belongsTo(db.models.User,{foreignKey:"ownerId",onDelete: 'cascade', onUpdate:'cascade' ,hooks: 'true' })
  Post.hasMany(db.models.Comment,{foreignKey:"postId",onDelete: 'cascade',onUpdate:'cascade' ,hooks: 'true' })

})();


module.exports = Post;
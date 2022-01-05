const { DataTypes} = require('sequelize');
const db = require('../connection')


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
  ownerId: {
    type: DataTypes.UUID,
  }
});



(async () => {
  await Comment.sync({force: true});
  Comment.belongsTo(db.models.User,{foreignKey:"ownerId",onDelete: 'cascade',onUpdate:'cascade' , hooks: 'true' })
  Comment.belongsTo(db.models.Post,{foreignKey:"postId",onDelete: 'cascade',onUpdate:'cascade' , hooks: 'true' })

})();

module.exports = Comment;
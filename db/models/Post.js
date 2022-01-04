const { Sequelize, DataTypes, models } = require('sequelize');
const db = require('../connection')
const User = require('./User');


const Post = db.define('Post', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true

},
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  photo: {
      type: Sequelize.BLOB
  },
  whoPosted: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id'
    }
  }
});


// Post.belongsTo('User', {foreignKey: 'whoPosted', onDelete: 'cascade', hooks: 'true' })
// }
// Post.associate = () => {
Post.sync({force: true});
module.exports = Post;
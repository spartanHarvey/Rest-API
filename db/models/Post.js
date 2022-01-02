const { Sequelize, DataTypes } = require('sequelize');
const db = require('../connection')
const { v4: uuidv4 } = require('uuid');
const User = require('./User');


const Post = db.define('Post', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue:  uuidv4()

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
      model: 'Posts',
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    }
  }
});


Post.sync({force: true});
Post.belongsTo(User, {foreignKey: 'whoPosted', onDelete: 'cascade', hooks: 'true' })
module.exports = Post;
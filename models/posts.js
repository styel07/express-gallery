module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    author : DataTypes.STRING,
    url : DataTypes.STRING,
    description : DataTypes.STRING
  });
  return Post;
};
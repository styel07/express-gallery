module.exports = function(sequelize, DataTypes) {
  var Posts = sequelize.define('Posts', {
    author : DataTypes.STRING,
    url : DataTypes.STRING,
    description : DataTypes.STRING
  });
  return Posts;
};
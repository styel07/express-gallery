module.exports = function(sequelize, DataTypes) {
  var Posts = sequelize.define('Posts', {
    author : DataTypes.STRING,
    url : DataTypes.STRING,
    title : DataTypes.STRING,
    description : DataTypes.STRING
  });
  return Posts;
};
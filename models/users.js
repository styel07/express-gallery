module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    username : DataTypes.STRING,
    password : DataTypes.STRING
    // , {
    //   classMate : function(models) {
    //     User.hasMany(models.Task)
    //   }
    //   }
    //   tableName : 'User',
    //   url : ['big-pic.png', 'jazz-cats.jpg']ethods :
    //   {associ
  });
  return User;
};
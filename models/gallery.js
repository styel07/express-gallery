module.exports = function(sequelize, DataTypes) {
  var Gallery = sequelize.define('Gallery', {
    url : DataTypes.STRING
    // , {
    //   classMate : function(models) {
    //     Gallery.hasMany(models.Task)
    //   }
    //   },
    //   tableName : 'gallery',
    //   url : ['big-pic.png', 'jazz-cats.jpg']ethods :
    //   {associ
  });
  return Gallery;
};
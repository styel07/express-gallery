// var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    username : DataTypes.STRING,
    password : {
      type : DataTypes.CHAR(16),
      required : true
    }
  // }, {
  //     validPassword :  function(password) {
  //       return (bcrypt.hash(password) === this.password);
  //     }
  //   },
  //   hooks : {
  //     beforeCreate : [
  //       function() {
  //         this.password = bcrypt.hash(this.password);
  //       }
  //     ]
  //   }


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
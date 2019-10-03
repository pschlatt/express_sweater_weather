module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail:true
      },
      unique: { //not producing error 
          args: true,
          msg: 'This email is already being used.'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    api_key: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};

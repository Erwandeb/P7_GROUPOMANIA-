module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    uid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 4,
        max: 15,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,validate: {
        notEmpty: true,
        min: 4,
        max: 15,
      },
    }
  })
}

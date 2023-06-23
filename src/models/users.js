const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.bookings, {
        foreignKey: 'playerid',
      });
      this.hasMany(models.enclousures, {
        foreignKey: 'ownerid',
      });
      this.hasMany(models.sessions, {
        foreignKey: 'id',
      });
    }
  }
  users.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};

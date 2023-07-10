'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users,{
        as: 'player_Id',
        foreignKey: 'playerid',
      });
      this.belongsTo(models.availabilities,{
        as: 'availability_Id',
        foreignKey: 'availabilityid',
      });
      this.belongsTo(models.fields,{
        as: 'field_Id',
        foreignKey: 'fieldid',
      });
    }
  }
  bookings.init({
    active: DataTypes.BOOLEAN,
    date: DataTypes.DATE,
    hour: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bookings',
  });
  return bookings;
};
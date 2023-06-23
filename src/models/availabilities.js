const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class availabilities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.fields, {
        as: 'field_Id',
        foreignKey: 'fieldid',
      });
      this.hasMany(models.bookings, {
        foreignKey: 'availabilityid',
      });
    }
  }
  availabilities.init({
    timestart: DataTypes.DATE,
    timeend: DataTypes.DATE,
    available: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'availabilities',
  });
  return availabilities;
};

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class enclousures extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, {
        as: 'owner_Id',
        foreignKey: 'ownerid',
      });
      this.hasMany(models.fields, {
        foreignKey: 'fieldid',
      });
    }
  }
  enclousures.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    district: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    socialmedia: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'enclousures',
  });
  return enclousures;
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Task,{foreignKey:'userId',as:'tasks',onDelete:'CASCADE'});
    }
    }
      User.init({
        userName: {
          type: DataTypes.STRING(15),
          allowNull: false,
          validate:{
            notEmpty:{
              args: true,
              msg: 'El nombre de usuario es obligatorio'
            }
          }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate:{
            notEmpty:{
              args: true,
              msg: 'La contraseña es obligatoria'
            }
          }
        }
      }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
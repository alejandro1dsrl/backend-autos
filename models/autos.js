'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Autos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Autos.hasMany(models.Alquiler, { foreignKey: 'autoId' });
    }
  }
  Autos.init({
    marca: DataTypes.STRING,
    modelo: DataTypes.STRING,
    imagen: DataTypes.STRING,
    // Agregamos field para mapear exactamente al nombre en la DB
    valorAlquiler: {
      type: DataTypes.FLOAT,
      field: 'valorAlquiler' 
    },
    anio: DataTypes.STRING,
    disponibilidad: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Autos',
    tableName: 'autos', // Esto asegura que busque "autos" y no "Autos"
    freezeTableName: true,
    underscored: false // Mantenemos CamelCase si así está en tu DB
  });
  return Autos;
};
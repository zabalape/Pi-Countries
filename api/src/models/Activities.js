const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activities', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    length: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    season: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    countryId: {
        type: DataTypes.UUID,
        references: {
          model: 'countries',
          key: 'id',

    }
    },
    
    userId: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',

    }
    }
});
}
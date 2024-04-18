const {poolSequelize,Sequelize} = require('../connect_db');

const User =  poolSequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pseudo: {
    type: Sequelize.STRING,
    unique: true
  },
  mail: {
    type: Sequelize.STRING,
    unique: true
  },
  mdp: {
    type: Sequelize.STRING
  },
  session: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,/*indique que les colonnes de timestamp automatique (createdAt et updatedAt) ne doivent pas être ajoutées aux tables, à moins que vous ne les ayez inclus dans votre schéma et que vous souhaitiez les utiliser.*/
  tableName: 'userr'
});

module.exports = User;
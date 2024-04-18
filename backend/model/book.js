const {poolSequelize,Sequelize} = require('../connect_db');

const Book = poolSequelize.define('books',{
  id: {
    type:Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titre: {
    type: Sequelize.STRING
  },
  autor: {
    type: Sequelize.STRING
  },
  date_pub: {
    type: Sequelize.DATE
  },
  cover: {
    type: Sequelize.STRING
  },
  resume: {
    type: Sequelize.TEXT
  },
  prix: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false,
  tableName: 'books'
});


module.exports = Book
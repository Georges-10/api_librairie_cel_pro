const {poolSequelize,Sequelize} = require('../connect_db');
const User = require('./user');
const Book = require('./book');

console.log('la '+User.tableName);

const Basket = poolSequelize.define('Basket', {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,  
    references: {
      model: User.tableName,
      key: 'id'
    }
  },
  book_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: Book.tableName,
      key: 'id'
    }
  },
  quantity: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false,
  tableName: 'basket'
});


User.hasMany(Basket, { foreignKey: 'user_id' });
Book.hasMany(Basket, { foreignKey: 'book_id' });
Basket.belongsTo(User, { foreignKey: 'user_id' });
Basket.belongsTo(Book, { foreignKey: 'book_id' });

module.exports = Basket;
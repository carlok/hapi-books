'use strict';

module.exports = function (bookshelf) {
  return bookshelf.orm.Model.extend({
    tableName: 'books',
    /*user: function() {
        return this.belongsTo(User);
    }*/
  }, {
      findAll: function () {
        return this.forge().fetchAll().then(books => books.toJSON());
      }
    })
};
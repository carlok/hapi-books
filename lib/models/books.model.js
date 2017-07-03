'use strict';

module.exports = function (bookshelf) {
  // http://stackabuse.com/bookshelf-js-a-node-js-orm/
  /*
  User.forge({email: 'joe@example.com'}).fetch({withRelated: ['addresses']})
.then(function(user) {
    console.log('Got user:', user.get('name'));
    console.log('Got addresses:', user.related('addresses'));
});
  */
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
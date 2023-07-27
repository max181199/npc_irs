var book = require('./book/index')
var bookmark = require('./bookmark/index')

const initOptions = {
  schema: 'npc_irs'
};

const pgp = require('pg-promise')(initOptions);

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'postgre',
});

function useDB(fn, db){
  return function(...args){
    return fn(db, ...args)
  }
}

module.exports.book = {
  get : useDB(book.get, db),
  getById: useDB(book.getById, db),
  isPageCorrect : useDB(book.isPageCorrect, db),
  insert: useDB(book.insert, db),
  isBookExists: useDB(book.isBookExists, db),
  isDateCorrect: useDB(book.isDateCorrect, db)
} 
module.exports.bookmark = {
  get: useDB(bookmark.get, db),
  getById: useDB(bookmark.getById, db),
  drop: useDB(bookmark.drop, db),
  insert: useDB(bookmark.insert, db),
  update: useDB(bookmark.update, db)
}
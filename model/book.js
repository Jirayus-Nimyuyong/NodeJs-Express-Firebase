const database = require('../connect-firebase')

const booksCollection = database.collection('books')

module.exports = booksCollection

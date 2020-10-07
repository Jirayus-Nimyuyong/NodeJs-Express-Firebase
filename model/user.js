const database = require('../connect-firebase')

const usersCollection = database.collection('users')

module.exports = usersCollection

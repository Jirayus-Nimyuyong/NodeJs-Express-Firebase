const admin = require('firebase-admin')
const config = require('config')

const serviceAccount = require('./key-bookstore.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.get('firebase.url')
})

const database = admin.firestore()

module.exports = database

// Firestore connection
const admin = require('firebase-admin')
const serviceAccount = require('./pwc-event-app-firebase-adminsdk-11rf9-c9949f2bf3.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

module.exports = db
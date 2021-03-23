const express = require('express')
const app = express()

const events = {}

const db = require('./db.js')

events.getAll = (credentials) => {
  return db.collection('events').where('email', '==', credentials.email).where('password', '==', credentials.password).get().then(snapshot => {
    if (!snapshot.empty) {
      snapshot.docs.map(doc => {
        return {status: 400, message: "User found", event: doc.data()}
      })
    }
    return {status: 404, message: "User not found", event: null}
  })
}
app.get('/event/get', (req, res) => {
  events.get(req.body).then(response => {
    res.send(response)
  })
})

events.registerFor = (event) => {
  return db.collection('events').where('email', '==', event.email).get().then(async snapshot => {
    if (snapshot.empty) {
      var postedUser = await db.collection('events').add(event)
      console.log(postedUser, postedUser.id)
      return {status: 200, message: "User succesfully registered", body: postedUser}
    } else {
      return {status: 400, message: "User is already registered", body: null}
    }
  })
}
app.post('/event/registerFor', (req, res) => {
  events.register(req.body).then(response => {
    res.send(response)
  })
})

module.exports = events
const express = require('express')
const app = express()

const users = {}

const db = require('./db.js')

users.get = (credentials) => {
  return db.collection('users').where('email', '==', credentials.email).where('password', '==', credentials.password).get().then(snapshot => {
    if (!snapshot.empty) {
      snapshot.docs.map(doc => {
        return {status: 400, message: "User found", user: doc.data()}
      })
    }
    return {status: 404, message: "User not found", user: null}
  })
}
app.get('/user/get', (req, res) => {
  users.get(req.body).then(response => {
    res.send(response)
  })
})

users.register = (user) => {
  return db.collection('users').where('email', '==', user.email).get().then(async snapshot => {
    if (snapshot.empty) {
      var postedUser = await db.collection('users').add(user)
      console.log(postedUser, postedUser.id)
      return {status: 200, message: "User succesfully registered", body: postedUser}
    } else {
      return {status: 400, message: "User is already registered", body: null}
    }
  })
}
app.post('/user/register', (req, res) => {
  users.register(req.body).then(response => {
    res.send(response)
  })
})

module.exports = users
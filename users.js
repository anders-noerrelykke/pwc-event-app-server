const db = require('./db.js')

const users = {}

users.get = (credentials) => {
  console.log(credentials)
  return db.collection('users').where('email', '==', credentials.email)
  .get().then(snapshot => {
    if (snapshot.size) {
      snapshot.docs.map(doc => {
        return {status: 400, message: "User found", user: doc.data()}
      })
    } else {
      return {status: 404, message: "User not found", user: null}
    }
  })
}

users.register = (user) => {
  return db.collection('users').where('email', '==', user.email).get().then(async snapshot => {
    if (!snapshot.size) {
      var postedUser = await db.collection('users').add(user)
      console.log(postedUser, postedUser.id)
      return {status: 200, message: "User succesfully registered", body: postedUser}
    } else {
      return {status: 400, message: "User is already registered", body: null}
    }
  })
}

module.exports = users
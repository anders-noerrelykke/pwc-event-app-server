const db = require('./db.js')

const users = {}

users.get = (body) => {
  return db.collection('users').where('email', '==', body.email).get().then(snapshot => {
    if (snapshot.size) {
      userObject = {}
      snapshot.docs.map(doc => {
        userObject = doc.data()
        userObject.id = doc.id
      })
      return {status: 200, message: "User found", user: userObject}
    } else {
      return {status: 404, message: "User not found", user: null}
    }
  })
}

users.getAll = () => {
  return db.collection('users').get().then(snapshot => {
    if (snapshot.size) {
      userArray = []
      snapshot.docs.map(doc => {
        userArray.push({...doc.data(), id: doc.id})
      })
      return {status: 200, message: "Users found", users: userArray}
    } else {
      return {status: 404, message: "Users not found", users: null}
    }
  })
}

users.register = (user) => {
  return db.collection('users').where('email', '==', user.email).get().then(async snapshot => {
    if (!snapshot.size) {
      var postedUser = await db.collection('users').add(user)
      user.id = postedUser.id
      return {status: 200, message: "User succesfully registered", user: user}
    } else {
      return {status: 400, message: "User is already registered", user: null}
    }
  })
}

module.exports = users
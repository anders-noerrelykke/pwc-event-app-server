const db = require('./db.js')

const events = {}

events.getAll = () => {
  return db.collection('events').get().then(snapshot => {
    if (snapshot.size) {
      var events = []
      snapshot.docs.map(doc => {
        events.push(doc.data())
      })
      return {status: 200, message: "Events found", events}
    } else {
      return {status: 404, message: "Found no events", events: []}
    }
  })
}

module.exports = events
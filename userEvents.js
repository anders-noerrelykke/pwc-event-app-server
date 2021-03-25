const db = require('./db.js')

const userEvents = {}

userEvents.getAllEventsWithParticipants = () => {
  return db.collection('events').get().then(snapshot => {
    var events = []
    snapshot.docs.map(doc => {
      eventObject = {...doc.data(), id: doc.id}
      events.push(eventObject)
    })
    return {status: 200, message: "Got all events", events: events}
  })
}

userEvents.signUp = ({user, event}) => {
  return db.collection('events').doc(event.id).get().then(snapshot => {
    updatedEvent = snapshot.data()
    updatedEvent.participants.push(user.id)
    return db.collection('events').doc(event.id).update(updatedEvent).then(snapshot => {
      return {status: 200, message: "User attendance logged", event: updatedEvent}
    })
  })
}

module.exports = userEvents
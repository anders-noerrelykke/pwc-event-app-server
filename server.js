const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const port = 5000

const users = require('./users.js')
const events = require('./events.js')
const userEvents = require('./userEvents')

app.use(express.json())
app.use(cors())


// BASIC
app.get('/', (req, res) => {
  res.send('PWC Event Server is live')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})

// USERS
app.post('/user/get', (req, res) => {
  users.get(req.body).then(response => {
    res.send(response)
  })
})

app.get('/user/getAll', (req, res) => {
  users.getAll().then(response => {
    res.send(response)
  })
})

app.post('/user/register', (req, res) => {
  users.register(req.body).then(response => {
    res.send(response)
  })
})

// EVENTS
app.get('/userEvent/getAllEventsWithParticipants', (req, res) => {
  userEvents.getAllEventsWithParticipants().then(response => {
    res.send(response)
  })
})

// USEREVENTS
app.post('/userEvent/signUp', (req, res) => {
  userEvents.signUp(req.body).then(response => {
    res.send(response)
  })
})
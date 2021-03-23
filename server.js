const express = require('express')
const app = express()
const port = 3460

const users = require('./users.js')

// users.register({firstName: "Mikkel", lastName: "Nørrelykke", email: 'meknl@hotmail.co', phone: "27642712"})

app.get('/', (req, res) => {
  res.send('PWC Event Server is live')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
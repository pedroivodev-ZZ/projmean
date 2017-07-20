const port = 3004

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const cors = require('./cors')

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors)

server.listen(port, function () {
  console.log(`Server running on port ${port}.`)
})

module.exports = server

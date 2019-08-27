const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const socket = require('socket.io')

const app = express()
const server = require('http').Server(app)
const io = socket(server)

mongoose.connect(
  'mongodb+srv://rocketbox:rocketbox123@vuelma00-tz33q.mongodb.net/rocketbox?retryWrites=true&w=majority',
  {
    useNewUrlParser: true
  }
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

app.use(require('./routes'))

server.listen(3000)

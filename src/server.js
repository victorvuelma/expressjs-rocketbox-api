const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const socket = require('socket.io')
const cors = require('cors')

const dotenv = require('dotenv')
dotenv.config()

const app = express()
const server = require('http').Server(app)

const io = socket(server)

io.on('connection', (socket) => {
  socket.on('connectRoom', (box) => {
    socket.join(box)
  })
})

mongoose.connect(process.env.MONGODB_SRV, {
  useNewUrlParser: true
}
)

app.use(cors())
app.use((req, res, next) => {
  req.io = io

  return next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

app.use(require('./routes'))

server.listen(process.env.PORT || 3000)

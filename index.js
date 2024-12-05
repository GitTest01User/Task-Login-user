const express = require("express")
const http = require('http')
const socketlo = require('socket.io')
const app = express()

const Port = 3400

const RoutesLogin = require("./routes/UserLogin")
app.use(express.json())
const server = http.createServer(app)
const io = socketlo(server)


io.on('connection', (socket) => {
    console.log('user connected')
    socket.lo.on('message', (message) => {
        console.log('Message recevied ', message)
        io.emit('message', message)
    })

    socket.lo('disconnect', () => {
        console.log('user disconnected ')
    })
})


app.use(RoutesLogin)

app.get('/', (req, res) => {
    res.send('welcome to server')
})


app.listen(Port, () => {
    console.log('Server is Running !', Port)
})
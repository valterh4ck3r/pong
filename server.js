const express = require('express')
const app = express()
const server = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(server)


app.use(express.static(path.join(__dirname , 'public')))
app.set('views' , path.join(__dirname , 'public'))
app.engine('html' , require('ejs').renderFile)
app.set('view engine' , 'html')

app.use('/' , (req , res) => {
    res.render('index.html')
})

server.listen(3000 , () => {
    console.log('Servidor Iniciado')
})


// Socket

// On Connection

var clients = []
io.on('connection' , (socket) => {
    console.log(`Socket conectado : ${socket.id}`)

    clients.push(socket)

    console.log(clients.length)

    if(clients.length == 2){
        console.log('Jogo Iniciado')
        socket.broadcast.emit('startGame')
    }
})
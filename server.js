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
io.on('connection' , (socket) => {
    console.log(`Socket conectado : ${socket.id}`)

    var clientsCount = io.engine.clientsCount

    console.log(clientsCount)

    socket.emit('connection' , clientsCount)

    socket.on('startGame' , function(pong){
        console.log('Jogo Começou')
        socket.emit('gameStarted' , pong)
    })

    socket.on('end' , () => {
        socket.broadcast.emit('playerDisconnected' , clientsCount)
        socket.disconnect(0)
    })
    
})






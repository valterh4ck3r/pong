var socket = io('http://localhost:3000')

var pong

// socket.on('startGame' , (data) => {
//     console.log('Jogo Iniciado' + data)
//     initGame()
// })

socket.on('connection' , function(clientsCount){
    console.log('Quantidade de Jogadores: ' + clientsCount)

    if(clientsCount == 2){
        initGame()
    }
})

socket.on('playerDisconnected' , function(player){
    pong.win('Outro jogador se desconectou!')
    // socket.emit('end')
})

window.onunload = function(){
    socket.emit('end')
}

function initGame() {
    pong = new Pong(document.getElementById('pong'));

    function resize () {
        var gameHeight = window.innerHeight - 40 + 'px';
        document.getElementById('pong').style.height = gameHeight;

        pong.resize();
    }

    resize();

    pong.on('point', function (player) {
        if(player.score == 10){
            var pName = (player === pong.players.a) ? '1' : '2';
            pong.win('Jogador ' + pName + ' venceu!');
        }
    })

    window.onresize = resize;

    pong.players.a.addControls({
        'up': 'w',
        'down': 's',
    });

    pong.players.b.addControls({
        'up': 'up',
        'down': 'down',
    });

    function winGame(){
        
    }
};
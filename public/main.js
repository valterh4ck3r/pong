var socket = io('http://localhost:3000')

socket.on('startGame' , (socket) => {
    console.log('Start Game')
    // initGame()
})

window.onload = initGame

function initGame() {
    var pong = new Pong(document.getElementById('pong'));

    function resize () {
        var gameHeight = window.innerHeight - 40 + 'px';
        document.getElementById('pong').style.height = gameHeight;

        pong.resize();
    }

    resize();

    pong.on('point', function (player) {
        if(player.score == 2){
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
};
var score = 0,
    scoreBoard,
    //TODO: fix enemies left when specified
    enemiesLeft = 100,
    enemiesLeftBoard;

function initializeStats (){
    scoreBoard = new Kinetic.Text({
        x: 120,
        y: 2,
        text: 'Score: ' + score,
        fontSize: 25,
        fontFamily: 'Consolas',
        fill: '#4DBD33'
    });

    layer.add(scoreBoard);
    
    enemiesLeftBoard = new Kinetic.Text({
        x: 270,
        y: 2,
        text: 'Enemies left: ' + enemiesLeft,
        fontSize: 25,
        fontFamily: 'Consolas',
        fill: '#ff1919'
    });

    layer.add(enemiesLeftBoard);
}

var updateScore = new Kinetic.Animation(function (frame) {
    try {
        score = deadEnemies.length;
        scoreBoard.setText('Score: ' + score);
        //TODO: fix enemies left when specified
        enemiesLeftBoard.setText('Enemies left: ' + enemiesLeft);
    } catch (err) { 
        console.log(err); 
    }
}, layer);
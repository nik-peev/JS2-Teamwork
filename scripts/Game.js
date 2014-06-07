var layer, rect, stage,	
	CANVAS_WIDTH = $(document).width(),
    CANVAS_HEIGHT = $(document).height()*99/100,
    stage = new Kinetic.Stage({
        container: 'container',
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT
    }),
    layer = new Kinetic.Layer(),	
	enemies = [],
    maxEnemiesOnScreen = 10,
    numberOfEnemies = 0;
    numberOfDeadEnemies = 0;
	deadEnemies = [],
	bullets = [],
	bullet = {},
	player = {},
	speed = 1,
	lastkeypress = 0;

window.onload = function () {
    initialization();
    start();
}; 

function initialization () {
    health = new Kinetic.Rect({
        x: 5,
        y: 5,
        width: 100,
        height: 20,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 1
    });

    layer.add(health);
    
    initializeStats();

    createPlayer('images/player.gif', { x: 0, y: CANVAS_HEIGHT / 2 }, { w: 50, h: 50 });
    action(); 
    
    stage.add(layer); 
    stage.draw();
};

function start () {
    playerAnimation.start();
    enemyAnimation.start();
    bulletAnimation.start();
    updateScore.start();
    generateEnemies();
};

function collides(a, b) {
    return a.x <= b.x + b.width &&
             a.x + a.width >= b.x &&
             a.y <= b.y + b.height &&
             a.y + a.height >= b.y;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}  
var layer, rect, stage,	
	CANVAS_WIDTH = 800,
    CANVAS_HEIGHT = 600,
    stage = new Kinetic.Stage({
        container: 'container',
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT
    }),
    layer = new Kinetic.Layer(),	
	enemies = [],
    numberOfEnemies = 50,
	enemiesdead = [],
	bullets = [],
	bullet = {},
	player = {},
	speed = 1,
	lastkeypress = 0;

var createPlayer = function (imagesource, position, dimension) {
    var imageObj = new Image();

    imageObj.onload = function () {
        var m = new Kinetic.Image({
            x: position.x,
            y: position.y,
            image: imageObj,
            width: dimension.w,
            height: dimension.h
        });

        layer.add(m);
        player = { img: m, pos: position, movedim: { x: 0, y: 0 }, dim: dimension, animate: false };
    };
    imageObj.src = imagesource;
}

var createBullet = function (imagesource, position, dimension) {
    var imageObj = new Image();

    imageObj.onload = function () {
        var m = new Kinetic.Image({
            x: position.x,
            y: position.y,
            image: imageObj,
            width: dimension.w,
            height: dimension.h
        });

        // add the shape to the layer
        layer.add(m);
        bullets.push({
            img: m,
            x: m.getPosition().x,
            y: m.getPosition().y,
            width: dimension.w,
            height: dimension.h,
            active: true
        });
    };
    imageObj.src = imagesource;
};

var createEnemy = function (imagesource, position, dimension, speed) {
    var imageObj = new Image();
    imageObj.src = imagesource;

    var m = new Kinetic.Image({
        x: position.x,
        y: position.y,
        image: imageObj,
        width: dimension.w,
        height: dimension.h
    });

    layer.add(m);

    enemies.push({ img: m,
        x: position.x,
        y: position.y,
        width: dimension.w,
        height: dimension.h,
        active: true,
        spd: speed
    });
};

var createDeadEnemy = function (imagesource, position, dimension) {
    var imageObj = new Image();

    imageObj.onload = function () {
        var m = new Kinetic.Image({
            x: position.x,
            y: position.y,
            image: imageObj,
            width: dimension.w,
            height: dimension.h
        });
        
        layer.add(m);

        enemiesdead.push({ img: m,
            dir: 'd',
            x: position.x,
            y: position.y,
            width: dimension.w,
            height: dimension.h
        });
    };
    imageObj.src = imagesource;
};

var anim = new Kinetic.Animation(function (frame) {
    try {
        if (player.animate) {
            player.img.move(player.movedim);
            if (player.img.getPosition().x <= 0) {
                player.img.setPosition({ x: 0 })
            }
            else if ((player.img.getPosition().x + player.dim.w) >= CANVAS_WIDTH) {
                player.img.setPosition({ x: CANVAS_WIDTH - player.dim.w });
            }
            player.pos = { x: player.img.getPosition().x, y: player.img.getPosition().y };
        }
    } catch (err) { 
        console.log(err); 
    }

    try {
        for (var i = 0; i < enemies.length; i++) {
            en = enemies[i];
            if (enemies[i].active) {
                en.img.move({ x: -en.spd });
                en.x = en.x - en.spd;

                if (en.x < -en.width) {
                    en.x = CANVAS_WIDTH + en.width;
                    en.img.setPosition({ x: en.x });
                    health.setWidth(health.getWidth() - 2);
                    if (health.getWidth() <= 0) {
                        lost();
                    }
                }
            }
        };
    } catch (err) { 
        console.log(err); 
    }

    try {
        enemiesdead.forEach(function (en) {
            if (en != null && en.y < (CANVAS_HEIGHT + en.height)) {
                if (en.dir == 'd') {
                    en.img.move({ y: speed + 2 });
                    en.y = en.y + speed + 2;
                }
            }
        });
    } catch (err) { 
        console.log(err); 
    }

    try {
        bullets.forEach(function (bullet) {
            if (bullet != null) {
                if (bullet.x > -bullet.width && bullet.active) {
                    bullet.img.move({ x: (speed + 3) });
                    bullet.x = bullet.x + (speed + 3);

                    enemies.forEach(function (enemy) {
                        if (enemy.active && collides(bullet, enemy)) {
                            bullet.active = false;
                            enemy.active = false;
                            bullet.img.destroy();
                            enemy.img.destroy();
                            createDeadEnemy("images/deadEnemy.png", { x: enemy.x, y: enemy.y }, { w: 38, h: 31 });
                        }
                    });
                }
            };
        });
    } catch (err) { 
        console.log(err);
    }

}, layer);

function collides(a, b) {
	return a.x <= b.x + b.width &&
	         a.x + a.width >= b.x &&
	         a.y <= b.y + b.height &&
	         a.y + a.height >= b.y;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var initialization = function () {
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

    createPlayer('images/player.gif', { x: 0, y: CANVAS_HEIGHT / 2 }, { w: 50, h: 50 });

    $(document).on('keyup', function (e) {
        if (lastkeypress == 38 || lastkeypress == 40) {
            player.animate = false;
        }
    });
    $(document).keypress(function (e) {
        if (e.which == 32) {
            lastkeypress = 32;
            createBullet('images/missle.gif', { x: player.pos.x, y: player.pos.y }, { w: 21, h: 9 });
            e.preventDefault();
        }
    })
    $(document).on('keydown', function (e) {
        if (e.keyCode == 38) {
            lastkeypress = 38
            //move up
            player.movedim = { x: 0, y: -(speed + 3) };
            player.animate = true;
            e.preventDefault();
        }
        else if (e.keyCode == 40) {
            lastkeypress = 40;
            //move down
            player.movedim = { x: 0, y: (speed + 3) };
            player.animate = true;
            e.preventDefault();
        }
    });
    stage.add(layer); 
    stage.draw();
};

var start = function () {
    anim.start();
    gameInterval = setInterval(function () {
        if (enemies.length < numberOfEnemies) {
            createEnemy('images/enemy.png', { x: CANVAS_WIDTH, y: getRandomInt(40, CANVAS_HEIGHT / 2) }, { w: 38, h: 33 }, getRandomInt(1, 1));
        }
        else if(enemiesdead.length == 10) {
            // WIN
        }
    }, 1000);
};

window.onload = function () {
    initialization();
    start();
};                   
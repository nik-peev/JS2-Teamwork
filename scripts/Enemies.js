function createEnemy (imagesource, position, dimension, speed) {
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

function createDeadEnemy (imagesource, position, dimension) {
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

        deadEnemies.push({ img: m,
            dir: 'd',
            x: position.x,
            y: position.y,
            width: dimension.w,
            height: dimension.h
        });
    };
    imageObj.src = imagesource;
};

function generateEnemies() {
   if (enemies.length - deadEnemies.length < numberOfEnemies) {
        createEnemy('images/enemy.png', { x: CANVAS_WIDTH -  getRandomInt(1,100) , y: getRandomInt(10, CANVAS_HEIGHT - 33) }, { w: 38, h: 33 }, getRandomInt(1, 1));
    }
    else if(deadEnemies.length == 10) {
        // WIN
    } 
    window.requestAnimationFrame(generateEnemies)
} 

var enemyAnimation = new Kinetic.Animation(function (frame) {
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
        deadEnemies.forEach(function (en) {
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
}, layer);
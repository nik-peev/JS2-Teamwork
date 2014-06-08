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
        spd: speed + (Math.random() * 3),
        bulletCreated: false
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
            height: dimension.h,
            active: true
        });
    };
    imageObj.src = imagesource;
};

function generateEnemies() {
   if (numberOfEnemies - numberOfDeadEnemies < maxEnemiesOnScreen) {
        createEnemy('images/enemy.png', { x: CANVAS_WIDTH -  getRandomInt(1,100) , y: getRandomInt(10, CANVAS_HEIGHT - 33) }, { w: 38, h: 33 }, getRandomInt(1, 1));
        numberOfEnemies++;
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

                if (en.x < -100)  {
                    en.active = false;
                    en.img = null;

                    var i = enemies.indexOf(en);
                    if(i != -1) { 
                        enemies.splice(i, 1); 
                    }

                    numberOfEnemies = numberOfEnemies - 1;
                }

                if (en.x < CANVAS_WIDTH/2) {
                    if (en.bulletCreated === false) {
                        en.bulletCreated = true;
                        createEnemyBullet('images/enemyMissle.gif', { x: en.x, y: en.y + 20 }, { w: 21, h: 9 }, en.spd+2);
                    };
                }
            }
        };

    } catch (err) { 
        console.log(err); 
    }
    
    try {
        deadEnemies.forEach(function (en) {
            if (en != null) {
                if (en.active && en.y < (CANVAS_HEIGHT + en.height)) {
                    if (en.dir == 'd') {
                        en.img.move({ y: speed + 2 });
                        en.y = en.y + speed + 2;
                    }
                }
                else
                {
                    en.active = false;
                    en.img = null;
                    var i = deadEnemies.indexOf(en);
                    if(i != -1) { 
                        deadEnemies.splice(i, 1); 
                    }
                }
            }
        });
    } catch (err) { 
        console.log(err); 
    }
}, layer);
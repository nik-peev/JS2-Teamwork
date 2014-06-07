function createBullet (imagesource, position, dimension) {
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

var bulletAnimation = new Kinetic.Animation(function (frame) {
    try {
        bullets.forEach(function (bullet) {
            if (bullet != null) {
                if (bullet.active && bullet.x > -bullet.width) {
                    bullet.img.move({ x: (speed + 3) });
                    bullet.x = bullet.x + (speed + 3);

                    enemies.forEach(function (enemy) {
                        if (enemy.active && collides(bullet, enemy)) {
                            bullet.active = false;
                            enemy.active = false;
                            bullet.img.destroy();
                            bullet.img = null;
                            enemy.img.destroy();
                            enemy.img = null;

                            var i = bullets.indexOf(bullet);
                            if(i != -1) { 
                                bullets.splice(i, 1); 
                            }

                            var i = enemies.indexOf(enemy);
                            if(i != -1) { 
                                enemies.splice(i, 1); 
                            }

                            numberOfDeadEnemies++;

                            createDeadEnemy("images/deadEnemy.png", { x: enemy.x, y: enemy.y }, { w: 38, h: 31 });
                        }
                    });
                }
                
                if (bullet.x > 1500)  {
                    bullet.active = false;
                    bullet.img = null;

                    var i = bullets.indexOf(bullet);
                    if(i != -1) { 
                        bullets.splice(i, 1); 
                    }
                }
            };
        });
    } catch (err) { 
        console.log(err);
    }
}, layer);
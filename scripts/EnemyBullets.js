function createEnemyBullet (imagesource, position, dimension, bSpeed) {
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
        enemyBullets.push({
            img: m,
            x: m.getPosition().x,
            y: m.getPosition().y,
            width: dimension.w,
            height: dimension.h,
            active: true,
            spd: bSpeed
        });
    };
    imageObj.src = imagesource;
};

var enemyBulletAnimation = new Kinetic.Animation(function (frame) {
    try {   
        enemyBullets.forEach(function (enemyBullet) {
            if (enemyBullet != null) {
                if (enemyBullet.active && enemyBullet.x >= -30) {
                    enemyBullet.img.move({ x: -enemyBullet.spd });
                    enemyBullet.x = enemyBullet.x - (enemyBullet.spd);
                }

                if (enemyBullet.x <= -30)  {
                    enemyBullet.active = false;
                    enemyBullet.img = null;

                    var i = enemyBullets.indexOf(enemyBullet);
                    if(i != -1) { 
                        enemyBullets.splice(i, 1); 
                    }

                    health.setWidth(health.getWidth() - 5);
                    if (health.getWidth() <= 0) {
                        window.alert("You lost");
                        // window.open("gameover.html");
                    }                 
                }
            };
        });
    } catch (err) { 
        console.log(err);
    }
}, layer);

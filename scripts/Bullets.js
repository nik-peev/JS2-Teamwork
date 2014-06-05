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
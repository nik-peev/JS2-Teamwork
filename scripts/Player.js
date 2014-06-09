function createPlayer (imagesource, position, dimension) {
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

var playerAnimation = new Kinetic.Animation(function (frame) {
    try {
        if (player.animate) {
            player.img.move(player.movedim);
            if (player.img.getPosition().x <= 0) {
                player.img.setPosition({ x: 0 })
            }
            else if ((player.img.getPosition().x + player.dim.w) >= CANVAS_WIDTH) {
                player.img.setPosition({ x: CANVAS_WIDTH - player.dim.w });
            }

            if (player.img.getPosition().y <= 20) {
                player.img.setPosition({ y: 20 })
            }
            else if ((player.img.getPosition().y + player.dim.h) >= CANVAS_HEIGHT) {
                player.img.setPosition({ y: CANVAS_HEIGHT - player.dim.h });
            }

            player.pos = { x: player.img.getPosition().x, y: player.img.getPosition().y };
        }
    } catch (err) { 
        console.log(err); 
    }
}, layer);

var exploadedParts = [];

function doSpectacularExplosion(x,y){
    var explosionPiecesCount = getRandomInt(3,7);
    //console.log('Count:' + explosionPiecesCount);
    //generating trajectories
    for (var i = 0; i < explosionPiecesCount; i++){
        var imageObj = new Image();
        imageObj.src = 'images/part.png';

        var p = new Kinetic.Image({
            x: x,
            y: y,
            image: imageObj,
            width: 10,
            height:13
        });

        layer.add(p);

        exploadedParts.push({ img: p,
            life: getRandomInt(0,100),
            speedX: getRandomInt(-10,10),
            speedY: getRandomInt(-10,10)
        });
    }
}

var moveParts = new Kinetic.Animation(function (frame) {
        try {
            for (var i = 0; i < exploadedParts.length; i++) {
                if (exploadedParts[i].life > 0) {
                    exploadedParts[i].life--;
                    exploadedParts[i].img.move({ x: exploadedParts[i].speedX, y: exploadedParts[i].speedY});
                } else {
                    exploadedParts[i].img.destroy();
                    exploadedParts.splice(i,1);
                }

            }

        } catch (err) {
            console.log(err);
        }
}, layer);
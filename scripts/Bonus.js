var allBonusObjects = [];
var bonusPoints = 0;
var movingBonuses = [];

function createMovingBonus( destinationX, destinationY, bonus){

    layer.add(bonus.bonusAsKineticObj);

    console.log('Type:' + bonus.type);
    console.log((destinationX - bonus.x)/100);
    movingBonuses.push({ img: bonus.bonusAsKineticObj,
        x:bonus.x,
        y:bonus.y,
        type:bonus.type,
        health:bonus.health,
        boost:bonus.boost,
        speedX: (destinationX - bonus.x)/100,
        speedY: (destinationY - bonus.y)/100,
        destinationX: destinationX,
        destinationY: destinationY
    });

}

function drawHealthBonus(x, y){

    var healthBonus = kineticCircle(x, y, 10, '#FF1414', '#FF3B00', 5);

    allBonusObjects.push({
        bonusAsKineticObj: healthBonus, 
        type:'health',
        x: x,
        y: y,
        radius: 10,
        strokeWidth: 5,
        health: 30
    });

    layer.add(healthBonus);
}

function drawBoostScoreBonus(x, y){

    var scoreBonus = kineticCircle(x, y, 10, '#5DFC0A', '#526F35', 5);

    allBonusObjects.push({
        bonusAsKineticObj: scoreBonus, 
        type:'score-boost',
        x: x,
        y: y,
        radius: 10,
        strokeWidth: 5,
        boost: 30
    });

    layer.add(scoreBonus);
}

function kineticCircle(x, y, radius, fill, stroke, strokeWidth) {
    return new Kinetic.Circle({
        x: x,
        y: y,
        radius: radius,
        fill: fill,
        stroke: stroke,
        strokeWidth: strokeWidth
    });
}

function generateRandomBonusX(displacement, totalWidth) {
    return getRandomInt(displacement, totalWidth - displacement);
}

function generateRandomBonusY(displacement, totalHeight) {
    return getRandomInt(displacement, totalHeight - displacement);
}

function isPlayerOnBonus(x, y, radius, strokeWidth) {

    var isOnY = (player.img.getPosition().y + player.dim.h / 2) > (y - (radius + strokeWidth)) &&
                (player.img.getPosition().y + player.dim.h / 2) < (y + (radius + strokeWidth));
    
    var isOnFrontX = (player.img.getPosition().x + player.dim.w) > (x - (radius + strokeWidth)) &&
                     (player.img.getPosition().x + player.dim.w) < (x + (radius + strokeWidth));
    
    var isOnBackX = (player.img.getPosition().x) > (x - (radius + strokeWidth)) &&
                     (player.img.getPosition().x) < (x + (radius + strokeWidth));
    
    var isOnMiddleX = (player.img.getPosition().x + player.dim.w / 2) > (x - (radius + strokeWidth)) &&
                      (player.img.getPosition().x + player.dim.w / 2) < (x + (radius + strokeWidth));
    
    return isOnY && (isOnFrontX || isOnBackX || isOnMiddleX);
}

var moveBonuses = new Kinetic.Animation(function (frame) {
    for (var i = 0; i < movingBonuses.length; i++) {
        if (movingBonuses[i].img) {
            movingBonuses[i].img.move({x:movingBonuses[i].speedX,y:movingBonuses[i].speedY});
            movingBonuses[i].x = movingBonuses[i].x + movingBonuses[i].speedX;
            movingBonuses[i].y = movingBonuses[i].y + movingBonuses[i].speedY;
//            console.log(movingBonuses[i].x);
//            console.log(movingBonuses[i].y);
            if (movingBonuses[i].x < movingBonuses[i].destinationX || movingBonuses[i].y < movingBonuses[i].destinationY){
                movingBonuses[i].img.destroy();
                movingBonuses[i].img = null;

                if (movingBonuses[i].type === 'health') {
                    document.getElementById("bonus").cloneNode(true).play();
                    if (health.getWidth() + movingBonuses[i].health > 100) {
                        health.setWidth(100);
                    }
                    else {
                        health.setWidth(health.getWidth() + movingBonuses[i].health);
                    }
                }
                if (movingBonuses[i].type === 'score-boost') {
                    document.getElementById("medikit").cloneNode(true).play();
                    bonusPoints += movingBonuses[i].boost;
                }

                movingBonuses.splice(i, 1);
            }
        }
    }
}, layer);

var updateBonus = new Kinetic.Animation(function (frame) {
    try {
        if (player.img) {
            for (var i = 0; i < allBonusObjects.length; i++) {
                if (isPlayerOnBonus(allBonusObjects[i].x, allBonusObjects[i].y,
                    allBonusObjects[i].radius, allBonusObjects[i].strokeWidth)) {
                    if (allBonusObjects[i].type === 'health') {
                        createMovingBonus(100,20,allBonusObjects[i]);
                    }
                    if (allBonusObjects[i].type === 'score-boost') {
                        createMovingBonus(170,20,allBonusObjects[i]);
                    }

                    allBonusObjects.splice(i, 1);
                }
            }
        }
            
    } catch (err) { 
        console.log(err); 
    }
}, layer);

//Just a test commit with VS2013

var allBonusObjects = [];
var bonusPoints = 0;
var movingBonuses = [];

function createMovingBonus( destinationX, destinationY, bonus){

    layer.add(bonus.bonusAsKineticObj);

    console.log('Type:' + bonus.type);
    console.log((destinationX - bonus.x)/100);
    movingBonuses.push({ img: bonus.bonusAsKineticObj,
        speedX: (destinationX - bonus.x)/100,
        speedY: (destinationY - bonus.y)/100
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
        movingBonuses[i].img.move({x:movingBonuses[i].speedX,y:movingBonuses[i].speedY})
    }
}, layer);

var updateBonus = new Kinetic.Animation(function (frame) {
    try {
        if (player.img) {
            for (var i = 0; i < allBonusObjects.length; i++) {
                if (isPlayerOnBonus(allBonusObjects[i].x, allBonusObjects[i].y,
                    allBonusObjects[i].radius, allBonusObjects[i].strokeWidth)) {
                    if (allBonusObjects[i].type === 'health') {
                        createMovingBonus(0,0,allBonusObjects[i]);
                        if (health.getWidth() + allBonusObjects[i].health > 100) {
                            health.setWidth(100);
                            document.getElementById("bonus").cloneNode(true).play();
                        }
                        else {
                            health.setWidth(health.getWidth() + allBonusObjects[i].health);
                            document.getElementById("bonus").cloneNode(true).play();
                        }
                    }
                    if (allBonusObjects[i].type === 'score-boost') {
                        bonusPoints += allBonusObjects[i].boost;
                        createMovingBonus(0,0,allBonusObjects[i]);
                        document.getElementById("medikit").cloneNode(true).play();
                    }

                    //allBonusObjects[i].bonusAsKineticObj.remove();
                    allBonusObjects.splice(i, 1);
                }
            }
        }
            
    } catch (err) { 
        console.log(err); 
    }
}, layer);

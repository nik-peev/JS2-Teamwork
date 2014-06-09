//Just a test commit with VS2013

var allBonusObjects = [];
var HEALING_AMOUNT = 30;

function drawHealthBonus(x, y){

    var healthBonus = new Kinetic.Circle({
        x: x,
        y: y,
        radius: 10,
        fill: '#5DFC0A',
        stroke: '#526F35',
        strokeWidth: 5
    });

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

var updateBonus = new Kinetic.Animation(function (frame) {
    try {
        if (player.img) {
            for (var i = 0; i < allBonusObjects.length; i++) {
                if (isPlayerOnBonus(allBonusObjects[i].x, allBonusObjects[i].y,
                    allBonusObjects[i].radius, allBonusObjects[i].strokeWidth)) {

                    if (allBonusObjects[i].type === 'health') {
                        if (health.getWidth() + allBonusObjects[i].health > 100) {
                            health.setWidth(100);
                        }
                        else {
                            health.setWidth(health.getWidth() + allBonusObjects[i].health);
                        }
                    }

                    allBonusObjects[i].bonusAsKineticObj.remove();
                    allBonusObjects.splice(i, 1);
                }
            }
        }
            
    } catch (err) { 
        console.log(err); 
    }
}, layer);

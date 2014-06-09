//Just a test commit with VS2013

var bonusShape,
    bonusShapeRadius = 10,
    bonusShapeDisplacement = 50,
    bonusX = generateRandomBonusX(bonusShapeDisplacement, CANVAS_WIDTH),
    bonusY = generateRandomBonusY(bonusShapeDisplacement, CANVAS_HEIGHT),
    bonsFillColor = '#5DFC0A',
    bonusStrokeColor = '#526F35',
    bonusStrokeWidth = 5,
    bonusHealth = 30;

function initializeBonus (){
    bonusShape = new Kinetic.Circle({
        x: bonusX,
        y: bonusY,
        radius: bonusShapeRadius,
        fill: bonsFillColor,
        stroke: bonusStrokeColor,
        strokeWidth: bonusStrokeWidth
    });

    layer.add(bonusShape);
}

function generateRandomBonusX(displacement, totalWidth) {
    return getRandomInt(displacement, totalWidth - displacement);
}

function generateRandomBonusY(displacement, totalHeight) {
    return getRandomInt(displacement, totalHeight - displacement);
}

function isPlayerOnBonus() {
    var isOnY = (player.img.getPosition().y + player.dim.h / 2) > (bonusY - (bonusShapeRadius + bonusStrokeWidth)) &&
				(player.img.getPosition().y + player.dim.h / 2) < (bonusY + (bonusShapeRadius + bonusStrokeWidth));
	
	var isOnFrontX = (player.img.getPosition().x + player.dim.w) > (bonusX - (bonusShapeRadius + bonusStrokeWidth)) &&
            	     (player.img.getPosition().x + player.dim.w) < (bonusX + (bonusShapeRadius + bonusStrokeWidth));
	
	var isOnBackX = (player.img.getPosition().x) > (bonusX - (bonusShapeRadius + bonusStrokeWidth)) &&
            	     (player.img.getPosition().x) < (bonusX + (bonusShapeRadius + bonusStrokeWidth));
	
	var isOnMiddleX = (player.img.getPosition().x + player.dim.w / 2) > (bonusX - (bonusShapeRadius + bonusStrokeWidth)) &&
            	      (player.img.getPosition().x + player.dim.w / 2) < (bonusX + (bonusShapeRadius + bonusStrokeWidth));
	
	return isOnY && (isOnFrontX || isOnBackX || isOnMiddleX);
            
}

var updateBonus = new Kinetic.Animation(function (frame) {
    try {
        if (player.img) {
            if (isPlayerOnBonus()) {
                if (health.getWidth() + bonusHealth > 100) {
                    health.setWidth(100);
                }
                else {
                    health.setWidth(health.getWidth() + bonusHealth);
                }

                bonusShape.remove();
                bonusX = generateRandomBonusX(bonusShapeDisplacement, CANVAS_WIDTH);
                bonusY = generateRandomBonusY(bonusShapeDisplacement, CANVAS_HEIGHT);
                initializeBonus();
            }
        }
            
    } catch (err) { 
        console.log(err); 
    }
}, layer);
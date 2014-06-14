function action() {
    $(document).keypress(function (e) {
        if (e.which == 32) {
            lastkeypress = 32;
            createBullet('images/missle.gif', { x: player.pos.x, y: player.pos.y + 20 }, { w: 21, h: 9 });
            
            //play fire sound
            document.getElementById("fire").cloneNode(true).play();
        }
    });

    $(document).on('keydown', function (e) {     
        if (e.keyCode == 38) {
            lastkeypress = 38
            //move up
            player.movedim = { x: 0, y: -(speed + 3) };
            player.animate = true;
        }
        else if (e.keyCode == 40) {
            lastkeypress = 40;
            //move down
            player.movedim = { x: 0, y: (speed + 3) };
            player.animate = true;
        } else if (e.keyCode == 37) {
            lastkeypress = 37;
            //move down
            player.movedim = { x: -(speed + 3), y: 0  };
            player.animate = true;
        } else if (e.keyCode == 39) {
            lastkeypress = 39;
            //move down
            player.movedim = { x: (speed + 3), y: 0 };
            player.animate = true;
        }
    });    
}
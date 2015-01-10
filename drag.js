(function () {
    var startX;
    var startY;
    var canvas = shawn.config.canvas;
    var ctx = shawn.config.context;
    var offsetX = 0;
    var offsetY = 0;

    shawn.config.drag = {
        angle: 0,
        imageX: 0,
        imageY: 0
    }

    canvas.addEventListener('touchmove', function (e) {
        handleMouseMove(e);
    });

    canvas.addEventListener('touchstart', function (e) {
        handleMouseDown(e);
    });

    function handleMouseDown(e) {
        var touchPoint = e.targetTouches[0];
        startX = parseInt(touchPoint.clientX - offsetX);
        startY = parseInt(touchPoint.clientY - offsetY);
    }

    function handleMouseMove(e) {
        var dragConfig = shawn.config.drag;
        var touchPoint = e.targetTouches[0];
            imageClick = false;

        var mouseX = parseInt(touchPoint.clientX - offsetX);
        var mouseY = parseInt(touchPoint.clientY - offsetY);
        // move the image by the amount of the latest drag
        var dx = mouseX - startX;
        var dy = mouseY - startY;

        switch ((dragConfig.angle / 90) % 4) {
            case 0:
                dragConfig.imageX += dx;
                dragConfig.imageY += dy;
                break;
            case 1:
                dragConfig.imageY -= dx;
                dragConfig.imageX += dy;
                break;
            case 2:
                dragConfig.imageX -= dx;
                dragConfig.imageY -= dy;
                break;
            case 3:
                dragConfig.imageY += dx;
                dragConfig.imageX -= dy;
                break;
        }
        // reset the startXY for next time
        startX = mouseX;
        startY = mouseY;

        // redraw the image with border
        shawn.draw();
    }


}())

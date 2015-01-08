(function () {
    var startX;
    var startY;
    var draggableCanvas = document.getElementById('canvas');

    draggableCanvas.addEventListener('touchmove', function (e) {
        handleMouseMove(e);
    });

    draggableCanvas.addEventListener('touchstart', function (e) {
        handleMouseDown(e);
    });

    function handleMouseDown(e) {
        var touchPoint = e.targetTouches[0];
        startX = parseInt(touchPoint.clientX - offsetX);
        startY = parseInt(touchPoint.clientY - offsetY);
    }

    function handleMouseMove(e) {
        var touchPoint = e.targetTouches[0];
            imageClick = false;

            mouseX = parseInt(touchPoint.clientX - offsetX);
            mouseY = parseInt(touchPoint.clientY - offsetY);
            // move the image by the amount of the latest drag
            var dx = mouseX - startX;
            var dy = mouseY - startY;
            var temptX = imageX;
            var temptY = imageY;
            switch ((angle / 90) % 4) {
                case 0:
                    imageX += dx;
                    imageY += dy;
                    break;
                case 1:
                    imageY -= dx;
                    imageX += dy;
                    break;
                case 2:
                    imageX -= dx;
                    imageY -= dy;
                    break;
                case 3:
                    imageY += dx;
                    imageX -= dy;
                    break;
            }
            imageRight += dx;
            imageBottom += dy;
            // reset the startXY for next time
            startX = mouseX;
            startY = mouseY;

            // redraw the image with border
            draw(false, true);
    }


}())

(function () {
    var startX;
    var startY;
    var canvas = shawn.config.canvas;
    var ctx = shawn.config.context;
    var canvasCoordinate = shawn.config.canvasCoordinate;
    var offsetX = canvasCoordinate.left;
    var offsetY = canvasCoordinate.top;

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

    function isTouchInClipRec() {
        if (!shawn.config.isClip) {
            return;
        }

        var clipRectCoordinate = shawn.config.clipRectCoordinate;
        var isInXrange = false;
        var isInYrange = false;


        if (startX >= clipRectCoordinate.offsetX && startX <= clipRectCoordinate.offsetX + clipRectCoordinate.width) {
            isInXrange = true;
        }

        if (startY >= clipRectCoordinate.offsetY && startY <= clipRectCoordinate.offsetY + clipRectCoordinate.height) {
            isInYrange = true;
        }

        return isInXrange && isInYrange;
    }

    function isTouchOnClipRec() {
        var isTouchOnClipRec = false;
        var clipRectCoordinate = shawn.config.clipRectCoordinate;
        var isOnXrange = startX === clipRectCoordinate.offsetX || startX === clipRectCoordinate.offsetX + clipRectCoordinate.width;
        var isOnYrange = startY === clipRectCoordinate.offsetY || startY === clipRectCoordinate.offsetY + clipRectCoordinate.height;
        return {
            isOnXrange:  isOnXrange,
            isOnYrange:  isOnYrange,
            isOnClipRec: isOnXrange || isOnYrange
        }
    }

    function handleMouseMove(e) {
        var dragConfig = shawn.config.drag;
        var touchPoint = e.targetTouches[0];
        var imageClick = false;

        // 当手势在 clipRec 上时只能拖拽 clipRec 或者对 clipRec
        // 进行放大或者缩小

        var mouseX = parseInt(touchPoint.clientX - offsetX);
        var mouseY = parseInt(touchPoint.clientY - offsetY);

        // move the image by the amount of the latest drag
        var dx = mouseX - startX;
        var dy = mouseY - startY;

        var dragOffsetX;
        var dragOffsetY;

        if (isTouchInClipRec()) {
            dragOffsetX = shawn.config.clipRectCoordinate.offsetX;
            dragOffsetY = shawn.config.clipRectCoordinate.offsetY;
        } else {
            dragOffsetX = dragConfig.imageX;
            dragOffsetY = dragConfig.imageY;
        }

        switch ((dragConfig.angle / 90) % 4) {
            case 0:
                dragOffsetX += dx;
                dragOffsetY += dy;
                break;
            case 1:
                dragOffsetY -= dx;
                dragOffsetX += dy;
                break;
            case 2:
                dragOffsetX -= dx;
                dragOffsetY -= dy;
                break;
            case 3:
                dragOffsetY += dx;
                dragOffsetX -= dy;
                break;
        }
        // reset the startXY for next time
        startX = mouseX;
        startY = mouseY;

        // redraw the image with border
        if (isTouchInClipRec()) {
            if (isTouchOnClipRec().isOnClipRec) {
                shawn.config.clipRectCoordinate.width += (dragOffsetX - shawn.config.clipRectCoordinate.offsetX);
                shawn.config.clipRectCoordinate.height += (dragOffsetY - shawn.config.clipRectCoordinate.offsetY);
            }

            shawn.config.clipRectCoordinate.offsetX = dragOffsetX;
            shawn.config.clipRectCoordinate.offsetY = dragOffsetY;

        } else {
            dragConfig.imageX = dragOffsetX;
            dragConfig.imageY = dragOffsetY;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        shawn.draw();
        if (shawn.config.isClip) {
            shawn.drawClipRect();
        }
    }

}())

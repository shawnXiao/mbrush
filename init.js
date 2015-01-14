(function () {
    shawn.config = {
        rotateAngle: 0,
        canvas: null,
        context: null
    };

    shawn.config.canvas = document.getElementById('canvas');
    shawn.config.context = shawn.config.canvas.getContext("2d");
    shawn.config.canvasCoordinate = shawn.getCoordinate(shawn.config.canvas);

    shawn.config.clipRectCoordinate = {
        width: 100,
        height: 100,
        offsetX: canvas.width / 2,
        offsetY: canvas.height / 2
    };



}())

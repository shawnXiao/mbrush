(function () {
    shawn.config = {
        rotateAngle: 0,
        canvas: null,
        context: null
    };
    shawn.config.canvas = document.getElementById('canvas');
    shawn.config.context = shawn.config.canvas.getContext("2d")
}())

;(function () {
    shawn.drawClipRect = drawClipRect;

    function drawClipRect() {
        var canvas = shawn.config.canvas;
        var ctx = shawn.config.context;

        var canvasCoordinate = shawn.config.canvasCoordinate;
        var clipRectCoordinate = shawn.config.clipRectCoordinate;

        ctx.save();
        // draw the rect which useed to clip the image
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.setLineDash([1,2]);
        ctx.rect(clipRectCoordinate.offsetX, clipRectCoordinate.offsetY, clipRectCoordinate.width, clipRectCoordinate.height)
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    }

}())

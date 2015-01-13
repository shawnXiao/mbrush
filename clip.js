;(function () {
    shawn.drawClipRect = drawClipRect;

    function drawClipRect() {
        var canvas = shawn.config.canvas;
        var ctx = shawn.config.context;
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.setLineDash([1,2]);
        ctx.rect(130, 15, 100, 100)
        ctx.closePath();
        ctx.stroke();
        console.log(222);
        ctx.restore();
    }

}())

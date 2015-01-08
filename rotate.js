(function () {
    function rotateImage(degree) {
        ctx.clearRect(0,0,canvas.width,canvas.height);

        // save the unrotated context of the canvas so we can restore it later
        // the alternative is to untranslate & unrotate after drawing
        ctx.save();
        console.log(img.width, img.height, imageX, imageY, imageWidth, imageHeight)

        // move to the center of the canvas
        ctx.translate(canvas.width/2, canvas.height/2);

        // rotate the canvas to the specified degrees
        ctx.rotate(degree*Math.PI/180);

        // draw the image
        // since the context is rotated, the image will be rotated also
        ctx.drawImage(img, 0, 0, img.width, img.height, imageX, imageY, imageWidth, imageHeight);

        // we’re done with the rotating so restore the unrotated context
        ctx.restore();
    }
}())

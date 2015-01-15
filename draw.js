;(function () {
    shawn.drawImage = getFileImageItem;
    shawn.draw = draw;

    var img;
    var dataUrl;
    function draw(isClip) {
        var canvas = shawn.config.canvas;
        var ctx = shawn.config.context;
        var resizeWidthRatio = img.width / canvas.width;
        var resizeHeightRatio = img.height / canvas.height;

        var dragConfig = shawn.config.drag;
        var clipRectCoordinate = shawn.config.clipRectCoordinate;

        // clear the canvas
        ctx.save();
        // draw the image
        //ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(shawn.config.drag.angle * Math.PI / 180);
        if (isClip) {
            ctx.drawImage(img, clipRectCoordinate.offsetX * resizeWidthRatio, clipRectCoordinate.offsetY * resizeHeightRatio, clipRectCoordinate.width * resizeWidthRatio, clipRectCoordinate.height * resizeHeightRatio,  dragConfig.imageX, dragConfig.imageY, canvas.width, canvas.height);
        } else {
            ctx.drawImage(img, 0, 0, img.width, img.height,  dragConfig.imageX, dragConfig.imageY, canvas.width, canvas.height);
        }
        ctx.restore();

    }

    function getFileImageItem(files) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var imageType = /image.*/;
            if (!file.type.match(imageType)) {
                continue;
            }
            getFileDataUrl(file);
          }
    }

    function paintImage(dataUrl) {
        return function (tags) {
            img = new Image();
            img.onload = function () {
                var orientation = tags && tags.Orientation;
                if (orientation) {
                    switch (orientation) {
                        case 1:
                            shawn.config.drag.angle = 0;
                            break;
                        case 6:
                            shawn.config.drag.angle = 90;
                        default:
                    }
                    console.log(shawn.config.drag.angle);
                    draw();
                }
            }
            img.src = dataUrl;
        }
    }

    function getFileExifBinary(file, callback) {
        var filePart;
        var filePartReader = new FileReader();

        if (file.slice) {
            filePart = file.slice(0, 1024 * 128);
        }

        filePartReader.onload = function (e) {
            var fileBinaryString = e.target.result;
            callback.call(this, fileBinaryString);
        };
        filePartReader.readAsBinaryString(filePart);
    }

    function getFileDataUrl(file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var fileDataUrl = e.target.result;
            shawn.paintImage = paintImage(fileDataUrl);
            getFileExifBinary(file, shawn.parseExif);
        };
        reader.readAsDataURL(file);
    }

}())

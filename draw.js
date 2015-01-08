(function () {
    shawn.drawImage = draw;
    shawn.paintImage = paintImage;

    var img;
    var dataUrl;
    function draw() {
        var canvas = shawn.config.canvas;
        var ctx = shawn.config.context;

        // clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();

        // draw the image
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(shawn.config.angle * Math.PI / 180);
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
        ctx.restore();
    }

    function getFileImageItem(files) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var imageType = /image.*/;
            if (!file.type.match(imageType)) {
                continue;
            }

            getFileBinaryString(file, shawn.parseExif);
            getFileDataUrl(file);

          }

          function getImgExif(binaryString) {}
    }

    function paintImage(dataUrl) {
        return function (tags) {
            img = new Image();
            img.onload = function () {
                draw();
            }
            img.src = dataUrl;

        }
    }

    function getFileExifBinary(file, callback) {
        var filePartReader = new FileReader();
        filePartReader.onload = function (e) {
            var fileBinaryString = e.target.result;
            callback.call(fileBinaryString);
        };
        filePartReader.readAsBinaryString(filePart);
    }

    function getFileDataUrl(file, callback) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var fileDataUrl = e.target.result;
            callback.call(fileDataUrl);
        };
        reader.readAsDataURL(file);
    }

}())

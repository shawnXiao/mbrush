(function () {
    shawn.parseExif = parseExif;
    function parseExif(fileBinaryString) {
        var myWorker = new Worker("worker.js");

        myWorker.postMessage({
            binary_string: this.result
        });

        myWorker.onmessage = function (e) {
            var tags = e.data.tags;
            shawn.paintImage.call(this, tags)
        }
    }
}())

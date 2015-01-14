(function () {
    window.shawn = new Object();
    shawn.getCoordinate = function (elem) {
        var box = elem.getBoundingClientRect();

        var body = document.body;
        var docElemnt = document.documentElement;

        var scrollTop = window.pageYOffset || docElemnt.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docElemnt.scrollLeft || body.scrollLeft;

        var clientTop = docElemnt.clientTop || body.clientTop || 0;
        var clientLeft = docElemnt.clientLeft || body.clientLeft || 0;

        var top = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;

        return {
            top: Math.round(top),
            left: Math.round(left),
            width: box.width,
            height: box.height
        }

    }

}(window))

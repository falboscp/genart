//standard prototype extention
Array.prototype.randomElement =
    Array.prototype.randomElement ||
    function (min, max) {
        if (min == undefined || max == undefined)
            return this[Math.floor(Math.random() * this.length)];
        else if (min < 0 || max > this.length - 1) throw "limiti non validi!";
        else return this[Math.floor(Math.random() * (max - min + 1) + min)];
    };

CanvasRenderingContext2D.prototype.clear =
    CanvasRenderingContext2D.prototype.clear ||
    function () {
        this.save();
        this.setTransform(1, 0, 0, 1, 0, 0);
        this.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.restore();
    };

Number.prototype.interpolation = function (numero, valore) {
    let dif = numero - this;
    return this + dif * valore;
};

function Point(x, y) {
    if (x.__proto__ != y.__proto__ || x.__proto__ != Number.prototype)
        throw "invalid argument";
    this.x = x;
    this.y = y;

    //make it iterable (support ... syntax)
    this[Symbol.iterator] = function* () {
        yield x;
        yield y;
    };
}

Point.prototype = {
    distance: function (
        p //how fare are me and p?
    ) {
        if (p.__proto__ != Point.prototype) throw "invalid argument";
        return Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2));
    },

    distances: function (
        p //how far are my coordinate from p's one?
    ) {
        if (p.__proto__ != Point.prototype) throw "invalid argument";
        return new Point(Math.abs(this.x - p.x), Math.abs(this.y - p.y));
    },

    module: function () {
        //how far am I from origin?
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    },

    normalize: function () {
        //become a normalized 2D vector
        let module = this.module();
        this.x = this.x / module;
        this.y = this.y / module;
        return this.clone();
    },

    remodule: function (newModule) {
        //keep the same direction and change distance from origin
        let module = this.module();
        this.x = (this.x / module) * newModule;
        this.y = (this.y / module) * newModule;
        return this.clone();
    },

    offset: function (
        p //where am I relative to p?
    ) {
        if (p.__proto__ != Point.prototype) throw "invalid argument";
        return new Point(this.x - p.x, this.y - p.y);
    },

    middle: function (
        p //middle point between me and p
    ) {
        if (p.__proto__ != Point.prototype) throw "invalid argument";
        return new Point((this.x + p.x) / 2, (this.y + p.y) / 2);
    },

    interpolation: function (
        point,
        value //value from 0 (this value) and 1 (point value)
    ) {
        let dif = [point.x - this.x, point.y - this.y];
        return new Point(this.x + dif[0] * value, this.y + dif[1] * value);
    },

    sum: function (point) {
        this.x += point.x;
        this.y += point.y;
        return this.point;
    },

    angle: function (
        point //qual è l'angolo fra me e point? (io origine)
    ) {
        let distances = point.offset(this);
        let tangent = distances.y / distances.x;
        return Math.atan(tangent) + (this.x > point.x ? Math.PI : 0);
    },

    clone: function () {
        return new Point(this.x, this.y);
    },

    set: function (x, y) {
        this.x = x;
        this.y = y;
    },

    //TODO: fix
    specchia: function (
        p1,
        p2 //dove sono io specchiato rispetto alla segmento di punti p1 e p2?
    ) {
        let distance;

        //retta verticale
        if (p1.x == p2.x) {
            distance = p1.x - this.x;
            return new Point(this.x + distance * 2, this.y);
        }

        //retta orizzontale
        if (p1.y == p2.y) {
            distance = p1.y - this.y;
            return new Point(this.x, this.y + distance * 2);
        }

        //retta obliqua
        let a = 1 / (p2.x - p1.x);
        let b = -1 / (p2.y - p1.y);
        let c = p1.y / (p2.y - p1.y) - p1.x / (p2.x - p1.x);
        let angoloRetta = Math.atan((p1.y - p2.y) / (p1.x - p2.x));
        let angoloDistancedistance = Math.abs(angoloRetta + Math.PI / 2);

        distance =
            Math.abs(a * this.x + b * this.y + c) / Math.sqrt(a * a + b * b);

        let segno = {
            x: (-this.y * b - c) / a >= this.x ? 1 : -1,
            y: (-this.x * a - c) / b >= this.y ? 1 : -1,
        };

        return new Point(
            this.x + distance * Math.cos(angoloDistancedistance) * segno.x,
            this.y + distance * Math.sin(angoloDistancedistance) * segno.y
        );
    },
};

Point.random = function (
    minX = 0,
    maxX = canvas.width,
    minY = 0,
    maxY = canvas.height
) {
    return new Point(
        Math.floor(minX.interpolation(maxX, Math.random())),
        Math.floor(minY.interpolation(maxY, Math.random()))
    );
};

/* behaviour di campo
return new Point(
        Math.floor(Math.random() * canvas.width - canvas.width / 2),
        Math.floor(Math.random() * canvas.height - canvas.height / 2)
    );
    */

Point.clone = function (p) {
    return new Point(p.x, p.y);
};

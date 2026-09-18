function Color(r, g, b, a) {
    this.r = Math.floor(r > 255 ? 255 : r < 0 ? 0 : r);
    this.g = Math.floor(g > 255 ? 255 : g < 0 ? 0 : g);
    this.b = Math.floor(b > 255 ? 255 : b < 0 ? 0 : b);
    this.a = a > 1 ? 1 : a < 0 ? 0 : a;
}

Color.prototype = {
    r: 0,
    g: 0,
    b: 0,
    a: 1,

    toString: function () {
        return (
            "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")"
        );
    },

    recolor: function (r, g, b, a) {
        this.r = Math.floor(r > 255 ? 255 : r < 0 ? 0 : r);
        this.g = Math.floor(g > 255 ? 255 : g < 0 ? 0 : g);
        this.b = Math.floor(b > 255 ? 255 : b < 0 ? 0 : b);
        this.a = a > 1 ? 1 : a < 0 ? 0 : a;
    },

    interpolation: function (
        color,
        value //valore da 0 (il colore chiamante) e 1 (il colore passato)
    ) {
        let dif = [
            color.r - this.r,
            color.g - this.g,
            color.b - this.b,
            color.a - this.a,
        ];
        return new Color(
            this.r + dif[0] * value,
            this.g + dif[1] * value,
            this.b + dif[2] * value,
            this.a + dif[3] * value
        );
    },

    clone: function () {
        return new Color(this.r, this.g, this.b, this.a);
    },
};

Color.clone = function (c) {
    return new Color(c.r, c.g, c.b, c.a);
};

Color.random = function () {
    return new Color(
        Math.random() * 256,
        Math.random() * 256,
        Math.random() * 256,
        1
    );
};

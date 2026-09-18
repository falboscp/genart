function Segment(p1, p2, width, color) {
    this.p1 = p1;
    this.p2 = p2;
    this.width = width;
    this.color = color;
}

Segment.prototype = {
    p1: new Point(0, 0),
    p2: new Point(0, 0),
    width: 4,
    color: new Color(0, 0, 0, 0),

    draw: function () {
        ctx.strokeStyle = this.color.toString();
        ctx.lineWidth = this.width;
        ctx.beginPath();
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.stroke();
    },

    translate: function (x, y) {
        this.p1.x += x;
        this.p1.y += y;
        this.p2.x += x;
        this.p2.y += y;
    },

    //TODO: fix
    //simmetrizza il segmento rispetto ad una determinata retta
    mirror: function (p1, p2) {
        let distanza1;
        let distanza2;

        //retta verticale
        if (p1.x == p2.x) {
            distanza1 = p1.x - this.p1.x;
            distanza2 = p1.x - this.p2.x;
            return new Segment(
                new Point(this.p1.x + distanza1 * 2, this.p1.y),
                new Point(this.p2.x + distanza2 * 2, this.p2.y),
                this.width,
                this.color
            );
        }

        //retta orizzontale
        if (p1.y == p2.y) {
            distanza1 = p1.y - this.p1.y;
            distanza2 = p1.y - this.p2.y;
            return new Segment(
                new Point(this.p1.x, this.p1.y + distanza1 * 2),
                new Point(this.p2.x, this.p2.y + distanza1 * 2),
                this.width,
                this.color
            );
        }

        //retta obliqua
        let a = 1 / (p2.x - p1.x);
        let b = -1 / (p2.y - p1.y);
        let c = p1.y / (p2.y - p1.y) - p1.x / (p2.x - p1.x);
        let angoloRetta = Math.atan((p1.y - p2.y) / (p1.x - p2.x));
        let angoloDistanza = Math.abs(angoloRetta + Math.PI / 2);

        distanza1 =
            Math.abs(a * this.p1.x + b * this.p1.y + c) /
            Math.sqrt(a * a + b * b);
        distanza2 =
            Math.abs(a * this.p2.x + b * this.p2.y + c) /
            Math.sqrt(a * a + b * b);

        let segno1 = {
            x: (-this.p1.y * b - c) / a >= this.p1.x ? 1 : -1,
            y: (-this.p1.x * a - c) / b >= this.p1.y ? 1 : -1,
        };
        let segno2 = {
            x: (-this.p2.y * b - c) / a >= this.p2.x ? 1 : -1,
            y: (-this.p2.x * a - c) / b >= this.p2.y ? 1 : -1,
        };

        return new Segment(
            new Point(
                this.p1.x + distanza1 * Math.cos(angoloDistanza) * segno1.x,
                this.p1.y + distanza1 * Math.sin(angoloDistanza) * segno1.y
            ),
            new Point(
                this.p2.x + distanza2 * Math.cos(angoloDistanza) * segno2.x,
                this.p2.y + distanza2 * Math.sin(angoloDistanza) * segno2.y
            ),
            this.width,
            this.color
        );
    },
};

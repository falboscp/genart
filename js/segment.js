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
};

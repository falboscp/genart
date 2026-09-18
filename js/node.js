function Node(
    position,
    color,
    radius = Node.finalRadius,
    isFull = false,
    isStroke = false,
) {
    this.position = position;
    this.color = color;
    this.isStroke = isStroke;

    //growth
    if (!isFull) {
        this.radius = 0;
        let anim = setInterval(
            function () {
                this.radius += Node.growthSpeed;
                if (this.radius >= radius) {
                    this.radius = radius;
                    clearInterval(anim);
                }
            }.bind(this),
            5,
        );
    } else {
        this.radius = radius;
    }
}

Node.prototype = {
    draw: function () {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        if (this.isStroke) {
            ctx.strokeStyle = this.color.toString();
            ctx.stroke();
        } else {
            ctx.fillStyle = this.color.toString();
            ctx.fill();
        }
    },

    setPosition: function (x, y) {
        this.position.x = x;
        this.position.y = y;
    },

    clone: function (isFull = false) {
        return new Node(
            this.position.clone(),
            this.color.clone(),
            this.radius,
            isFull,
        );
    },
};

Node.finalRadius = 10;
Node.growthSpeed = 0.5;

//variabili di configurazione
let radius = 200;
let rotationSpeed = (Math.PI / 180) * 1; //degree per frame
let spawnTime = 50;

//variabili applicative
let nodeArray = [];
let spawnInterval = null;

//funzione che anima gli oggetti visivi
function anima() {
    for (let node of nodeArray) {
        node.angle += rotationSpeed;

        node.position.x = canvas.width / 2 + Math.cos(node.angle) * radius;
        node.position.y = canvas.height / 2 + Math.sin(node.angle) * radius;
    }
}

//funzione che disegna gli oggetti visivi
function disegna() {
    for (let node of nodeArray) {
        node.draw();
    }
}

function frame() {
    //frame generation function

    //clear canvas
    ctx.clear();

    //animate and draw instructions
    anima();
    disegna();

    //frame callback
    animation = requestAnimationFrame(frame);
}

window.addEventListener("load", function () {
    //startup method
    animation = requestAnimationFrame(frame);
});

window.addEventListener("mousedown", function () {
    spawnNode();
    spawnInterval = setInterval(spawnNode, spawnTime);
});

window.addEventListener("mouseup", function () {
    clearInterval(spawnInterval);
});

function spawnNode() {
    let newNode = new Node(
        new Point(canvas.width / 2, canvas.height / 2),
        Color.random(),
    );

    newNode.angle = -Math.PI / 2;

    nodeArray.push(newNode);
}

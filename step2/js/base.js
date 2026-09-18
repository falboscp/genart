//variabili di configurazione
let oscillationRadius = 150;
let oscillationSpeed = (Math.PI / 180) * 2; //degree per frame
let spawnTime = 500;

//variabili applicative
let nodeArray = [];
let spawnInterval = null;

//funzione che anima gli oggetti visivi
function anima() {
    for (let node of nodeArray) {
        node.phase += oscillationSpeed;

        node.position.x = canvas.width / 2;
        node.position.y =
            canvas.height / 2 + Math.sin(node.phase) * oscillationRadius;
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

    newNode.phase = 0;

    nodeArray.push(newNode);
}

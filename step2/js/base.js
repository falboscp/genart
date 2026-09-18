//variabili di configurazione

//variabili applicative
let node = null;

//funzione che anima gli oggetti visivi
function anima() {}

//funzione che disegna gli oggetti visivi
function disegna() {
    console.log(node);
    if (node != null) node.draw();
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
    node = spawnNode();
    animation = requestAnimationFrame(frame);
});

function spawnNode() {
    return new Node(
        new Point(canvas.width / 2, canvas.height / 2),
        Color.random(),
    );
}

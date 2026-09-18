//variabili di configurazione
//variabili applicative

//funzione che anima gli oggetti visivi
function anima() {}

//funzione che disegna gli oggetti visivi
function disegna() {}

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

window.addEventListener("load", function () //startup method
{
    animation = requestAnimationFrame(frame);
});

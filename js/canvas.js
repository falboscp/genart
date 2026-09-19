//canvas handling variables
let canvas;
let ctx;
let animation;

//interaction handling methods
let mouse;

//native events handling
window.addEventListener("load", function () {
    //funzione d'avvio
    mouse = {
        position: new Point(0, 0),
        offset: new Point(0, 0),
    };

    canvas = document.getElementById("tela");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    ctx = canvas.getContext("2d");

    window.addEventListener("mousedown", (event) => {
        event.preventDefault();
    });
    window.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
    window.addEventListener("mousemove", movimento);
});

function movimento(event) {
    let old = mouse.position;
    mouse.position = new Point(event.clientX, event.clientY);
    mouse.offset = mouse.position.offset(old);
}

window.addEventListener("resize", function () {
    //canvas resize
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
});

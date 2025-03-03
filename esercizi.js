//1) Data una variabile che chiamata gridSize, 
// disegnare una scacchiera di dimensioni gridSize * gridSize

//2) fate nevicare nella canvas,

//3) a) dei rettangoli di altezza uguale ad altezze diverse 
// che si muovano verso destra a velocità diversa
//b)righe pari verso destra, righe dispari verso sinistra
//c) più rettangoli per riga 


let entities = [];
let canvas;
let ctx;
let canvasSize;

const MAX_SIZE = 200;
const ROW_NUMBER = 100;
const DIVIDER_PERC = 0.3

function setUp() {

    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    canvasSize = canvas.height;
    const rowHeight = canvasSize / ROW_NUMBER;
    const dividerHeight = rowHeight * DIVIDER_PERC;
    const tileHeight = rowHeight - (2 * dividerHeight)

    for (let i = 0; i < ROW_NUMBER; i++) {

        let leftSpace = canvasSize;
        let speedX;
        if(i % 2 === 0){
            speedX = 4 * Math.random()
        } else {
            speedX = -4 * Math.random()
        }


        while (leftSpace > 0) {
            const rect = {};
            rect.originX = canvasSize - leftSpace;
            rect.originY = (rowHeight * i) + dividerHeight;
    
            rect.height = tileHeight;
            rect.width = Math.random() * MAX_SIZE;
    
            rect.speedX = speedX;

            entities.push(rect);
            const horizDivider = Math.random() * 30;
            leftSpace = leftSpace - (rect.width + horizDivider);
        }


    }
    

    console.log(entities)


}

function update() {
    for (let i = 0; i < entities.length; i++) {
        const rect = entities[i];
        rect.originX += rect.speedX;

        if (rect.originX + MAX_SIZE < 0){
            rect.originX = canvasSize;
        }

        if (rect.originX > canvasSize){
            rect.originX = 0 - MAX_SIZE;
        }
    }

}

function draw() {

    ctx.fillStyle = 'rgba(255,255,255, 1)'
    ctx.fillRect(0,0,600,600);

    for (let i = 0; i < entities.length; i++) {
        const rect = entities[i];
        ctx.fillStyle = `rgba(0, 0, 0, 1)`
        ctx.fillRect(rect.originX, rect.originY, rect.width, rect.height);
    }
}  

function gameLoop(elapsedTime){

    update()

    draw()

    requestAnimationFrame(gameLoop);
}

function start(){
    setUp()
    requestAnimationFrame(gameLoop);
}

start()
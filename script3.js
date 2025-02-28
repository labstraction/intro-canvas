let entities = [];
let rect = {};
let canvas;
let ctx;

function setUp() {

    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');

    for (let i = 0; i < 100; i++) {
        const rect = {};
        rect.width = 2;
        rect.height = 2;
        rect.originX = 299;
        rect.originY = 299;

        rect.speedX = (Math.random() * 4) - 2; 
        rect.speedY = (Math.random() * 4) - 2; 

        entities.push(rect);
    }
    


}

function update() {7
    for (let i = 0; i < entities.length; i++) {
        const rect = entities[i];
        rect.originX += rect.speedX;
        rect.originY += rect.speedY;
    }

}

function draw() {
    for (let i = 0; i < entities.length; i++) {
        const rect = entities[i];
        
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
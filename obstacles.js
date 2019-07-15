

class Obstacle {
  constructor(ctx, canvasW, playerY0,  playerH) {
    this.ctx = ctx;
    this.image = new Image()
  
    this.image.src = 'img/asteroid.png'
   
    this.width = 100;
    this.height = 100;
    this.velX = 10;
    this.posX = canvasW;

    this.posY = 150 + Math.floor(Math.random() * 200);
   
    
  }

  draw() {
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
  }

  move() {
    this.posX -= this.velX
  }
}
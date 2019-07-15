
class Ascending {
  constructor(ctx, canvasW,canvasH, playerY0,  playerH) {
    this.ctx = ctx;
    this.image = new Image()
  
    this.image.src = 'img/spaceship2.png'
   
    this.width = 300;
    this.height = 100;
  //  this.velX = 10;
    this.velY = 10;
    this.posX = canvasW*.70;

    this.posY = canvasH;
   
    
  }

  draw() {
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
  }

  move() {
    this.posY -= this.velY
  }
}
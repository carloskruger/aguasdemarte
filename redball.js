
class Redball {
  constructor(ctx, canvasW, playerY0,  playerH) {
    this.ctx = ctx;
    this.image = new Image()
  
    this.image.src = 'img/bubble-red-md.png'
   
    this.width = 200;
    this.height = 200;
    this.velX = 10;
    this.posX = canvasW;

    this.posY = 150 + Math.floor(Math.random() * 250);
   
    
  }

  draw() {
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
  }

  move() {
    this.posX -= this.velX
  }
}
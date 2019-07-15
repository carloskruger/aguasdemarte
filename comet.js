
class Comet {
  constructor(ctx, canvasW, playerY0,  playerH) {
    this.ctx = ctx;
    this.image = new Image()
  
    this.image.src = 'img/comet_PNG34.png'
   
    this.width = 100;
    this.height = 100;
    this.velX = 10;
    this.posX = canvasW;
    this.posY = 0
  //  this.posY = 150 + Math.floor(Math.random() * 200);
   
    
  }

  draw() {
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
  }

  move() {
    this.posX -= this.velX
    this.postY += 10 *Math.sqrt(2)
  }
}
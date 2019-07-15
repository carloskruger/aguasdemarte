class Water {

  constructor(ctx, canvasW, playerY0,  playerH) {
    
    this.ctx = ctx;
    this.image = new Image()
  
    this.image.src = 'img/water-bubble-png-2.png'
   
    this.width = 100;
    this.height = 100;
    this.velX = 10;
    this.posX = canvasW;

    this.posY = 200 + Math.floor(Math.random() + 100);
   
    
  }

  draw() {
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
  }

  move() {
    this.posX -= this.velX
  }
}
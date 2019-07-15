class Player {
  constructor(ctx, w, h, keys) {
    this.ctx = ctx
    this.gameWidth = w
    this.gameHeight = h

    this.image = new Image()
    this.image.src = "img/player_ship.png"
    this.toggle_switch_up = false
    this.toggle_switch_down = false
    
    this.width = 140
    this.height =  40
    
    this.posX = 40
    this.posY0 = this.gameHeight * 0.50 - this.height     //Guardamos la posicion original para usarla como suelo
    this.posY = this.gameHeight*0.50 - this.height

    this.velY = 1
       //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage

    this.keys = keys

    this.bullets = []           //Array de balas

    this.setListeners()       //Llamamos al listener para que desde el primer momento el jugador responda.
  }
  draw() {
    this.ctx.drawImage(
      this.image, 
                                                                             //Punto y donde empieza a recortar
      this.posX,
      this.posY,                       //Punto x donde termina de recortar
      this.width, 
      this.height)

       //Funcion que anima los frames.

    this.bullets.forEach(bullet => bullet.draw())      //El player dibuja las balas.
  }


  move() {
    if (this.toggle_switch_up)
    this.posY -= 10 
    this.velY += 10 

    if (this.toggle_switch_down)
    this.posY += 10 
    this.velY -= 10 

    // let gravity = 0.4

    // if(this.posY <= this.posY0  ){          //COmprobamos que el player nunca sobrepase el suelo.

    //   this.posY += this.velY
    //   this.velY += gravity                
    // } else {                              //Si lo hace reseteamos posición y velocidad
    //   this.velY = 1
    //   this.posY = this.posY0
     
    // }

    this.bullets.forEach( bullet => bullet.move())      //Movemos las balas
   }


  setListeners() {
    document.onkeydown = (e) => {
      switch(e.keyCode){
        case this.keys.TOP_KEY:
          {
          this.toggle_switch_up = true;       
  //       if(this.posY >= this.posY0)
      //COmprobamos que el player este en el suelo antes de saltar
 //           this.posY -= 30       //Añadimos algo de velocidad al salto para generar el efecto de suavidad y que la gravedad no tire directamente de él
//            this.velY -= 10

          }
          break;
          case this.keys.DOWN_KEY:  
          this.toggle_switch_down = true;          
 //         if(this.posY >= this.posY0)
  //        {    //COmprobamos que el player este en el suelo antes de saltar
   //         this.posY += 30       //Añadimos algo de velocidad al salto para generar el efecto de suavidad y que la gravedad no tire directamente de él
  //          this.velY += 10

    //      }
          break;
        case this.keys.SPACE:
          this.shoot()                //Funcion de disparo
          break;

      }
    }

    document.onkeyup = (e) => {
      switch(e.keyCode){
        case this.keys.TOP_KEY:
          this.toggle_switch_up = false;       
  //       if(this.posY >= this.posY0)
  //{    //COmprobamos que el player este en el suelo antes de saltar
  //          this.posY -= 30       //Añadimos algo de velocidad al salto para generar el efecto de suavidad y que la gravedad no tire directamente de él
//            this.velY -= 10

    //      }
          break;
          case this.keys.DOWN_KEY:  
          this.toggle_switch_down = false;          
 //         if(this.posY >= this.posY0)
 //         {    //COmprobamos que el player este en el suelo antes de saltar
 //           this.posY += 60       //Añadimos algo de velocidad al salto para generar el efecto de suavidad y que la gravedad no tire directamente de él
  //          this.velY += 10

   //       }
          break;
        case this.keys.SPACE:
          this.shoot()                //Funcion de disparo
          break;

      }
    }
  }

  shoot() {

    //Instanciamos nuevas balas
    this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.posY0, this.height))
    
  }
}
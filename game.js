const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  
  fps: 60,
  music: undefined,
  shooting_sound: undefined,
  explosion_sound: undefined,
  obstacles: [],
  waters: [],
  comets: [],
  ascending: [],
  redball: [],
  framesCounter: 0,
  score: undefined,
  
  keys: {
    TOP_KEY: 38,
    DOWN_KEY: 40,
    SPACE: 32
  },

  init: function() {
    this.canvas = document.getElementById("canvas")
    this.ctx = this.canvas.getContext("2d")
    this.ctx.font = "Barriecito";
    this.width = window.innerWidth * .98
    this.height = window.innerHeight * 0.98
    this.canvas.width = this.width 
    this.canvas.height = this.height 

    //var audio = new Audio("sound/Light-Years_V001_Looping.mp3");
   // this.music = new Audio("sound/Light-Years_V001_Looping.mp3");
   this.music = new Audio();
   this.music.src = "./sound/Night-Winds_Looping.mp3"
    //this.music.volume = 0.12
   
    
    this.explosion_sound = new Audio()
    this.explosion_sound.src = "./sound/Bomb-SoundBible.com-891110113.mp3" 
   
    //this.explosion_sound.volume = 0.12
   
   
    this.start()
  },

  start: function() {
    this.reset()        // Reiniciamos configuración del juego
    this.interval = setInterval(()=>{     //Intervalo de juego.
      this.framesCounter++                //Contador de frames

      // controlamos que frameCounter no sea superior a 1000
      if(this.framesCounter > 1000) this.framesCounter = 0 
//        this.music.play()

     // this.explosion_sound.load()
      // controlamos la velocidad de generación de obstáculos
     // if(this.framesCounter%100==0) this.score++      //Aumentamos la puntuación de la partida cada 100 frames. 
      this.clear()                    
      this.drawAll()
      this.moveAll()
      this.generateObstacles()   
      this.generateRedballs()                           //Generamos obstaculos
      this.generateWater()
      this.generateComet()
      this.generateAscending()
      // eliminamos obstáculos fuera del canvas

      this.clearObstacles()  
      this.clearReadballs()                     // Limpiamos del array de obstaculos los que salgan de la pantalla
      this.clearWater()  
      this.clearComet() 
      this.clearAscending()   
      this.isCollision() 
      this.isCollisionRed()    // Comprobamos colisiones
      this.isWaterFound()                // Comprobamos si encontramos agua
      this.isObstacleHit()
      this.hasPlayerWon()
 //     this.music.play()
    }, 1000/this.fps)
  },

  reset: function() {         //reset del game
    this.background = new Background(this.ctx, this.width, this.height)
    this.player = new Player(this.ctx, this.canvas.width, this.canvas.height, this.keys)
    this.scoreboard = ScoreBoard
    this.scoreboard.init(this.ctx)
    this.score = 0
    this.obstacles = []
    this.waters = []
    this.comets = []
    this.redball = []
  },

  drawAll: function() {
    this.background.draw()
    this.player.draw(this.framesCounter)
    this.obstacles.forEach( obs => obs.draw()) 
    this.redball.forEach( red => red.draw()) 
    this.waters.forEach( wat => wat.draw())  
    this.comets.forEach( cmt => cmt.draw())   
    this.ascending.forEach( asc => asc.draw())   
    this.drawScore()
  },

  moveAll: function() {
    this.background.move()
    this.player.move()
    this.obstacles.forEach(obs => obs.move())
    this.redball.forEach(red => red.move())
    this.waters.forEach(wat => wat.move())
    this.comets.forEach(cmt => cmt.move())
    this.ascending.forEach(asc => asc.move())
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },

  

  generateObstacles: function() {
    if(this.framesCounter%70==0) {        //Generamos obstaculos cada 70 frames.
    //  console.log(this.obstacles)
      this.obstacles.push(new Obstacle(this.ctx, this.canvas.width, this.player.posY0, this.player.height)) //pusheamos nuevos obstaculos
    }
  },

  generateRedballs: function() {
    if(this.framesCounter%220==0) {        //Generamos obstaculos cada 70 frames.
  //    console.log("redballs",this.redball)
      this.redball.push(new Redball(this.ctx, this.canvas.width, this.player.posY0, this.player.height)) //pusheamos nuevos obstaculos
    }
  },

  generateWater: function() {
    if(this.framesCounter%180==0) {        //Generamos obstaculos cada 70 frames.
   //   console.log(this.waters)
      this.waters.push(new Water(this.ctx, this.canvas.width, this.player.posY0, this.player.height)) //pusheamos nuevos obstaculos
    }
  },

  generateComet: function() {
    if(this.framesCounter%250==0) {        //Generamos obstaculos cada 70 frames.
   //   console.log(this.comets)
      this.comets.push(new Comet(this.ctx, this.canvas.width, this.player.posY0, this.player.height)) //pusheamos nuevos obstaculos
    }
  },

  generateAscending: function() {
   // console.log("Ascending called!!")
    if(this.framesCounter%250==0) {        //Generamos obstaculos cada 70 frames.
  //    console.log(this.ascending)
      this.ascending.push(new Ascending(this.ctx, this.canvas.width, this.canvas.height, this.player.posY0, this.player.height)) //pusheamos nuevos obstaculos
    }
  },

  clearObstacles: function() {        //funcion para limpiar obs
    this.obstacles.forEach( (obs, idx) => {
      if(obs.posX<= 0) {
        this.obstacles.splice(idx, 1)
      } 
    })
  },

  clearWater: function() {        //funcion para limpiar obs
    this.waters.forEach( (wat, idx) => {
      if(wat.posX<= 0) {
        this.waters.splice(idx, 1)
      } 
    })
  },

  clearComet: function() {        //funcion para limpiar comets
    this.comets.forEach( (cmt, idx) => {
      if(cmt.posX<= 0) {
        this.comets.splice(idx, 1)
      } 
    })
  },

  clearAscending: function() {        //funcion para limpiar comets
    this.ascending.forEach( (asc, idx) => {
      if(asc.posX<= 0) {
        this.ascending.splice(idx, 1)
      } 
    })
  },

  clearReadballs: function() {        //funcion para limpiar comets
    this.redball.forEach( (red, idx) => {
      if(red.posX<= 0) {
        this.redball.splice(idx, 1)
      } 
    })
  },
  

  isCollision: function() {           // funcion para comprobar colisiones
    
    this.obstacles.some( obs => {

//      if(this.player.posX+this.player.width >= obs.posX
     if(this.player.posX >= obs.posX
        &&this.player.posY+this.player.height >= obs.posY
        &&this.player.posX<= obs.posX+obs.width&&this.player.posY <= obs.posY + obs.height) {
        
          //fin del juego, detenemos intervalo
          this.explosion_sound.play()
          this.gameOver()
          this.ctx.fillStyle = "yellow";
          this.ctx.fillText("Fallaste tio!!!!!! " , 450, 400);
     //     this.music.pause()
        }
      })
    },

    isCollisionRed: function() { 

        this.redball.some( red => {

  //      if(this.player.posX+this.player.width >= red.posX
        if(this.player.posX >= red.posX
          &&this.player.posY+this.player.height >= red.posY
          &&this.player.posX<= red.posX+red.width&&this.player.posY <= red.posY + red.height) {
          
            //fin del juego, detenemos intervalo
              this.explosion_sound.play()
              this.gameOver()
      //      this.explosion_sound.play()
    //        this.music.pause()
     //       this.explosion_sound.pause()
            this.ctx.fillStyle = "yellow";
            this.ctx.fillText("Fallaste tio!!!!!! " , 450, 400);
          }
      

    })

  },

  isWaterFound: function() {           // funcion para comprobar colisiones

    this.waters.some( wat => {
      
      if(this.player.posX+this.player.width >= wat.posX
        &&this.player.posY+this.player.height >= wat.posY
        &&this.player.posX<= wat.posX+wat.width&&this.player.posY <= wat.posY + wat.height) {
        
             
           this.score++
           this.drawScore()
          
      }

    })
  },

  isObstacleHit: function(){
    
  
//console.log("isObstacleHit")
      for (let i = 0; i < this.player.bullets.length; i++){
        for (let j = 0; j < this.obstacles.length; j++){
    //      console.log(this.player.bullets[i].posX, this.player.bullets[i].w, this.player.bullets[i].posY, this.player.bullets[i].height)
     //     console.log(this.obstacles[j].posX, this.obstacles[j].width, this.obstacles[j].posY, this.obstacles[j].height)

        if (this.player.bullets[i].posX + this.player.bullets[i].width >= this.obstacles[j].posX 
          && this.player.bullets[i].posY + this.player.bullets[i].height >this.obstacles[j].posY
          &&this.player.bullets[i].posX <=this.obstacles[j].posX+ this.obstacles[j].width
           && this.player.bullets[i].posY< this.obstacles[j].posY + this.obstacles[j].height)
           {
  //           console.log(this.obstacles[j])
//             this.explosion_sound.play()
             this.obstacles.splice(this.obstacles[j], 1)
 //            this.explosion_sound.pause()
        }
 //      else {
 //         console.log("not detecting that obstacle was hit")
  //      }
        }
      }

  },

  drawScore: function() {             //con esta funcion pintamos el marcador
    this.scoreboard.update(this.score)
  },

  gameOver: function() {  
    this.music.pause()            //Gameover detiene el juego.
    clearInterval(this.interval)
  },

  hasPlayerWon: function() {
    if (this.score == 200){
      this.gameOver()
      this.drawAll()

   //   this.music.pause()
      this.ctx.fillStyle = "#1dc9f0";
      this.ctx.fillText("Bien Hecho!!! Conseguiste el agua!!! " , 100, 400);
      //      this.explosion_sound.play()       
     //       this.explosion_sound.pause()
    }

  }
}
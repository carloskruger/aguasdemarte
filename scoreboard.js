//este literal mantiene el marcador del juego con su puntuación
const ScoreBoard = {
  ctx: undefined,

  init: function (ctx) {
    this.ctx = ctx
    this.ctx.font = "50px Montserrat"
  },
  
  update: function (score) {
    this.ctx.fillStyle = "red";
    this.ctx.fillText("Aguas de Marte " + Math.floor(score) + " millones de litros " , 100, 100);
  }
};

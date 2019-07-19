window.onload = () => {
  let start = document.getElementById("start")
  start.onclick = () => {
    start.className = "out"
  Game.init()
}
}
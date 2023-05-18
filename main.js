import { io } from "socket.io-client"

const socket = io("ws://172.17.103.101:3000")
var clickPerson = document.getElementById("whoClicked")
var clickCount = document.getElementById("countClicks")
var localCounter = 0
var theButton = document.getElementById("theButton")
var resetButton = document.getElementById("reset")

document.querySelector("#theButton").addEventListener('click', function(){
  sendClick()
})
document.querySelector("#reset").addEventListener('click', function(){
  reset()
})

function getNewNum(arg){
  clickPerson.innerHTML = socket.whoClicked + " clicked!"
  localCounter = arg.substring(arg.indexOf(":") + 1, arg.indexOf(","))
  clickCount.innerHTML = localCounter
}

function sendClick(arg){
    console.log("clicked by you")
    socket.emit("click")
    getNewNum(arg)
}

function reset(arg){
  socket.emit("resetClicks")
  console.log("Reset!")
  getNewNum(arg)
}

socket.on("connectComplete", (arg) =>{
  getNewNum(arg)
})  

socket.on("someoneClicked", (arg) =>{
  console.log("Clicked " + arg.substring(arg.indexOf(":") + 1, arg.indexOf(",")) + " times")
  getNewNum(arg)
})

socket.on("someoneResetClicks", (arg) =>{
  getNewNum(arg)
})
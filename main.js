import { io } from "socket.io-client"

const socket = io("localhost:3000")
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
document.querySelector("#getNewName").addEventListener('click', function(){
  var newName = document.querySelector("#inputNewName").value
  makeName(newName)
})

function getNewNum(arg){
  clickPerson.innerHTML = arg.whoClicked + " clicked!"
  localCounter = String(arg.clickCount)
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

function makeName(newName){
  socket.emit("friendlyNameUpdate", newName)
}

socket.on("connectComplete", (arg) =>{
  console.log("Connected to server.")
  clickCount.innerHTML = arg.totalClicks
})  

socket.on("someoneClicked", (arg) =>{
  console.log(arg.whoClicked + " clicked.")
  getNewNum(arg)
})

socket.on("someoneResetClicks", (arg) =>{
  getNewNum(arg)
})

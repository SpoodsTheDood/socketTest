import { io } from "socket.io-client"


//HTML Elements that can be changed
const socket = io("localhost:3000")
var clickPerson = document.getElementById("whoClicked")
var clickCount = document.getElementById("countClicks")
var localCounter = 0
var theButton = document.getElementById("theButton")
var resetButton = document.getElementById("reset")

//event listeners will just call a method for simplicity
//could likely shove methods in there at later time
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

function getNewNum(arg, stringedVers = ""){
  //used to display counter
  //throwing up type error but works regardless
  var splitUpVers = stringedVers.split(",")
  splitUpVers[0] = splitUpVers[0].substring((splitUpVers[0].indexOf(":") + 1))
  splitUpVers[1] = splitUpVers[1].substring(14, (splitUpVers[1].indexOf("}") - 1))
  clickPerson.innerHTML = splitUpVers[1] + " clicked!"
  localCounter = splitUpVers[0]
  clickCount.innerHTML = localCounter
}

function sendClick(arg){
    socket.emit("click")
    getNewNum(arg)
}

function reset(arg){
  socket.emit("resetClicks")
}

function makeName(newName){
  socket.emit("friendlyNameUpdate", newName)
}

socket.on("connectComplete", (arg) =>{
  //log used for testing purposes
  console.log("Connected to server.")
  clickCount.innerHTML = arg.totalClicks
})  

socket.on("someoneClicked", (arg) =>{
  console.log(arg.whoClicked + " clicked.")
  var jsonAsString = JSON.stringify(arg)
  getNewNum(arg, jsonAsString)
})

socket.on("someoneResetClicks", (arg) =>{
  var jsonAsString = JSON.stringify(arg)
  getNewNum(arg, jsonAsString)
})

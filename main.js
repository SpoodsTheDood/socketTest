import { io } from "socket.io-client"
import Swal from "sweetalert2"

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

function getNewNum(arg, stringedVers = ""){
  var splitUpVers = stringedVers.split(",")
  splitUpVers[0] = splitUpVers[0].substring((splitUpVers[0].indexOf(":") + 1))
  console.log(splitUpVers[0])
  splitUpVers[1] = splitUpVers[1].substring(14, (splitUpVers[1].indexOf("}") - 1))
  console.log(splitUpVers[1])
  clickPerson.innerHTML = splitUpVers[1] + " clicked!"
  localCounter = splitUpVers[0]
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
}

function makeName(newName){
  console.log("Submitted!")
  socket.emit("friendlyNameUpdate", newName)
}

socket.on("connectComplete", (arg) =>{
  console.log("Connected to server.")
  clickCount.innerHTML = arg.totalClicks
})  

socket.on("someoneClicked", (arg) =>{
  console.log(arg.whoClicked + " clicked.")
  var jsonAsString = JSON.stringify(arg)
  console.log(jsonAsString)
  getNewNum(arg, jsonAsString)
})

socket.on("someoneResetClicks", (arg) =>{
  var jsonAsString = JSON.stringify(arg)
  getNewNum(arg, jsonAsString)
})

socket.on("successfulChange", () =>{
  //used sweetalert2 over a standard akert to change css
  Swal.fire({
    text:'Name succesfuly changed!',
  confirmButtonColor: '#674f39}'
})
})
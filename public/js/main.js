const socket = io();
const addImage = document.getElementById("compose");
const images = document.querySelector(".imagest");
//console.log("bhbhvhgvgh");
socket.on("image", function () {
  var div = document.createElement("div");
  //console.log("ghvvgh");
  div.classList.add("imgt");
  div.innerHTML = '<input type="file" id="image" name="image" value="" style="background-color: rgba(200, 183, 183,0.6); margin-bottom: 3px"/>';
  document.querySelector(".imagest").appendChild(div);
});
addImage.addEventListener("submit", function (e) {
  e.preventDefault();
  socket.emit("add");
});

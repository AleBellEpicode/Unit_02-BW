const songContainer = document.getElementById("songContainer")
const numberSong= document.getElementById("number")
const buttonPlay = document.getElementById("play")

songContainer.addEventListener("mouseover", function() {
  numberSong.style.display = "none";
  buttonPlay.style.display = "inline-block";
});
songContainer.addEventListener("mouseout", function() {
  numberSong.style.display = "inline-block";
  buttonPlay.style.display = "none";
});

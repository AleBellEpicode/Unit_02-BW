const createPlaylistBtn = document.getElementById("create-playlist");
const playlistInput = document.getElementById("playlist-input");
const playlistNameInput = document.getElementById("playlist-name-input");
const submitPlaylistBtn = document.getElementById("submit-playlist-btn");
const playlistNameDisplay = document.getElementById("playlist-name-display");

createPlaylistBtn.addEventListener("click", function() {
  playlistInput.style.display = "flex";
});

submitPlaylistBtn.addEventListener("click", function() {
  playlistInput.style.display = "none";
  playlistNameDisplay.innerHTML = playlistNameInput.value;
});
